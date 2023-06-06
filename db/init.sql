CREATE TABLE user_data (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    age integer NOT NULL,
    sex integer NOT NULL,
    bmi float NOT NULL,
    children integer NOT NULL,
    smoker integer NOT NULL,
    region integer NOT NULL,
    charges integer NOT NULL
);