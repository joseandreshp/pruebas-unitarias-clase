import { Result } from "./result.interface";


export class ResultParametros extends Result {
    result: Parametros[];
}
export class Parametros {
    codigoParametro: string;
    codigoDominio: string;
    descripcion1: string;
    descripcion2: string;
    descripcion3: string;
    descripcion4: string;
    estado: string;
}
