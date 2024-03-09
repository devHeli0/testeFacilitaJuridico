-- Create clientes table
CREATE TABLE
    clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telefone VARCHAR(20) NOT NULL
    );

-- Create coordenadas table with foreign key reference
CREATE TABLE
    coordenadas (
        id SERIAL PRIMARY KEY,
        clienteId INTEGER REFERENCES clientes (id),
        x INTEGER NOT NULL,
        y INTEGER NOT NULL
    );