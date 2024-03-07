CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Comment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  parent_id UUID NOT NULL,
  child_id UUID NOT NULL
);

CREATE TABLE Audio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url VARCHAR(255) NOT NULL
);

CREATE TABLE Text (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL
);