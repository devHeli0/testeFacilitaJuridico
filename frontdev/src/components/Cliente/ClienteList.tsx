import { useState, useEffect } from 'react'

import ClienteService from '../../features/Cliente/ClienteService'
import type Cliente from '../../interfaces/Cliente'

import ClienteModal from './ClienteModal'

const ClienteList = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [filtro, setFiltro] = useState('')
  const [modalAberta, setModalAberta] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchClientes() {
      try {
        const clientesData = await ClienteService.getClientes()
        setClientes(clientesData)
      } catch (error) {
        console.error('Erro ao buscar clientes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchClientes()
  }, [])

  const abrirModal = () => {
    setModalAberta(true)
  }

  const fecharModal = () => {
    setModalAberta(false)
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value)
  }

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      cliente.email.toLowerCase().includes(filtro.toLowerCase()) ||
      cliente.telefone.toLowerCase().includes(filtro.toLowerCase()),
  )

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full max-h-96 overflow-auto bg-gray-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Lista de Clientes
        </h2>
        <h3 className="text-2xl font-bold text-center mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={abrirModal}
          >
            Exibir Rota
          </button>
        </h3>
        <input
          type="text"
          placeholder="Filtrar por Nome, Email ou Telefone"
          value={filtro}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : clientesFiltrados.length > 0 ? (
          clientesFiltrados.map((cliente) => (
            <div key={cliente.id} className="mb-4">
              <p className="text-lg font-semibold">{cliente.nome}</p>
              <p className="text-gray-600">{cliente.email}</p>
              <p className="text-gray-600">{cliente.telefone}</p>
              <p className="text-gray-600">
                Coordenadas: {cliente.coordenada.x}, {cliente.coordenada.y}
              </p>
            </div>
          ))
        ) : (
          <div>Nenhum cliente encontrado.</div>
        )}
      </div>
      <div>
        {modalAberta && (
          <ClienteModal
            isOpen={modalAberta}
            onClose={fecharModal}
            clientes={clientes}
            onSubmit={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
        )}
      </div>
    </div>
  )
}

export default ClienteList
