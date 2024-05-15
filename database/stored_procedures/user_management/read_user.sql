CREATE OR REPLACE FUNCTION read_user_by_column(
    IN key_column_name TEXT,
    IN key_value TEXT
) RETURNS SETOF Users LANGUAGE plpgsql AS 
$$ BEGIN
    IF key_column_name = 'id' THEN
        RETURN QUERY EXECUTE format('SELECT * FROM Users WHERE %I = $1::INTEGER', key_column_name) USING key_value;
    ELSE
        RETURN QUERY EXECUTE format('SELECT * FROM Users WHERE %I = $1', key_column_name) USING key_value;
    END IF;
END; $$;