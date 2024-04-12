CREATE OR REPLACE PROCEDURE create_user (
        _email VARCHAR,
        _first_name VARCHAR,
        _last_name VARCHAR,
        _phone_number VARCHAR,
        _user_address VARCHAR,
        _account_password BYTEA
    ) LANGUAGE SQL AS $$
INSERT INTO Users (
        email,
        first_name,
        last_name,
        phone_number,
        user_address,
        account_password
    )
VALUES (
        _email,
        _first_name,
        _last_name,
        _phone_number,
        _user_address,
        _account_password
    );
$$