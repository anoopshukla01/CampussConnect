"""
Seed script for Deen Dayal Upadhyaya Gorakhpur University (DDUGU).
Creates the College entity, its B.Tech Department branches, and initial administrative accounts.
Designed to allow future departments (e.g. BCA, MCA, BSc, MBA, BA) to be added dynamically.
"""

import uuid
from datetime import datetime, timezone
from app import create_app
from app.extensions import db
from app.models.college import College
from app.models.branch import Branch
from app.models.user import User, UserRole

app = create_app()

COLLEGE_NAME = "Deen Dayal Upadhyaya Gorakhpur University"
COLLEGE_CODE = "DDUGU"
COLLEGE_SLUG = "ddu-gorakhpur-university"
DEFAULT_PASSWORD = "Password1234"

BTECH_BRANCHES = [
    {"name": "B.Tech Computer Science & Engineering", "code": "BTECH-CSE"},
    {"name": "B.Tech Information Technology", "code": "BTECH-IT"},
    {"name": "B.Tech Electronics & Communication Engineering", "code": "BTECH-ECE"},
    {"name": "B.Tech Mechanical Engineering", "code": "BTECH-ME"},
    {"name": "B.Tech Civil Engineering", "code": "BTECH-CE"},
    {"name": "Computer Science & Engineering", "code": "CSE"},
    {"name": "Information Technology", "code": "IT"},
    {"name": "Electronics & Communication", "code": "ECE"},
    {"name": "Mechanical Engineering", "code": "ME"},
    {"name": "Civil Engineering", "code": "CE"},
]


def seed_ddu_university():
    with app.app_context():
        print(f"=== Provisioning {COLLEGE_NAME} ({COLLEGE_CODE}) ===")

        # 1. Upsert College entity
        college = College.query.filter((College.code == COLLEGE_CODE) | (College.name == COLLEGE_NAME)).first()
        if not college:
            college = College(
                id=uuid.uuid4(),
                name=COLLEGE_NAME,
                slug=COLLEGE_SLUG,
                code=COLLEGE_CODE,
                is_active=True,
                created_at=datetime.now(timezone.utc)
            )
            db.session.add(college)
            db.session.flush()
            print(f"  [CREATED] College: {college.name} (Code: {college.code}, ID: {college.id})")
        else:
            college.is_active = True
            college.name = COLLEGE_NAME
            college.code = COLLEGE_CODE
            db.session.flush()
            print(f"  [EXISTS] College: {college.name} (Code: {college.code}, ID: {college.id})")

        # 2. Add B.Tech Department Branches
        print("\n--- Provisioning B.Tech Department Branches ---")
        for b_info in BTECH_BRANCHES:
            existing_branch = Branch.query.filter_by(college_id=college.id, code=b_info["code"]).first()
            if not existing_branch:
                branch = Branch(
                    id=uuid.uuid4(),
                    college_id=college.id,
                    name=b_info["name"],
                    code=b_info["code"],
                    is_active=True,
                    created_at=datetime.now(timezone.utc)
                )
                db.session.add(branch)
                print(f"  [CREATED] Branch: {b_info['name']} ({b_info['code']})")
            else:
                existing_branch.is_active = True
                existing_branch.name = b_info["name"]
                print(f"  [EXISTS] Branch: {b_info['name']} ({b_info['code']})")

        # 3. Create College Admin Account
        print("\n--- Provisioning College Administrative Accounts ---")
        admin_email = "admin@ddugu.ac.in"
        admin_user = User.query.filter_by(college_id=college.id, email=admin_email).first()
        if not admin_user:
            admin_user = User(
                id=uuid.uuid4(),
                college_id=college.id,
                email=admin_email,
                role=UserRole.ADMIN,
                is_active=True
            )
            admin_user.set_password(DEFAULT_PASSWORD)
            db.session.add(admin_user)
            print(f"  [CREATED] Admin: {admin_email} (Password: {DEFAULT_PASSWORD})")
        else:
            admin_user.is_active = True
            admin_user.set_password(DEFAULT_PASSWORD)
            print(f"  [EXISTS] Admin: {admin_email}")

        # 4. Create TPO Account
        tpo_email = "tpo@ddugu.ac.in"
        tpo_user = User.query.filter_by(college_id=college.id, email=tpo_email).first()
        if not tpo_user:
            tpo_user = User(
                id=uuid.uuid4(),
                college_id=college.id,
                email=tpo_email,
                role=UserRole.TPO,
                is_active=True
            )
            tpo_user.set_password(DEFAULT_PASSWORD)
            db.session.add(tpo_user)
            print(f"  [CREATED] TPO: {tpo_email} (Password: {DEFAULT_PASSWORD})")
        else:
            tpo_user.is_active = True
            tpo_user.set_password(DEFAULT_PASSWORD)
            print(f"  [EXISTS] TPO: {tpo_email}")

        db.session.commit()
        print("\n[SUCCESS] Deen Dayal Upadhyaya Gorakhpur University and B.Tech Department configured successfully!")


if __name__ == "__main__":
    seed_ddu_university()
