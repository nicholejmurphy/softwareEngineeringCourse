-- from the terminal run:
-- psql < outer_space.sql
DROP DATABASE IF EXISTS outer_space;
CREATE DATABASE outer_space;
\c outer_space;

CREATE TABLE planets (id SERIAL PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE galaxies (id SERIAL PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE moons (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbits_planet INTEGER REFERENCES planets(id)
);

CREATE TABLE orbited_planets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  orbited_by INTEGER REFERENCES planets(id),
  orbital_period_in_years FLOAT NOT NULL
);
CREATE TABLE planets_in_galaxies (
  id SERIAL PRIMARY KEY,
  planets_in INTEGER REFERENCES planets(id),
  galaxies_of INTEGER REFERENCES galaxies(id)
);

INSERT INTO planets (name)
VALUES ('Earth'),
('Mars'),
('Venus'),
('Neptune'),
('Proxima Centauri b'),
('Gliese 876 b');

INSERT INTO moons (name,orbits_planet)
VALUES ('The Moon',1),
  ('Phobos',2),('Deimos',2),
  ('Naiad',4),('Thalassa',4),('Despina',4),('Galatea',4),('Larissa',4),('S/2004 N 1',4),('Proteus',4),('Triton',4),('Nereid',4),('Halimede',4),('Sao',4),('Laomedeia',4),('Psamathe',4),('Neso',4);

INSERT INTO galaxies (name) VALUES ('Milky Way');

INSERT INTO planets_in_galaxies (planets_in, galaxies_of) VALUES (1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1);

INSERT INTO orbited_planets (
    name,
    orbited_by,
    orbital_period_in_years    
  )
VALUES ('The Sun',1,1.00),
  ('The Sun',2,1.88),
  ('The Sun',3, 0.62),
  ('The Sun',4,164.8),
  ('Proxima Centauri',5,0.03),
  ('Gliese 876',6,0.23);