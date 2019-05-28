import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import {JwtHelper} from 'angular2-jwt';
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';

import { ErrorHandlerService } from './error-handler.service';
import { CategoriasService } from '../categorias/categorias.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../seguranca/auth.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { DasboardService } from '../dashboard/dasboard.service';
import { RelatoriosService} from '../relatorios/relatorios.service';

registerLocaleData(localePt, 'pt-BR');
@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    GrowlModule,
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  exports: [
    NavbarComponent,
    GrowlModule,
    ConfirmDialogModule],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriasService,
    ErrorHandlerService,
    Title,
    AuthService,
    DasboardService,
    RelatoriosService,

    ConfirmationService,
    MessageService,
    JwtHelper,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
