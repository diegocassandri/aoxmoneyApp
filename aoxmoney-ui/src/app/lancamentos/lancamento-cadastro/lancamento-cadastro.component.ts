import { LancamentoService } from './../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from '../../categorias/categorias.service';
import { Lancamento } from '../../core/model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    {label : 'Receita', value : 'RECEITA'},
    {label : 'Despesa', value : 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(private categoriaService: CategoriasService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(formControl: FormControl) {
    this.lancamentoService.salvar(this.lancamento)
    .then(() => {
      this.toasty.success('Lançamento Adicionado com sucesso!');
      formControl.reset();
      this.lancamento = new Lancamento();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map(p => {
        return {label: p.nome, value: p.codigo};
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
