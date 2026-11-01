CREATE TABLE Products (
    product_id BIGSERIAL PRIMARY KEY,
    artisan_id BIGINT NOT NULL
        REFERENCES Artisan_Profiles(artisan_id) ON DELETE CASCADE,
    raw_title VARCHAR(150) NOT NULL,
    standardized_title VARCHAR(150),
    base_price DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
    stock_quantity INT NOT NULL CHECK (stock_quantity >= 0),
    status VARCHAR(20) DEFAULT 'Draft'
        CHECK (status IN ('Draft', 'Published', 'Archived'))
);