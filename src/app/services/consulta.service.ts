import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { ResultParametros } from '../models/parametro.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  private urlWebApi: string;

  constructor(private http: HttpClient) {
    this.urlWebApi = 'http://desa.psi.sura.pe/app-web-afiliaciones/Afiliaciones';
  }

  public getDocumentType(): Observable<ResultParametros> {
    const url = this.urlWebApi + '/ObtenerTipoDocumento';
    return this.http
        .get(url).pipe(
        map((resp: any) => this.mapearDatos(resp)),
        catchError((e: any) =>
            observableThrowError(this.capturarError(e))
        ),);
  }

  public getStatusChannel(): Observable<ResultParametros> {
    const url = this.urlWebApi + '/ObtenerEstadoCanal';
    return this.http
        .get(url).pipe(
        map((resp: any) => this.mapearDatos(resp)),
        catchError((e: any) =>
            observableThrowError(this.capturarError(e))
        ),);
  }

  private mapearDatos(resultado: any) {
    const contenido = resultado;
    return contenido || {};
  }

  private capturarError(error: any) {
    console.error(error);
    return false;
  }
}
