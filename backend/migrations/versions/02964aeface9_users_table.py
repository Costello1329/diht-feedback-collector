"""users table

Revision ID: 02964aeface9
Revises: 
Create Date: 2019-12-07 02:07:16.072949

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '02964aeface9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('token', sa.Integer(), nullable=True))
    op.alter_column('users', 'email',
               existing_type=sa.VARCHAR(length=30),
               nullable=True)
    op.alter_column('users', 'first_name',
               existing_type=sa.VARCHAR(length=30),
               nullable=True)
    op.alter_column('users', 'login',
               existing_type=sa.VARCHAR(length=30),
               nullable=True)
    op.alter_column('users', 'middle_name',
               existing_type=sa.VARCHAR(length=30),
               nullable=True)
    op.alter_column('users', 'password',
               existing_type=sa.VARCHAR(length=16),
               nullable=True)
    op.alter_column('users', 'role',
               existing_type=sa.VARCHAR(length=20),
               nullable=True)
    op.alter_column('users', 'second_name',
               existing_type=sa.VARCHAR(length=30),
               nullable=True)
    op.create_unique_constraint(None, 'users', ['token'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.alter_column('users', 'second_name',
               existing_type=sa.VARCHAR(length=30),
               nullable=False)
    op.alter_column('users', 'role',
               existing_type=sa.VARCHAR(length=20),
               nullable=False)
    op.alter_column('users', 'password',
               existing_type=sa.VARCHAR(length=16),
               nullable=False)
    op.alter_column('users', 'middle_name',
               existing_type=sa.VARCHAR(length=30),
               nullable=False)
    op.alter_column('users', 'login',
               existing_type=sa.VARCHAR(length=30),
               nullable=False)
    op.alter_column('users', 'first_name',
               existing_type=sa.VARCHAR(length=30),
               nullable=False)
    op.alter_column('users', 'email',
               existing_type=sa.VARCHAR(length=30),
               nullable=False)
    op.drop_column('users', 'token')
    # ### end Alembic commands ###