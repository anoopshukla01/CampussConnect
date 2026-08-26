"""r3s4t5u6v7w8_set_non_admin_passwords_to_password1234.py
Revision ID: r3s4t5u6v7w8
Revises: q2r3s4t5u6v7
Create Date: 2026-08-26

Bulk updates password for all non-admin user accounts to 'Password1234',
unlocks accounts, and resets failed attempts.
"""

from alembic import op
import sqlalchemy as sa
from werkzeug.security import generate_password_hash

revision = 'r3s4t5u6v7w8'
down_revision = 'q2r3s4t5u6v7'
branch_labels = None
depends_on = None


def upgrade():
    password_hash = generate_password_hash('Password1234')
    # Update all accounts whose role is not admin
    conn = op.get_bind()
    conn.execute(
        sa.text(
            "UPDATE users "
            "SET password_hash = :hash, "
            "    failed_login_attempts = 0, "
            "    locked_until = NULL, "
            "    is_active = true "
            "WHERE role != 'ADMIN' AND role != 'admin'"
        ),
        {"hash": password_hash}
    )


def downgrade():
    pass
