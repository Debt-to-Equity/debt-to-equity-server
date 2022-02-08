SELECT u.first_name, u.last_name, u.email, u.phone_number, u.user_type, u.parent_id, u.address, t.token, t.created_at as token_creation_date FROM users u
JOIN token t ON t.user_id = u.id
WHERE u.email = $1;