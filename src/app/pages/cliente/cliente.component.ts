import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Parametros, ResultParametros } from 'src/app/models/parametro.interface';
import { ConsultaService } from 'src/app/services/consulta.service';
import { Canal, CodigoMensaje } from 'src/app/shared/constants';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  valor1: number;
  valor2: number;
  total: number;

  tipoDocumento: number;
  descripcionTipoDocumento: string;
  tipoDocumentoParametro :Parametros[];
  canalParametro :Parametros[];
  mensajeCodigoResponse: string;
  codigoResponse: string;
  codigoError: string;
  descripcionCanal: string;

  constructor(private consultaService: ConsultaService) { }

  ngOnInit(): void {
    this.codigoError = 'CODERR';
  }

  getInt(numero: string) :number {
    return parseInt(numero);
  }

  getString(cadena: number): string {
    return cadena.toString();
  }

  getSuma(): number {
    this.total = this.valor1 + this.valor2;
    return this.total;
  }
  
  getValorTipoDocumento() {
    if (this.descripcionTipoDocumento === 'DNI') {
      this.tipoDocumento = 1;
    } else if (this.descripcionTipoDocumento === 'CE') {
      this.tipoDocumento = 4;
    } else {
      this.tipoDocumento = 0;
    }
  }

  returnCodigoError(resp: any){
    if (resp.codMessage === undefined || resp.codMessage === null) {
      return this.codigoError;
    } else {
      return resp.codMessage;
    }
  }

  getTipoDocumento() {
    this.consultaService.getDocumentType()
    .subscribe(resp =>{
      if(resp.sucess) {
        this.tipoDocumentoParametro = resp.result || [];
      } else {
        this.codigoResponse = this.returnCodigoError(resp);
      }
    });
  }

  validarCodigoCanal(codigoParametroCanal: string) {
    for(const canal of this.canalParametro) {
      if(canal.codigoParametro === codigoParametroCanal) {
        return CodigoMensaje.COD_CANAL_CORREO;
      } 
      else if(canal.codigoParametro === codigoParametroCanal) {
        return CodigoMensaje.COD_CANAL_TREGISTRO;
      } 
      else {
        return CodigoMensaje.COD_CANAL_AFPNET;
      }
    }
  }

  validarMensajeCodigoCanal(codigo: string) {
    if(codigo !== null && codigo !== undefined){
      return 'CODIGO OK';
    } else {
      return 'CODIGO NULO O INDEFINIDO';
    }
  }

  getCanal() {
    this.consultaService.getStatusChannel()
    .subscribe(resp =>{
      if(resp.sucess) {
        this.canalParametro = resp.result || [];
        this.mensajeCodigoResponse = this.validarMensajeCodigoCanal(resp.codMessage);
      } else {
        this.codigoResponse = this.returnCodigoError(resp.codMessage);
      }
    });
  }
}
