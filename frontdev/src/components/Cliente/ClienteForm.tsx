import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createCliente } from '../../features/Cliente/ClienteSlice'
import type ClienteFormData from '../../interfaces/ClienteForm'
import type { AppDispatch } from '../../store'

const ClienteForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [coordenadaX, setCoordenadaX] = useState('')
  const [coordenadaY, setCoordenadaY] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData: ClienteFormData = {
      nome,
      email,
      telefone,
      coordenada: {
        x: parseInt(coordenadaX, 10),
        y: parseInt(coordenadaY, 10),
      },
    }
    dispatch(createCliente(formData))
    // Limpar campos após o envio do formulário
    setNome('')
    setEmail('')
    setTelefone('')
    setCoordenadaX('')
    setCoordenadaY('')
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full bg-gray-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Cadastro de Cliente
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            value={coordenadaX}
            onChange={(e) => setCoordenadaX(e.target.value)}
            placeholder="Coordenada X"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            value={coordenadaY}
            onChange={(e) => setCoordenadaY(e.target.value)}
            placeholder="Coordenada Y"
            required
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default ClienteForm
