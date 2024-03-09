import { ICoordenadaDTO } from "../DTOs";

export class CalculoRota implements ICoordenadaDTO {
    x: number;
    y: number;
    visited: boolean;
    constructor(x: number, y: number, visited: boolean) {
        this.x = x;
        this.y = y;
        this.visited = visited;
    };

}