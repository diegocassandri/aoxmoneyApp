package com.aox.aoxmoney.api.repository.lancamento;



import com.aox.aoxmoney.api.dto.LancamentoEstatisticaCategoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.aox.aoxmoney.api.model.Lancamento;
import com.aox.aoxmoney.api.repository.filter.LancamentoFilter;
import com.aox.aoxmoney.api.repository.projection.ResumoLancamento;

import java.time.LocalDate;
import java.util.List;

public interface LancamentoRepositoryQuery {

	public List<LancamentoEstatisticaCategoria> porCategoria(LocalDate mesReferencia);
	
	public Page<Lancamento> filtrar(LancamentoFilter lancamentoFilter, Pageable pageable);
	public Page<ResumoLancamento> resumir(LancamentoFilter lancamentoFilter, Pageable pageable);
}
