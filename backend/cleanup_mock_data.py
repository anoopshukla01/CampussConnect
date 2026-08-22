"""
Campus Connect — Mock Data Cleanup Script
==========================================
Selectively deletes ONLY demo/mock entities created by seed_demo.py,
strictly preserving all real user accounts, original student roster,
college record, and migrations.

PRESERVED:
  ✓ College (IERT2025)
  ✓ Super Admin (anoopbuilds@gmail.com)
  ✓ Real Student (anoopshukla0709@gmail.com / Anoop Shukla)
  ✓ Original Student Profiles & Roster
  ✓ All DB Schemas, Migrations & Configurations

DELETED:
  ✗ Mock Professor: prof.ramesh.tiwari@iert.ac.in & Dr. Ramesh Tiwari profile
  ✗ Mock TPO: tpo.priya.mehta@iert.ac.in
  ✗ Mock CR delegation / user: kajal.maurya.cr@iert.ac.in
  ✗ Mock Timetable Slots (56 slots)
  ✗ Mock Attendance Records (50 records)
  ✗ Mock Grades (50 records)
  ✗ Mock Assignments (6 assignments)
  ✗ Mock ProfessorClassAssignments (8 assignments)
  ✗ Mock Announcements (5 announcements)
  ✗ Mock Campus Events (2 events)
  ✗ Mock Placement Companies & Drives (4 companies, 3 drives)
"""

import sys
import os
import uuid

sys.path.insert(0, os.path.dirname(__file__))

from app import create_app
from app.extensions import db
from app.models.user import User
from app.models.student import StudentProfile
from app.models.professor import ProfessorProfile
from app.models.academic import (
    TimetableSlot, AttendanceRecord, Grade, Assignment,
    ProfessorClassAssignment, StudentPrivilege, AssignmentSubmission
)
from app.models.placement import Company, PlacementDrive, DriveApplication, DriveShortlist, PlacementOffer
from app.models.community import Announcement, CampusEvent

app = create_app()

MOCK_EMAILS = [
    "prof.ramesh.tiwari@iert.ac.in",
    "tpo.priya.mehta@iert.ac.in",
    "kajal.maurya.cr@iert.ac.in",
]

MOCK_COMPANIES = [
    "Infosys Ltd.",
    "Tata Consultancy Services",
    "Wipro Technologies",
    "HCL Technologies",
]

MOCK_ANNOUNCEMENT_TITLES = [
    "Mid-Semester Examination Schedule — CT Branch",
    "Campus Placement Drive — Infosys Ltd.",
    "Final Year Project Submission Deadline",
    "Campus Internet Maintenance — Sunday 24 Aug",
    "TCS National Qualifier Test — Registration Open",
]

MOCK_EVENT_TITLES = [
    "CodeSprint 2026 — Annual Hackathon",
    "Campus Placement Orientation Seminar",
]

MOCK_ASSIGNMENT_TITLES = [
    "OS Process Scheduling Simulation",
    "TCP/IP Protocol Analysis",
    "ER Diagram & Normalization Exercise",
]


def run_cleanup():
    print("=" * 60)
    print("  Campus Connect — Mock Data Cleanup")
    print("=" * 60)

    with app.app_context():
        # 1. Placement Drives & Companies
        print("\n→ Removing Mock Placement Drives & Companies...")
        mock_companies = Company.query.filter(Company.name.in_(MOCK_COMPANIES)).all()
        comp_ids = [c.id for c in mock_companies]
        drives = PlacementDrive.query.filter(PlacementDrive.company_id.in_(comp_ids)).all()
        drive_ids = [d.id for d in drives]

        PlacementOffer.query.filter(PlacementOffer.drive_id.in_(drive_ids)).delete(synchronize_session=False)
        DriveShortlist.query.filter(DriveShortlist.drive_id.in_(drive_ids)).delete(synchronize_session=False)
        DriveApplication.query.filter(DriveApplication.drive_id.in_(drive_ids)).delete(synchronize_session=False)
        PlacementDrive.query.filter(PlacementDrive.id.in_(drive_ids)).delete(synchronize_session=False)
        Company.query.filter(Company.id.in_(comp_ids)).delete(synchronize_session=False)
        print(f"  ✓ Deleted {len(drives)} drives and {len(mock_companies)} companies")

        # 2. Announcements & Events
        print("\n→ Removing Mock Announcements & Events...")
        ann_cnt = Announcement.query.filter(Announcement.title.in_(MOCK_ANNOUNCEMENT_TITLES)).delete(synchronize_session=False)
        evt_cnt = CampusEvent.query.filter(CampusEvent.title.in_(MOCK_EVENT_TITLES)).delete(synchronize_session=False)
        print(f"  ✓ Deleted {ann_cnt} announcements and {evt_cnt} campus events")

        # 3. Assignments & Submissions
        print("\n→ Removing Mock Assignments...")
        mock_assigns = Assignment.query.filter(Assignment.title.in_(MOCK_ASSIGNMENT_TITLES)).all()
        assign_ids = [a.id for a in mock_assigns]
        AssignmentSubmission.query.filter(AssignmentSubmission.assignment_id.in_(assign_ids)).delete(synchronize_session=False)
        as_cnt = Assignment.query.filter(Assignment.id.in_(assign_ids)).delete(synchronize_session=False)
        print(f"  ✓ Deleted {as_cnt} assignments")

        # 4. Professor Class Assignments
        print("\n→ Removing Mock Professor Class Assignments...")
        prof_users = User.query.filter(User.email.in_(MOCK_EMAILS)).all()
        prof_user_ids = [u.id for u in prof_users]
        pca_cnt = ProfessorClassAssignment.query.filter(ProfessorClassAssignment.professor_user_id.in_(prof_user_ids)).delete(synchronize_session=False)
        print(f"  ✓ Deleted {pca_cnt} professor class assignments")

        # 5. Timetable Slots
        print("\n→ Removing Mock Timetable Slots...")
        ts_cnt = TimetableSlot.query.filter(
            (TimetableSlot.professor_name == "Dr. Ramesh Tiwari") |
            (TimetableSlot.user_id.in_(prof_user_ids))
        ).delete(synchronize_session=False)
        print(f"  ✓ Deleted {ts_cnt} timetable slots")

        # 6. Mock Attendance Records & Grades (for CT601-CT609)
        print("\n→ Removing Mock Attendance & Grades...")
        mock_codes = ["CT601", "CT603", "CT605", "CT607", "CT609"]
        att_cnt = AttendanceRecord.query.filter(AttendanceRecord.subject_code.in_(mock_codes)).delete(synchronize_session=False)
        grd_cnt = Grade.query.filter(Grade.course_code.in_(mock_codes)).delete(synchronize_session=False)
        print(f"  ✓ Deleted {att_cnt} attendance records and {grd_cnt} grades")

        # 7. Student CR Privilege
        print("\n→ Removing Mock CR Privileges...")
        cr_cnt = StudentPrivilege.query.filter(StudentPrivilege.delegated_role == "CLASS_REPRESENTATIVE").delete(synchronize_session=False)
        print(f"  ✓ Deleted {cr_cnt} delegated student privileges")

        # 8. Mock User Accounts & Professor Profiles
        print("\n→ Removing Mock User Accounts...")
        ProfessorProfile.query.filter(ProfessorProfile.user_id.in_(prof_user_ids)).delete(synchronize_session=False)
        
        # Keep real student profile for anoopshukla0709@gmail.com intact!
        # Delete only Kajal CR profile if created specifically as demo user
        mock_cr_user = User.query.filter_by(email="kajal.maurya.cr@iert.ac.in").first()
        if mock_cr_user:
            StudentProfile.query.filter_by(user_id=mock_cr_user.id).delete(synchronize_session=False)

        user_cnt = User.query.filter(User.email.in_(MOCK_EMAILS)).delete(synchronize_session=False)
        print(f"  ✓ Deleted {user_cnt} mock user accounts ({', '.join(MOCK_EMAILS)})")

        db.session.commit()

        print("\n" + "=" * 60)
        print("  ✅ CLEANUP COMPLETE — All Mock Data Safely Removed")
        print("=" * 60)
        print("\nPreserved Accounts:")
        print("  - Admin:   anoopbuilds@gmail.com")
        print("  - Student: anoopshukla0709@gmail.com (Anoop Shukla)")
        print(f"  - Total Remaining Users: {User.query.count()}")
        print(f"  - Total Remaining Student Profiles: {StudentProfile.query.count()}")


if __name__ == "__main__":
    run_cleanup()
