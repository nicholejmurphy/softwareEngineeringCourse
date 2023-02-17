DROP DATABASE IF EXISTS soccer_league;
CREATE DATABASE soccer_league;
\c soccer_league;

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name text
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    date date,
    winning_team INTEGER REFERENCES teams (id),
    losing_team INTEGER REFERENCES teams (id)
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name text,
    last_name text,
    team INTEGER REFERENCES teams (id)
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    player INTEGER,
    game INTEGER REFERENCES games (id),
    total INTEGER REFERENCES players (id)
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    first_name text,
    last_name text
);

CREATE TABLE game_referees (
    id SERIAL PRIMARY KEY,
    refferee INTEGER REFERENCES referees (id),
    game INTEGER REFERENCES games (id)
);

SELECT winning_team,
    COUNT(winning_team) AS wins
FROM games
GROUP BY winning_team
ORDER BY wins DESC;