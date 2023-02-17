-- from the terminal run:
-- psql < music.sql

DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE albums
(
  id SERIAL PRIMARY KEY,
  album_name TEXT NOT NULL,
  release_date DATE NOT NULL
);

CREATE TABLE songs
(
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  duration_in_seconds INTEGER NOT NULL
);

CREATE TABLE songs_albums (
  id SERIAL PRIMARY KEY,
  song_id INTEGER REFERENCES songs(id),
  album_id INTEGER REFERENCES albums(id)
);

CREATE TABLE producers
(
  id SERIAL PRIMARY KEY,
  producer TEXT NOT NULL
);

CREATE TABLE artists
(
  id SERIAL PRIMARY KEY,
  artist TEXT NOT NULL
);

CREATE TABLE albums_artists (
  id SERIAL PRIMARY KEY,
  album_id INTEGER REFERENCES albums(id),
  artists_id INTEGER REFERENCES artists(id)
);

CREATE TABLE albums_producers (
  id SERIAL PRIMARY KEY,
  album_id INTEGER REFERENCES albums(id),
  producer_id INTEGER REFERENCES producers(id)
);

INSERT INTO songs 
  (title, duration_in_seconds)
VALUES 
  ('MMMBop', 238),
  ('Bohemian Rhapsody', 355),
  ('One Sweet Day', 282),
  ('Shallow', 216),
  ('How You Remind Me', 223),
  ('New York State Of Mind', 276),
  ('Dark horse', 215),
  ('Moves Like Jagger',201),
  ('Complicated',244),
  ('Say My Name', 240);


INSERT INTO albums
  (release_date, album_name)
VALUES
  ('04-15-1997','Middle of Nowhere'),
  ('10-31-1975','A Night at the Opera'),
  ('11-14-1995','Daydream'),
  ('09-27-2018','A Star Is Born'),
  ('08-21-2001','Silver Side Up'),
  ('10-20-2009','The Blueprint 3'),
  ('12-17-2013','Prism'),
  ('06-21-2011','Hands All Over'),
  ('05-14-2002','Let Go'),
  ('11-07-1999','The Writing''s on the Wall');

INSERT INTO songs_albums (song_id, album_id)
VALUES
  (1,1),
  (2,2),
  (3,3),
  (4,4),
  (5,5),
  (6,6),
  (7,7),
  (8,8),
  (9,9),
  (10,10);

INSERT INTO artists
  (artist)
VALUES
  ('Hanson'),
  ('Queen'),
  ('Mariah Cary'), 
  ('Boyz II Men'),
  ('Lady Gaga'), 
  ('Bradley Cooper'),
  ('Nickelback'),
  ('Jay Z'), 
  ('Alicia Keys'),
  ('Katy Perry'), 
  ('Juicy J'),
  ('Maroon 5'), 
  ('Christina Aguilera'),
  ('Avril Lavigne'),
  ('Destiny"s Child'
  );

INSERT INTO producers
  (producer)
VALUES
  ('Dust Brothers'), 
  ('Stephen Lironi'),
  ('Roy Thomas Baker'),
  ('Walter Afanasieff'),
  ('Benjamin Rice'),
  ('Rick Parashar'),
  ('Al Shux'),
  ('Max Martin'), 
  ('Cirkut'),
  ('Shellback'), 
  ('Benny Blanco'),
  ('The Matrix'),
  ('Darkchild');

INSERT INTO albums_artists
  (album_id, artists_id)
VALUES
  (1,1),
  (2,2),
  (3,4),
  (3,5),
  (4,6),
  (4,7),
  (5,6),
  (6,7),
  (6,8),
  (7,9),
  (7,10),
  (8,11),
  (8,12),
  (9,13),
  (10,14);

INSERT INTO albums_producers
  (album_id, producer_id)
VALUES
  (1,1),
  (1,2),
  (2,3),
  (3,4),
  (4,5),
  (5,6),
  (6,7),
  (7,8),
  (7,9),
  (8,10),
  (8,11),
  (9,12),
  (10,13);