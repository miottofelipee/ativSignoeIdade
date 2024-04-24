CREATE DATABASE atividade_pratica_01;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobre_nome  VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL,
    signo VARCHAR(20) NOT NULL,
    datanascimento DATE NOT NULL
);

INSERT INTO users (nome, sobre_nome, email, idade, signo, datanascimento) VALUES ('Felipe', 'Miotto', 'fmiotto47@gmail.com', 17, 'Virgem', '23-08-2006');