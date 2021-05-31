CREATE TABLE users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  birthday DATE NOT NULL,
  created_at TIMESTAMP NOT NULL
);


INSERT INTO users (name, birthday)
VALUES
  ()