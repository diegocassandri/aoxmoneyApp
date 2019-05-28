import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import {DropdownModule} from 'primeng/dropdown'

import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaCadastroContatoComponent} from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';
import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas.routing.module';
import {PanelModule} from 'primeng/panel';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputMaskModule,
    PessoasRoutingModule,
    PanelModule,
    TableModule,
    DialogModule,
    DropdownModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoaPesquisaComponent,
    PessoaCadastroContatoComponent],
  exports: []
})
export class PessoasModule { }
