INSERT INTO users (first_name, last_name, email, phone_number, parent_id, user_type, address, created_at)
VALUES($1, $2, $3, $4, $5, $6, $7, $8)
returning *;