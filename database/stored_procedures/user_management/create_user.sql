CREATE OR REPLACE PROCEDURE create_user (
        _email VARCHAR,
        _first_name VARCHAR,
        _last_name VARCHAR,
        _account_password BYTEA
    ) LANGUAGE SQL AS $$
INSERT INTO Users (
        email,
        first_name,
        last_name,
        account_password
    )
VALUES (
        _email,
        _first_name,
        _last_name,
        _account_password
    );
$$