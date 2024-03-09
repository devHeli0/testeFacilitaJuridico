import { injectable } from 'inversify';
import { ICoordenadaDTO } from '../../DTOs'
import { CalculoRota } from '../../BusinessObjects';

@injectable()
export class RotaOtimizadaUseCase {
  async execute(clientes: ICoordenadaDTO[]): Promise<ICoordenadaDTO[]> {
    const rotaOtima = this.calcularRotaOtima(clientes)
    return rotaOtima
  }

  private calcularRotaOtima(clientes: ICoordenadaDTO[]): ICoordenadaDTO[] {
    clientes.unshift(new CalculoRota(0, 0, false));
    let path = this.nearestNeighbor(clientes);
    return path;
  }

  private nearestNeighbor(points: ICoordenadaDTO[]) {
    let currentPoint = points[0]; // Começamos a partir do primeiro ponto
    currentPoint.visited = true; // Marcamos o ponto atual como visitado
    let path = [currentPoint]; // Inicializamos o caminho percorrido com o ponto inicial

    // Enquanto houver pontos não visitados
    while (path.length < points.length) {
      let nearestNeighbor = this.findNearestNeighbor(currentPoint, points);
      if (nearestNeighbor != null) {
        nearestNeighbor.visited = true; // Marcamos o ponto mais próximo como visitado
        path.push(nearestNeighbor); // Adicionamos o ponto mais próximo ao caminho percorrido
        currentPoint = nearestNeighbor; // Atualizamos o ponto atual para o ponto mais próximo
      }
    }

    return path;
  }

  private findNearestNeighbor(currentPoint: ICoordenadaDTO, points: ICoordenadaDTO[]): ICoordenadaDTO | null {
    let nearestNeighbor: ICoordenadaDTO | null = null;
    let shortestDistance = Infinity;

    // Para cada ponto não visitado
    points.forEach(point => {
      if (!point.visited && point !== currentPoint) {
        let distance = this.calculateDistance(currentPoint, point);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestNeighbor = point;
        }
      }
    });

    return nearestNeighbor;
  }

  calculateDistance(point1: ICoordenadaDTO, point2: ICoordenadaDTO) {
    // Calcula a distância euclidiana entre dois pontos
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
  }

  private calcularDistanciaTotal(
    clientes: ICoordenadaDTO[],
    rota: number[],
  ): number {
    let distanciaTotal = 0

    for (let i = 0; i < rota.length - 1; i++) {
      const clienteAtual = clientes[rota[i]]
      const proximoCliente = clientes[rota[i + 1]]
      distanciaTotal += this.calcularDistancia(clienteAtual, proximoCliente)
    }

    const ultimoCliente = clientes[rota[rota.length - 1]]
    distanciaTotal += this.calcularDistancia(ultimoCliente, { x: 0, y: 0 })

    return distanciaTotal
  }

  private calcularDistancia(
    pontoA: ICoordenadaDTO,
    pontoB: ICoordenadaDTO,
  ): number {
    return Math.sqrt(
      Math.pow(pontoB.x - pontoA.x, 2) + Math.pow(pontoB.y - pontoA.y, 2),
    )
  }

  private gerarPermutacoes(array: number[]): number[][] {
    const permutacoes: number[][] = [array.slice()]

    let i = 1
    while (i < array.length) {
      if (array[i] > 0) {
        array[i]--
        i = 1
        permutacoes.push(array.slice())
      } else {
        array[i] = i
        i++
      }
    }

    return permutacoes
  }
}

export default RotaOtimizadaUseCase
