"""q2r3s4t5u6v7_add_must_change_password_to_users.py
Revision ID: q2r3s4t5u6v7
Revises: p1q2r3s4t5u6
Create Date: 2026-08-23

Adds must_change_password flag to users table.
Defaults to false for existing active accounts, true for new/imported stubs.
"""

from alembic import op
import sqlalchemy as sa

revision = 'q2r3s4t5u6v7'
down_revision = 'p1q2r3s4t5u6'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('users') as batch_op:
        batch_op.add_column(
            sa.Column('must_change_password', sa.Boolean(), nullable=False, server_default=sa.text('false'))
        )


def downgrade():
    with op.batch_alter_table('users') as batch_op:
        batch_op.drop_column('must_change_password')
