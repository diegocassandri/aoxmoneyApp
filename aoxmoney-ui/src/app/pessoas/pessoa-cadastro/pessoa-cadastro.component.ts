import { Component, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Pessoa } from '../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');

    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.buscaPessoa(codigo);
    }
  }

  buscaPessoa(codigo: number) {
    this.pessoaService.buscaPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(formControl: FormControl) {
    if (this.pessoa.codigo) {
      this.editar(formControl);
    } else {
      this.adicionar(formControl);
    }
  }

  adicionar(formControl: FormControl) {
    this.pessoaService.salvar(this.pessoa)
    .then((pessoaAdicionada) => {
      this.toasty.success('Pessoa Cadastrada com sucesso!');

      this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  editar(formControl: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then((pessoa) => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
      this.toasty.success('Pessoa Alterada com sucesso!');

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

}
