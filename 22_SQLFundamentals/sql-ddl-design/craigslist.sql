DROP DATABASE IF EXISTS craigslist;
CREATE DATABASE craigslist;
\c craigslist;

CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    region TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    preffered_region INTEGER REFERENCES regions (id)
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    location TEXT,
    region_id INTEGER REFERENCES regions (id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    text TEXT,
    user_id INTEGER REFERENCES users (id),
    location_id INTEGER REFERENCES locations (id),
    region_id INTEGER REFERENCES regions (id),
    category INTEGER REFERENCES categories (id)
);

