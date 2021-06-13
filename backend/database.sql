CREATE TABLE users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(64) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE albums (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL DEFAULT 'Default Album',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cover_url VARCHAR
);

CREATE TABLE album_ratings (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  album_id BIGINT NOT NULL REFERENCES albums(id),
  user_id BIGINT NOT NULL REFERENCES users(id),
  rating SMALLINT NOT NULL CHECK(rating = -1 OR rating = 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE album_songs (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  album_id BIGINT NOT NULL REFERENCES albums(id),
  song_id VARCHAR(40) NOT NULL
);
CREATE INDEX album_songs_idx_album ON album_songs(album_id);
CREATE INDEX album_songs_idx_songs ON album_songs(song_id);

CREATE TYPE "genre_name" AS ENUM (
  'Pop',
  'Hip Hop',
  'Rap',
  'Classic Rock',
  'Punk Rock',
  'Electronic',
  'Country',
  'Jazz',
  'Classical',
  'Heavy Metal',
  'Kpop',
  'Jpop',
  'Blues',
  'Dance',
  'Reggae',
  'Gospel',
  'Instrumental',
  'Opera'
);

CREATE TABLE album_genres (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  album_id bigint NOT NULL REFERENCES albums(id),
  genre_name genre_name NOT NULL
);
CREATE INDEX album_genres_idx_album ON album_genres(album_id);
CREATE INDEX album_genres_idx_genre ON album_genres(genre_name);

CREATE TABLE comments (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  album_id BIGINT NOT NULL REFERENCES albums(id),
  user_id BIGINT NOT NULL REFERENCES users(id),
  text VARCHAR(2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MOCK DATA --

insert into users (first_name, last_name, username, email, password, created_at) values ('Isahella', 'Dominetti', 'idominetti0', 'idominetti0@diigo.com', 'KxEfpTg', '2011-09-27 06:55:38-05');
insert into users (first_name, last_name, username, email, password, created_at) values ('Coralie', 'Wetherburn', 'cwetherburn1', 'cwetherburn1@businesswire.com', 'zklnoAO7sbb', '2017-06-20 15:16:33-05');
insert into users (first_name, last_name, username, email, password, created_at) values ('Godfree', 'Armor', 'garmor2', 'garmor2@privacy.gov.au', 'SpahUZoQx', '2018-10-27 08:43:13-05');
insert into users (first_name, last_name, username, email, password, created_at) values ('Jeniffer', 'Silbersak', 'jsilbersak3', 'jsilbersak3@seattletimes.com', 'hFVuLwb', '2017-04-22 18:44:50-05');
insert into users (first_name, last_name, username, email, password, created_at) values ('Gianni', 'Maidens', 'gmaidens4', 'gmaidens4@kickstarter.com', 'ghmPfJw859ez', '2021-03-07 02:55:21-05');
insert into users (first_name, last_name, username, email, password, created_at) values ('Katerina', 'Linturn', 'klinturn5', 'klinturn5@goodreads.com', 'ynE3GWTdDIs', '2012-03-18 12:28:35-05');
insert into users (first_name, last_name, username, email, password, created_at) values ('Rosamond', 'Lagde', 'rlagde6', 'rlagde6@issuu.com', 'syHlbi', '2019-06-05 07:53:13-05');
insert into users (first_name, last_name, username, email, password, created_at) values ('Korie', 'Petrolli', 'kpetrolli7', 'kpetrolli7@indiegogo.com', 'opICCT', '2016-02-20 18:08:36-05');
insert into users (first_name, last_name, username, email, password, created_at) values ('Ediva', 'Scading', 'escading8', 'escading8@princeton.edu', '1x8MnW7g72', '2011-10-23 00:35:15-05');
insert into users (first_name, last_name, username, email, password, created_at) values ('Stefano', 'Myers', 'smyers9', 'smyers9@wikimedia.org', 'vMS9u18lGJi', '2011-09-22 12:00:57-05');
