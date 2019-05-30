import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable()
export class CategoriasService {

  categoriasUrl: string;

  constructor(private http: MoneyHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.categoriasUrl}`)
    .toPromise();
  }

}
