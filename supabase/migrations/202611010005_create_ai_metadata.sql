CREATE TABLE AI_Metadata (
    metadata_id BIGSERIAL PRIMARY KEY,
    product_id BIGINT UNIQUE NOT NULL
        REFERENCES Products(product_id) ON DELETE CASCADE,
    detected_features JSONB NOT NULL,
    authenticity_score FLOAT
        CHECK (authenticity_score BETWEEN 0 AND 1),
    vector_embedding extensions.vector(1536)
);