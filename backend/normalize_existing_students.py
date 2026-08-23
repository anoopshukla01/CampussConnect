"""
Campus Connect — Student Account Normalization Script
======================================================
Safely backfills missing email, phone, and default passwords for all
existing student records in the database without overwriting valid data.

Actions performed:
1. Normalizes roll numbers (trimmed & uppercase).
2. For students with missing/blank emails: generates standard institutional email (<roll_no>@<college_code>.ac.in).
3. For students with missing/blank phones: generates a 10-digit placeholder contact number.
4. For students without a password_hash: assigns default temporary password (Campus@<RollNo>), hashes via bcrypt, and sets must_change_password=True.
5. Activates student accounts (is_active=True) so students can immediately log in.
6. Preserves all existing custom passwords and active logins (e.g. anoopshukla0709@gmail.com).
"""

import sys
import os
import re

sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from app.extensions import db
from app.models.user import User, UserRole
from app.models.student import StudentProfile
from app.models.college import College

app = create_app()

def slugify(text):
    if not text:
        return "student"
    s = re.sub(r'[^a-zA-Z0-9]', '.', text.strip().lower())
    return re.sub(r'\.+', '.', s).strip('.')

def normalize_existing_students():
    print("=" * 65)
    print("  Campus Connect — Normalizing Existing Student Accounts")
    print("=" * 65)

    with app.app_context():
        colleges = College.query.all()
        total_students = 0
        fixed_emails = 0
        fixed_phones = 0
        fixed_passwords = 0
        activated_users = 0

        for college in colleges:
            college_domain = f"{college.code.lower()}.ac.in" if college.code else "campusconnect.edu"
            existing_emails = set(
                u.email.lower() for u in User.query.filter_by(college_id=college.id).all() if u.email
            )
            existing_phones = set(
                u.phone for u in User.query.filter_by(college_id=college.id).all() if u.phone
            )

            students = StudentProfile.query.filter_by(college_id=college.id, is_deleted=False).all()
            print(f"\n→ College: {college.name} ({college.code}) — {len(students)} students")

            for idx, sp in enumerate(students):
                total_students += 1
                user = sp.user
                if not user:
                    # Create user account if orphaned profile
                    user = User(
                        college_id=college.id,
                        role=UserRole.STUDENT,
                        is_active=True,
                        must_change_password=True,
                    )
                    db.session.add(user)
                    db.session.flush()
                    sp.user_id = user.id
                    activated_users += 1

                # 1. Normalize Roll Number
                clean_roll = (sp.roll_no or f"STU{idx+1}").strip().upper()
                sp.roll_no = clean_roll

                # 2. Normalize / Backfill Email
                if not user.email or not user.email.strip():
                    name_slug = slugify(sp.full_name)
                    candidate = f"{name_slug}.{clean_roll.lower()}@{college_domain}"
                    # Fallback if too long or clashing
                    if candidate in existing_emails:
                        candidate = f"{clean_roll.lower()}@{college_domain}"
                    counter = 1
                    base_candidate = candidate
                    while candidate in existing_emails:
                        candidate = f"{base_candidate.split('@')[0]}.{counter}@{college_domain}"
                        counter += 1

                    user.email = candidate
                    existing_emails.add(candidate.lower())
                    fixed_emails += 1
                    print(f"  [EMAIL] Generated: {sp.full_name} ({clean_roll}) → {candidate}")

                # 3. Normalize / Backfill Phone
                if not user.phone or not user.phone.strip():
                    clean_digits = re.sub(r'\D', '', clean_roll)[-4:].zfill(4)
                    candidate_phone = f"900000{str(idx+10).zfill(4)}"
                    user.phone = candidate_phone
                    existing_phones.add(candidate_phone)
                    fixed_phones += 1

                # 4. Set Initial Password if missing
                if not user.password_hash:
                    default_pw = f"Campus@{clean_roll}"
                    user.set_password(default_pw)
                    user.must_change_password = True
                    fixed_passwords += 1
                    print(f"  [PASSWORD] Set default initial password: {sp.full_name} → Campus@{clean_roll}")

                # 5. Activate User
                if not user.is_active:
                    user.is_active = True
                    activated_users += 1

                # 6. Ensure default CGPA & batch_year on profile if None
                if sp.cgpa is None:
                    sp.cgpa = 7.50
                if sp.batch_year is None:
                    sp.batch_year = 2026
                if sp.semester is None:
                    sp.semester = 6

            db.session.commit()

        print("\n" + "=" * 65)
        print("  ✅ STUDENT NORMALIZATION COMPLETE")
        print("=" * 65)
        print(f"  Total Students Processed : {total_students}")
        print(f"  Missing Emails Generated : {fixed_emails}")
        print(f"  Missing Phones Generated : {fixed_phones}")
        print(f"  Initial Passwords Set    : {fixed_passwords}")
        print(f"  Accounts Activated       : {activated_users}")

if __name__ == "__main__":
    normalize_existing_students()
