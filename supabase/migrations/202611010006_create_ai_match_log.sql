CREATE TABLE AI_Match_Log (
    match_id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL
        REFERENCES Products(product_id) ON DELETE CASCADE,
    lead_id BIGINT NOT NULL,
    compatibility_score FLOAT
        CHECK (compatibility_score BETWEEN 0 AND 1),
    match_status VARCHAR(20) DEFAULT 'Suggested'
        CHECK (match_status IN ('Suggested', 'Accepted', 'Rejected')),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);