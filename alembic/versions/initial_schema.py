"""initial schema

Revision ID: 0.0.1
Revises: None
Create Date: 2026-06-05 11:00:00
"""

from alembic import op
import sqlalchemy as sa


revision = "0.0.1"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "settings",
        sa.Column("id", sa.Integer(), primary_key=True, nullable=False),
        sa.Column("model", sa.String(), nullable=False),
        sa.Column("temperature", sa.Float(), nullable=False),
        sa.Column("api_key", sa.String(), nullable=False),
        sa.Column("base_url", sa.String(), nullable=False),
        sa.Column("zhipu_search_api_key", sa.String(), nullable=False),
        sa.Column("created_at", sa.String(), nullable=True),
        sa.Column("updated_at", sa.String(), nullable=True),
    )
    op.create_index("ix_settings_id", "settings", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_settings_id", table_name="settings")
    op.drop_table("settings")
