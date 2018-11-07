import { Component, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Pessoa } from '../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService) { }

  ngOnInit() {
  }

  salvar(formControl: FormControl) {
    this.pessoaService.salvar(this.pessoa)
    .then(() => {
      this.toasty.success('Pessoa Cadastrada com sucesso!');
      formControl.reset();
      this.pessoa = new Pessoa();
    })
    .catch(erro => this.errorHandler.handle(erro));


  }

}
