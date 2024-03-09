import ky from 'ky'

import type Cliente from '../../interfaces/Cliente'

const API_URL = 'http://localhost:3000/clientes'

const ClienteService = {
  getClientes: async (): Promise<Cliente[]> => {
    return ky.get(API_URL).json()
  },
  addCliente: async (cliente: Cliente): Promise<Cliente> => {
    return ky.post(`${API_URL}/cadastro`, { json: cliente }).json()
  },
}

export default ClienteService
