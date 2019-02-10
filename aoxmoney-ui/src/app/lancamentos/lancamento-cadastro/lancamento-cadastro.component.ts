import { LancamentoService } from './../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriasService } from '../../categorias/categorias.service';
import { Lancamento } from '../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  // lancamento = new Lancamento();
  formulario: FormGroup;

  constructor(private categoriaService: CategoriasService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.configurarFormulario();
    this.title.setTitle('Novo lançamento');

    const codigo = this.route.snapshot.params['codigo'];

    if (codigo) {
      this.buscaLancamento(codigo);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      valor: [null, Validators.required],
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true } );
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: { tamanho: valor } };
    };
  }

  buscaLancamento(codigo: number) {
    this.lancamentoService.buscaPorCodigo(codigo)
    .then(lancamento => {
      // this.lancamento = lancamento;
      this.formulario.patchValue(lancamento);
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value);
  }

  salvar() {
    if (this.editando) {
      this.editar();
    } else {
      this.adicionar();
    }
  }

  adicionar() {
    this.lancamentoService.salvar(this.formulario.value)
    .then((lancamentoAdicionado) => {
      this.toasty.success('Lançamento Adicionado com sucesso!');

      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  editar() {
    this.lancamentoService.atualizar(this.formulario.value)
    .then((lancamento) => {
      // this.lancamento = lancamento;
      this.formulario.patchValue(lancamento);
      this.atualizarTituloEdicao();
      this.toasty.success('Lançamento Alterado com sucesso!');

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

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }

}
