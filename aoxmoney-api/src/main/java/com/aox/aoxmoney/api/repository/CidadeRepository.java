package com.aox.aoxmoney.api.repository;


import com.aox.aoxmoney.api.model.Cidade;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CidadeRepository extends JpaRepository<Cidade,Long> {

    List<Cidade> findByEstadoCodigo(Long estadoCodigo);
}
