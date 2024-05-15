psql -U supergk -h localhost -d auth_db \
    -f migrations/01_create_users_table.sql \
    -f stored_procedures/user_management/create_user.sql \
    -f stored_procedures/user_management/read_user.sql