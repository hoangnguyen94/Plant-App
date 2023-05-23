DROP TABLE IF EXISTS toxicity CASCADE;
DROP TABLE IF EXISTS user_search_history CASCADE;
DROP TABLE IF EXISTS plants CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS plants (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  sci_name VARCHAR(255) NOT NULL,
  common_names TEXT,
  family VARCHAR(255) NOT NULL,
  aspca_url VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL
);

CREATE TABLE user_search_history (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plant_id INTEGER REFERENCES plants(id) ON DELETE CASCADE,
  sci_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  info_url VARCHAR(255) NOT NULL,
  user_img_url VARCHAR(255) NOT NULL,
  common_names TEXT NOT NULL,
  date TIMESTAMP NOT NULL
);

CREATE TABLE toxicity (
  id SERIAL PRIMARY KEY NOT NULL,
  plant_id INTEGER REFERENCES plants(id) ON DELETE CASCADE,
  animal VARCHAR(255) NOT NULL,
  toxic BOOLEAN NOT NULL,
  clinical_signs TEXT NOT NULL
);


-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'henry@henryng.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'henry@henryng.com',
        TRUE);