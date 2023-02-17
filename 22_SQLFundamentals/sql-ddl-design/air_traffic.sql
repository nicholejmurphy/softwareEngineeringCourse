-- from the terminal run:
-- psql < air_traffic.sql
DROP DATABASE IF EXISTS air_traffic;
CREATE DATABASE air_traffic;
\c air_traffic;




CREATE TABLE passengers (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE locations (
  id SERIAL PRIMARY KEY, 
  city TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE airlines (id SERIAL PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE flights (
  id SERIAL PRIMARY KEY,
  airline_id INTEGER REFERENCES airlines(id),
  departure_timestamp TIMESTAMP,
  arrival_timestamp TIMESTAMP,
  departing_from INTEGER REFERENCES locations(id),
  arriving_to INTEGER REFERENCES locations(id)
);

CREATE TABLE tickets (
  ticket_id SERIAL PRIMARY KEY, 
  flight_id INTEGER REFERENCES flights(id),
  passenger_id INTEGER REFERENCES passengers(id),
  seat_id TEXT NOT NULL
);

INSERT INTO passengers (first_name, last_name)
VALUES ('Jennifer', 'Finch'),
  ('Thadeus', 'Gathercoal'),
  ('Sonja', 'Pauley'),
  ('Jennifer', 'Finch'),
  ('Waneta', 'Skeleton'),
  ('Thadeus', 'Gathercoal'),
  ('Berkie', 'Wycliff'),
  ('Alvin', 'Leathes'),
  ('Berkie', 'Wycliff'),
  ('Cory', 'Squibbes');

INSERT INTO locations (city, country)
VALUES ('Washington DC', 'United States'),
  ('Seattle', 'United States'),
  ('Tokyo', 'Japan'),
  ('London', 'United Kingdom'),
  ('Los Angeles', 'United States'),
  ('Las Vegas', 'United States'),
  ('Mexico City', 'Mexico'),
  ('Paris', 'France'),
  ('Casablanca', 'Morocco'),
  ('Dubai', 'UAE'),
  ('Beijing', 'China'),
  ('New York', 'United States'),
  ('Charlotte', 'United States'),
  ('Cedar Rapids', 'United States'),
  ('Chicago', 'United States'),
  ('New Orleans', 'United States'),
  ('Sao Paolo', 'Brazil'),
  ('Santiago', 'Chile');

INSERT INTO airlines (name)
VALUES ('United'),
  ('British Airways'),
  ('Delta'),
  ('TUI Fly Belgium'),
  ('Air China'),
  ('American Airlines'),
  ('Avianca Brasil');

INSERT INTO flights (
    airline_id,
    departure_timestamp,
    arrival_timestamp,
    departing_from,
    arriving_to
  )
VALUES (1,'2018-04-08 09:00:00','2018-04-08 12:00:00',1,2),
  (2,'2018-12-19 12:45:00','2018-12-19 16:15:00',3,4),
  (3,'2018-01-02 07:00:00','2018-01-02 08:03:00',5,6),
  (3,'2018-04-15 16:50:00','2018-04-15 21:00:00',2,7),
  (4,'2018-08-01 18:30:00','2018-08-01 21:50:00',8,9),
  (5,'2018-10-31 01:15:00','2018-10-31 12:55:00',10,11),
  (1,'2019-02-06 06:00:00','2019-02-06 07:47:00',12,13),
  (6,'2018-12-22 14:42:00','2018-12-22 15:56:00',14,15),
  (6,'2019-02-06 16:28:00','2019-02-06 19:18:00',13,16),
  (7,'2019-01-20 19:30:00','2019-01-20 22:45:00',17,18);

INSERT INTO tickets (
  flight_id,
  passenger_id,
  seat_id
  )
VALUES 
  (1,1,'33B'),
  (2,2,'8A'),
  (3,3,'12F'),
  (4,1,'20A'),
  (5,4,'23D'),
  (6,2,'18C'),
  (7,5,'9E'),
  (8,6,'1A'),
  (9,5,'32B'),
  (10,6,'10D');
