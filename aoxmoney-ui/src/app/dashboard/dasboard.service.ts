import { AuthHttp } from 'angular2-jwt';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import 'rxjs/operator/toPromise';
import * as moment from 'moment';

@Injectable()
export class DasboardService {

  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }


  lancamentosPorCategoria(): Promise<Array<any>> {

    return this.http.get(`${this.lancamentosUrl}/estatisticcas/por-categoria`)
    .toPromise()
    .then(response => response.json());
  }

  lancamentosPorDia(): Promise<Array<any>> {

    return this.http.get(`${this.lancamentosUrl}/estatisticcas/por-dia`)
    .toPromise()
    .then(response => {
      const dados = response.json();
      this.converterStringsParaDatas(dados);
      return dados;
    });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
