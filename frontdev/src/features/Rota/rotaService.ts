import ky from 'ky'

import type Coordenada from '../../interfaces/Coordenada'

const API_URL = 'http://localhost:3000/clientes/rota'

const RotaService = {
  calcularRotaOtimizada: async (coordenadas: Coordenada[]): Promise<any> => {
    const url = new URL(API_URL)
    coordenadas.forEach((coordenada) => {
      url.searchParams.append('x', coordenada.x.toString())
      url.searchParams.append('y', coordenada.y.toString())
    })

    const response = await ky.get(url.toString()).json()
    console.log(response)
    return response
  },
}

export default RotaService
