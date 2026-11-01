CREATE TABLE Users (
    user_id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
        CHECK (role IN ('Artisan', 'Buyer', 'Admin', 'Logistics')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);