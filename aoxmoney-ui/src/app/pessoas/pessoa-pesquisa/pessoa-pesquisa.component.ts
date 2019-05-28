import { Component, OnInit, ViewChild, ErrorHandler } from '@angular/core';
import { PessoaService, PessoasFiltro } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  filtro = new PessoasFiltro();
  pessoas = [];
  totalRegistros = 0;
  @ViewChild('tabela') grid;

  constructor(private pessoaService: PessoaService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Pessoas');

  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    } )
    .catch(erro => this.errorHandler.handle(erro));

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }

    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
        .then(() => {
          if (this.grid.first === 0) {
            this.pesquisar();
          } else {
            this.grid.first = 0;
          }
          this.messageService.add({severity: 'success', detail:'Pessoa excluída com sucesso!'});
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  mudarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo , novoStatus)
    .then(() => {
      const acao = novoStatus ? 'Ativada' : 'Desativada' ;

      pessoa.ativo = novoStatus;
      this.messageService.add({ severity: 'sucsess', detail: `Pessoa ${acao} com sucesso!`});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
