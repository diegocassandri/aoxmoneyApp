package com.aox.aoxmoney.api.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.aox.aoxmoney.api.model.Pessoa;
import com.aox.aoxmoney.api.repository.PessoaRepository;

import java.util.Optional;

@Service
public class PessoaService {
	
	@Autowired
	private PessoaRepository pessoaRepository; 

	public Pessoa salvar(Pessoa pessoa){
		pessoa.getContatos().forEach(c -> c.setPessoa(pessoa));

		return pessoaRepository.save(pessoa);
	}


	public Pessoa atualizar(Long codigo,Pessoa pessoa) {

		Pessoa pessoaSalva = buscarPessoaPeloCodigo(codigo);

		pessoaSalva.getContatos().clear();
		pessoaSalva.getContatos().addAll(pessoa.getContatos());
		pessoaSalva.getContatos().forEach(c -> c.setPessoa(pessoaSalva));

		BeanUtils.copyProperties(pessoa,pessoaSalva,"codigo","contatos");
		return pessoaRepository.save(pessoaSalva);
		
	}

	

	public void atualizarPropriedadeAtivo(Long codigo, Boolean ativo) {
		Pessoa pessoaSalva = buscarPessoaPeloCodigo(codigo);
		pessoaSalva.setAtivo(ativo);
		pessoaRepository.save(pessoaSalva);
		
	}
	
	public Pessoa buscarPessoaPeloCodigo(Long codigo) {
		Optional<Pessoa> pessoaSalva = pessoaRepository.findById(codigo);
		if(!pessoaSalva.isPresent()) {
			throw new EmptyResultDataAccessException(1);
		}
		return pessoaSalva.get();
	}
	
	
}
