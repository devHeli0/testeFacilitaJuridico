import { http, HttpResponse } from 'msw'

import type Cliente from '../src/interfaces/Cliente'

const clientes: Cliente[] = [
  {
    id: 1,
    nome: 'João',
    email: 'joao@example.com',
    telefone: '123456789',
    coordenadaX: 10,
    coordenadaY: 20,
  },
  {
    id: 2,
    nome: 'Maria',
    email: 'maria@example.com',
    telefone: '987654321',
    coordenadaX: -5,
    coordenadaY: 15,
  },
  {
    id: 3,
    nome: 'Pedro',
    email: 'pedro@example.com',
    telefone: '456789123',
    coordenadaX: 15,
    coordenadaY: -10,
  },
  {
    id: 4,
    nome: 'Ana',
    email: 'ana@outlook.com',
    telefone: '321654987',
    coordenadaX: -20,
    coordenadaY: -5,
  },
  {
    id: 5,
    nome: 'Carlos',
    email: 'carlos@gmail.com',
    telefone: '789123456',
    coordenadaX: 25,
    coordenadaY: 30,
  },
  {
    id: 6,
    nome: 'Julia',
    email: 'julia@hotmail.com',
    telefone: '654987321',
    coordenadaX: 10,
    coordenadaY: -15,
  },
  {
    id: 7,
    nome: 'Fernando',
    email: 'fernando@ig.com',
    telefone: '147258369',
    coordenadaX: -30,
    coordenadaY: 20,
  },
  {
    id: 8,
    nome: 'Amanda',
    email: 'amanda@yahoo.com',
    telefone: '369147258',
    coordenadaX: 5,
    coordenadaY: 25,
  },
  {
    id: 9,
    nome: 'Lucas',
    email: 'lucas@hotmail.com',
    telefone: '258369147',
    coordenadaX: -25,
    coordenadaY: -30,
  },
  {
    id: 10,
    nome: 'Mariana',
    email: 'mariana@gmail.com',
    telefone: '852963147',
    coordenadaX: 20,
    coordenadaY: -25,
  },
  // Adicione mais clientes conforme necessário
]

export const handlers = [
  http.get('http://localhost:4000/api/clientes', () => {
    return HttpResponse.json(clientes)
  }),
]
