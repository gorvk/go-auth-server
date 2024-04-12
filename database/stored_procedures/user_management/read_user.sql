CREATE OR REPLACE FUNCTION read_all_users() RETURNS TABLE (
    id INTEGER,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    phone_number VARCHAR,
    user_address VARCHAR,
    is_shop_enabled BOOLEAN,
    account_password BYTEA
) LANGUAGE plpgsql AS 
$$ BEGIN 
    RETURN QUERY SELECT * FROM Users; 
END; $$;

CREATE OR REPLACE FUNCTION read_user_by_column(
    IN key_column_name TEXT,
    IN key_value TEXT
) RETURNS TABLE (
    id INTEGER,
    first_name VARCHAR,
    last_name VARCHAR,
    email VARCHAR,
    phone_number VARCHAR,
    user_address VARCHAR,
    is_shop_enabled BOOLEAN,
    account_password BYTEA
) LANGUAGE plpgsql AS 
$$ BEGIN
    IF key_column_name = 'id' THEN
        RETURN QUERY EXECUTE format('SELECT * FROM Users WHERE %I = $1::INTEGER', key_column_name) USING key_value;
    ELSEIF key_column_name = 'is_shop_enabled' THEN
        RETURN QUERY EXECUTE format('SELECT * FROM Users WHERE %I = $1::BOOLEAN', key_column_name) USING key_value;
    ELSE
        RETURN QUERY EXECUTE format('SELECT * FROM Users WHERE %I = $1', key_column_name) USING key_value;
    END IF;
END; $$;