CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Comment (
  Comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE Audio (
  Audio_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  Comment_id UUID NOT NULL,
  url VARCHAR(255) NOT NULL,
  FOREIGN KEY (Comment_id) REFERENCES Comment (Comment_id) ON DELETE CASCADE
);

CREATE TABLE Text (
  Text_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  Comment_id UUID NOT NULL,
  content TEXT NOT NULL,
  FOREIGN KEY (Comment_id) REFERENCES Comment (Comment_id) ON DELETE CASCADE
);
