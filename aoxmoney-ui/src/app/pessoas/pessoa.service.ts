import { environment } from './../../environments/environment';
import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Pessoa, Estado, Cidade } from '../core/model';
import { AuthHttp } from 'angular2-jwt';



@Injectable()
export class PessoaService {

  pessoasUrl: string;
  estadosUrl: string;
  cidadesUrl: string;

  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  pesquisar(filtro: PessoasFiltro):  Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, {search: params})
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const pessoas = responseJson.content;

      const resultado = {
        pessoas,
        total:  responseJson.totalElements
      };
      return resultado;
    });
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  mudarStatus (codigo: number, status: boolean): Promise<void> {
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status )
    .toPromise()
    .then(() => null);
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
   return this.http.post(`${this.pessoasUrl}`, JSON.stringify(pessoa))
    .toPromise()
    .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
    .toPromise()
    .then(response => response.json());
  }

  buscaPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(response => response.json());
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get(this.estadosUrl).toPromise().then(response => response.json());
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    const params = new URLSearchParams;
    params.set('estado',estado);
    return this.http.get(this.cidadesUrl,{ search: params})
         .toPromise()
         .then(response => response.json());
  }
  

}



export class PessoasFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
