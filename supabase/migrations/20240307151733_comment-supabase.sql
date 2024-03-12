CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE comment (
  comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users (id) ON DELETE CASCADE,
  parent_id UUID,
  nb_child INT DEFAULT 0,
  nb_like INT DEFAULT 0,
  nb_dislike INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE reaction (
  like_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  like_type BOOLEAN NOT NULL,
  comment_id UUID NOT NULL,
  user_id UUID NOT NULL DEFAULT auth.uid() REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  FOREIGN KEY (comment_id) REFERENCES comment (comment_id) ON DELETE CASCADE
);

CREATE TABLE audio (
  audio_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID NOT NULL,
  url VARCHAR(255) NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES comment (comment_id) ON DELETE CASCADE
);

CREATE TABLE text (
  text_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_id UUID NOT NULL,
  content text NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES comment (comment_id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION decrement_nb_child()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE comment
  SET nb_child = nb_child - 1
  WHERE comment_id = OLD.parent_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_nb_child
AFTER DELETE ON comment
FOR EACH ROW
WHEN (OLD.parent_id IS NOT NULL)
EXECUTE FUNCTION decrement_nb_child();

CREATE OR REPLACE FUNCTION increment_nb_child()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE comment
  SET nb_child = nb_child + 1
  WHERE comment_id = NEW.parent_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_nb_child
AFTER INSERT ON comment
FOR EACH ROW
WHEN (NEW.parent_id IS NOT NULL)
EXECUTE FUNCTION increment_nb_child();

CREATE OR REPLACE FUNCTION increment_nb_like()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE comment
  SET nb_like = nb_like + 1
  WHERE comment_id = NEW.comment_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_nb_like
AFTER INSERT ON reaction
FOR EACH ROW
WHEN (NEW.like_type = TRUE)
EXECUTE FUNCTION increment_nb_like();

CREATE OR REPLACE FUNCTION decrement_nb_like()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE comment
  SET nb_like = nb_like - 1
  WHERE comment_id = OLD.comment_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_nb_like
AFTER DELETE ON reaction
FOR EACH ROW
WHEN (OLD.like_type = TRUE)
EXECUTE FUNCTION decrement_nb_like();

CREATE OR REPLACE FUNCTION increment_nb_dislike()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE comment
  SET nb_dislike = nb_dislike + 1
  WHERE comment_id = NEW.comment_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_nb_dislike
AFTER INSERT ON reaction
FOR EACH ROW
WHEN (NEW.like_type = FALSE)
EXECUTE FUNCTION increment_nb_dislike();

CREATE OR REPLACE FUNCTION decrement_nb_dislike()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE comment
  SET nb_dislike = nb_dislike - 1
  WHERE comment_id = OLD.comment_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_nb_dislike
AFTER DELETE ON reaction
FOR EACH ROW
WHEN (OLD.like_type = FALSE)
EXECUTE FUNCTION decrement_nb_dislike();

CREATE OR REPLACE FUNCTION update_like_dislike()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.like_type != OLD.like_type THEN
    IF NEW.like_type = TRUE THEN
      UPDATE comment
      SET nb_like = nb_like + 1,
          nb_dislike = nb_dislike - 1
      WHERE comment_id = NEW.comment_id;
    ELSE
      UPDATE comment
      SET nb_like = nb_like - 1,
          nb_dislike = nb_dislike + 1
      WHERE comment_id = NEW.comment_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_like_dislike
AFTER UPDATE OF like_type ON reaction
FOR EACH ROW
EXECUTE FUNCTION update_like_dislike();