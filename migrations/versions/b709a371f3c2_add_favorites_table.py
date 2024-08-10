"""Add favorites table

Revision ID: b709a371f3c2
Revises: 730c1a31d770
Create Date: 2024-08-09 18:09:58.509394

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b709a371f3c2'
down_revision = '730c1a31d770'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'favorites',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), nullable=False),
        sa.Column('pin_id', sa.Integer, sa.ForeignKey('pins.id'), nullable=False)
    )


def downgrade():
    op.drop_table('favorites')
