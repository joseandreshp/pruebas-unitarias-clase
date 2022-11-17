import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ComponentFixture, TestBed , fakeAsync} from '@angular/core/testing';
import { ConsultaService } from 'src/app/services/consulta.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ClienteComponent } from './cliente.component';
import { Observable } from 'rxjs';
import { ResultParametros } from 'src/app/models/parametro.interface';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;
  let consultaService : ConsultaService;

  const respErrorTipoDocumento : ResultParametros = {
    result: [],
    codMessage: 'COD00',
    message: 'Error',
    sucess: false
  }

  const respErrorTipoDocumento2 : ResultParametros = {
    result: null,
    codMessage: null,
    message: null,
    sucess: null
  }

  const respOKTipoDocumento : ResultParametros = {
    result: [
      {
        codigoParametro: '0000000001',
        codigoDominio: '0000000015',
        descripcion1: '0',
        descripcion2: 'DNI',
        descripcion3: 'DOCUMENTO NACIONAL DE IDENTIDAD',
        descripcion4: '',
        estado: null
      },
      {
        codigoParametro: '0000000002',
        codigoDominio: '0000000015',
        descripcion1: '1',
        descripcion2: 'CE',
        descripcion3: 'CARNET DE EXTRANJERIA',
        descripcion4: '',
        estado: null
      },
    ],
    codMessage: 'COD02',
    message: '',
    sucess: true
  }

  beforeEach(fakeAsync(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [ ClienteComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
    consultaService = TestBed.inject(ConsultaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validar retorno entero', () => {
    let valorString: string = '2';
    expect(component.getInt(valorString)).toEqual(2);
  });

  it('Validar retorno cadena', () => {
    let valorEntero: number = 10;
    expect(component.getString(valorEntero)).toBe('10');
  });

  it('Validar suma', () => {
    component.valor1 = 2;
    component.valor2 = 3;
    expect(component.getSuma()).toEqual(5);
  });

  it('Validar tipo documento DNI', () => {
    component.descripcionTipoDocumento = 'DNI';
    component.getValorTipoDocumento();
    expect(component.tipoDocumento).toBe(1);
  });

  it('Validar tipo documento CE', () => {
    component.descripcionTipoDocumento = 'CE';
    component.getValorTipoDocumento();
    expect(component.tipoDocumento).toBe(4);
  });

  it('Validar tipo documento otro', () => {
    component.descripcionTipoDocumento = 'PTP';
    component.getValorTipoDocumento();
    expect(component.tipoDocumento).toBe(0);
  });

  it('Consultar servicio parametria tipo documento ok', () => {
    const spyTipoDocumento = spyOn(consultaService, 'getDocumentType').and.returnValue(
      new Observable((subscribe) => {
        subscribe.next(respOKTipoDocumento);
        return subscribe;
      })
    )

    component.getTipoDocumento();
    expect(spyTipoDocumento).toHaveBeenCalledWith();
  });

  it('Consultar servicio parametria tipo documento error', () => {
    const spyTipoDocumentoError = spyOn(consultaService, 'getDocumentType').and.returnValue(
      new Observable((subscribe) => {
        subscribe.next(respErrorTipoDocumento);
        return subscribe;
      })
    )

    component.getTipoDocumento();
    expect(spyTipoDocumentoError).toHaveBeenCalledWith();
  });

  it('Consultar servicio parametria tipo documento error', () => {
    const spyTipoDocumentoError = spyOn(consultaService, 'getDocumentType').and.returnValue(
      new Observable((subscribe) => {
        subscribe.next(respErrorTipoDocumento2);
        return subscribe;
      })
    )
    component.getTipoDocumento();
    expect(spyTipoDocumentoError).toHaveBeenCalledWith();
    expect(component.codigoError).toEqual('CODERR');
  });
});
