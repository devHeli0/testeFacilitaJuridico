import React from 'react'
import { useNavigate } from 'react-router-dom'

import type BotaoNavegacaoProps from '../../interfaces/BotaoNavegacaoProps'

const BotaoNavegacao: React.FC<BotaoNavegacaoProps> = () => {
  const navigate = useNavigate()

  const cadastroPagina = () => {
    navigate('/clienteCadastro')
  }

  const listagemPagina = () => {
    navigate('/clientes')
  }

  return (
    <div className="flex justify-between">
      <button
        onClick={cadastroPagina}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Cadastro de Clientes
      </button>
      <button
        onClick={listagemPagina}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Lista de Clientes
      </button>
    </div>
  )
}

export default BotaoNavegacao
