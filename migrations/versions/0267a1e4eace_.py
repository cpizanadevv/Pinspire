"""empty message

Revision ID: 0267a1e4eace
Revises: 11e56eff6b7b
Create Date: 2024-08-18 02:04:52.670538

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0267a1e4eace'
down_revision = '11e56eff6b7b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('first_name',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=20),
               existing_nullable=False)
        batch_op.alter_column('last_name',
               existing_type=sa.VARCHAR(length=255),
               type_=sa.String(length=20),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('last_name',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=255),
               existing_nullable=False)
        batch_op.alter_column('first_name',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=255),
               existing_nullable=False)

    # ### end Alembic commands ###