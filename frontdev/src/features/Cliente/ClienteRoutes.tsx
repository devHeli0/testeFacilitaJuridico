import React from 'react'
import { Routes, Route } from 'react-router-dom'

import ClienteForm from '../../components/Cliente/ClienteForm'
import ClienteList from '../../components/Cliente/ClienteList'

const ClienteRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/clientes" element={<ClienteList clientes={[]} />} />
      <Route path="/clienteCadastro" element={<ClienteForm />} />
    </Routes>
  )
}

export default ClienteRoutes
