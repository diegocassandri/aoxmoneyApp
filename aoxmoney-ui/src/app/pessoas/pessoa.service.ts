import { environment } from './../../environments/environment';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa, Estado, Cidade } from '../core/model';
import { MoneyHttp } from '../seguranca/money-http';




@Injectable()
export class PessoaService {

  pessoasUrl: string;
  estadosUrl: string;
  cidadesUrl: string;

  constructor(private http: MoneyHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  pesquisar(filtro: PessoasFiltro):  Promise<any> {
    let params = new HttpParams({ fromObject : {
      page: filtro.pagina.toString(),
      size: filtro.itensPorPagina.toString()
    }});


    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.pessoasUrl}`, {params})
    .toPromise()
    .then(response => {
      const pessoas = response.content;

      const resultado = {
        pessoas,
        total:  response.totalElements
      };
      return resultado;
    });
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(this.pessoasUrl)
      .toPromise()
      .then(response => response.content);
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }


  salvar(pessoa: Pessoa): Promise<Pessoa> {
   return this.http.post<Pessoa>(`${this.pessoasUrl}`, pessoa)
    .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
    .toPromise();
  }

  buscaPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
    .toPromise();
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl).toPromise();
  }

  pesquisarCidades(estado): Promise<Cidade[]> {
    let params = new HttpParams().append('estado',estado);
    return this.http.get<Cidade[]>(this.cidadesUrl,{params})
         .toPromise();
  }
  

}



export class PessoasFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
