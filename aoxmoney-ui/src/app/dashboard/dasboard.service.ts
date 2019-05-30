import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import 'rxjs/operator/toPromise';
import * as moment from 'moment';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable()
export class DasboardService {

  lancamentosUrl: string;

  constructor(private http: MoneyHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }


  lancamentosPorCategoria(): Promise<Array<any>> {

    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatistica/por-categoria`)
    .toPromise();
  }

  lancamentosPorDia(): Promise<Array<any>> {

    return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatistica/por-dia`)
    .toPromise()
    .then(response => {
      const dados = response;
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
