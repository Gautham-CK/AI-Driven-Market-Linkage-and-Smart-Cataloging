CREATE TABLE Artisan_Profiles (
    artisan_id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL
        REFERENCES Users(user_id) ON DELETE CASCADE,
    artisan_name VARCHAR(100) NOT NULL,
    craft_specialty VARCHAR(100) NOT NULL,
    location_geo POINT NOT NULL,
    verification_status BOOLEAN DEFAULT FALSE
);