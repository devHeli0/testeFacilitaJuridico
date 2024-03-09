import React from 'react'

import type RotaCliente from '../../interfaces/Rota'

const RotaVisualization: React.FC<{ rota: RotaCliente[] }> = ({ rota }) => {
  return (
    <div>
      <h2>Rota de Visitacao</h2>
      <ol>
        {rota.map((cliente, index) => (
          <li key={index}>{cliente.nome}</li>
        ))}
      </ol>
    </div>
  )
}

export default RotaVisualization
