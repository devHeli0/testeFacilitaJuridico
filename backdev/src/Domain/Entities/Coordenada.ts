import { ICoordenadaDTO } from '../../Application/DTOs'

export default class Coordenada {
  public readonly id?: number
  public x: number
  public y: number

  constructor(x: number, y: number, id?: number) {
    this.x = x
    this.y = y
    this.id = id
  }

  static create({ x, y }: ICoordenadaDTO): Coordenada {
    return new Coordenada(x, y)
  }
}
