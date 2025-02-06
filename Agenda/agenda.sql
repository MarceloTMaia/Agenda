CREATE DATABASE agenda;

-- Seleção do banco de dados
USE agenda;

-- Criação da tabela de contatos
CREATE TABLE contatos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Teste de inserção de dados
INSERT INTO contatos (nome, email) VALUES ('João Silva', 'joao.silva@email.com');