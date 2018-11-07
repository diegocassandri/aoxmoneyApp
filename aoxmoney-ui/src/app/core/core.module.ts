import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';

import { ErrorHandlerService } from './error-handler.service';
import { CategoriasService } from '../categorias/categorias.service';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  imports: [
    CommonModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriasService,
    ErrorHandlerService,

    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
