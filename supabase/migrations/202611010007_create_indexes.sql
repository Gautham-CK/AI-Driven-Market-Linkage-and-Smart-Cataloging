CREATE INDEX idx_ai_vector
ON AI_Metadata
USING hnsw (vector_embedding extensions.vector_cosine_ops);