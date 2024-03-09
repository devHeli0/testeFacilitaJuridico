import React, { useState, useEffect } from 'react'

import RotaService from '../../features/Rota/rotaService'
import type ClienteModalProps from '../../interfaces/ClienteModalProps'

const ClienteModal: React.FC<ClienteModalProps> = ({
  isOpen,
  onClose,
  clientes,
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [visitaOrdenada, setVisitaOrdenada] = useState<any[]>([])

  const handleOpenModal = async () => {
    try {
      const coordenadas = clientes
        .filter(
          (cliente) => cliente.coordenada.x !== 0 || cliente.coordenada.y !== 0,
        )
        .map((cliente) => ({
          x: cliente.coordenada.x,
          y: cliente.coordenada.y,
        }))
      const ordemVisita = await RotaService.calcularRotaOtimizada(coordenadas)
      setVisitaOrdenada(ordemVisita)
      setModalOpen(true)
    } catch (error) {
      console.error('Erro ao calcular rota otimizada:', error)
    }
  }

  useEffect(() => {
    if (isOpen) {
      handleOpenModal()
    }
  }, [isOpen])

  const obterNomeClientePorCoordenada = (coordenada: any) => {
    const cliente = clientes.find((cliente) => {
      return (
        cliente.coordenada.x === coordenada.x &&
        cliente.coordenada.y === coordenada.y
      )
    })
    return cliente ? cliente.nome : 'Nome não encontrado'
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? '' : 'hidden'
      }`}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
      <div className="relative bg-white rounded-lg p-8 max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          Ordem de Visita dos Clientes
        </h2>
        <div className="absolute top-0 right-0">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            X
          </button>
        </div>
        {modalOpen && (
          <div>
            <ul className="divide-y divide-gray-200">
              {visitaOrdenada.map((coordenada, index) => (
                <li key={index} className="py-2">
                  <span className="font-semibold">
                    {obterNomeClientePorCoordenada(coordenada)}
                  </span>{' '}
                  - X: {coordenada.x}, Y: {coordenada.y}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClienteModal
