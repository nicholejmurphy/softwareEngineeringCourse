DROP DATABASE IF EXISTS medical_center;
CREATE DATABASE medical_center;
\c medical_center;

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    first_name text,
    last_name text
);
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    first_name text,
    last_name text
);

CREATE TABLE diseases (
    id SERIAL PRIMARY KEY,
    name text,
    information text
);

CREATE TABLE diagnosis (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES doctors (id),
    patient_id INTEGER REFERENCES patients (id),
    diagnosis INTEGER REFERENCES diseases (id),
    date date
);