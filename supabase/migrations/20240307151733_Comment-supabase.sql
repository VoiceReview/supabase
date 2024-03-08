CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE comments (
  comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE audios (
  audio_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID NOT NULL,
  url VARCHAR(255) NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES comments (comment_id) ON DELETE CASCADE
);

CREATE TABLE texts (
  text_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID NOT NULL,
  content TEXT NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES comments (comment_id) ON DELETE CASCADE
);
