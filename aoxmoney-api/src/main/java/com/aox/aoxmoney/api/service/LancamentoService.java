package com.aox.aoxmoney.api.service;

import com.aox.aoxmoney.api.dto.LancamentoEstatisticaPessoa;
import com.aox.aoxmoney.api.mail.Mailer;
import com.aox.aoxmoney.api.model.Usuario;
import com.aox.aoxmoney.api.repository.UsuarioRepository;
import com.aox.aoxmoney.api.storage.S3;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.util.*;

import com.aox.aoxmoney.api.model.Lancamento;
import com.aox.aoxmoney.api.model.Pessoa;
import com.aox.aoxmoney.api.repository.LancamentoRepository;
import com.aox.aoxmoney.api.repository.PessoaRepository;
import com.aox.aoxmoney.api.service.exception.PessoaInexistenteOuInativaException;

import java.io.InputStream;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
public class LancamentoService {

	private static final String DESTINATARIOS = "ROLE_PESQUISAR_LANCAMENTO";

	private static final Logger logger = LoggerFactory.getLogger(LancamentoService.class);
	
	@Autowired
	private LancamentoRepository lancamentoRepository;
	
	@Autowired
	private PessoaRepository pessoaRepository;

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private Mailer mailer;

	@Autowired
	private S3 s3;

	@Scheduled(cron = "0 0 6 * * *")
	//@Scheduled(fixedDelay = 1000 * 60 * 30)
	public void avisarSobreLancamentosVencidos() {
		if(logger.isDebugEnabled()){
			logger.debug("Preparando envio de e-mails de aviso de lançamentos vencidos.");
		}


		List<Lancamento> vencidos = lancamentoRepository.findByDataVencimentoLessThanEqualAndDataPagamentoIsNull(LocalDate.now());

		if(vencidos.isEmpty()){
			logger.info("Sem lançamentos vencidos.");

			return;
		}

		logger.info("Existem {} lançamentos vencidos.", vencidos.size());

		List<Usuario> destinatarios = usuarioRepository.findByPermissoesDescricao(DESTINATARIOS);

		if(destinatarios.isEmpty()){
			logger.warn("Existem lançamentos vencidos, porém não existem destinatários.");

			return;
		}

		mailer.avisarSobreLancamentosVencidos(vencidos , destinatarios);

		logger.info("E-mail Enviado.");

	}


	public byte[] relatorioPorPessoa(LocalDate inicio, LocalDate fim) throws Exception {
		List<LancamentoEstatisticaPessoa> dados = lancamentoRepository.porPessoa(inicio, fim);

		Map<String, Object> parametros = new HashMap<>();
		parametros.put("DT_INICIO", Date.valueOf(inicio));
		parametros.put("DT_FIM", Date.valueOf(fim));
		parametros.put("REPORT_LOCALE", new Locale("pt", "BR"));

		InputStream inputStream = this.getClass().getResourceAsStream(
				"/relatorios/lancamentosPorPessoa.jasper");

		JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, parametros,
				new JRBeanCollectionDataSource(dados));

		return JasperExportManager.exportReportToPdf(jasperPrint);
	}
	

	public Lancamento salvar(Lancamento lancamento) {
		/*Pessoa pessoa = pessoaRepository.findOne(lancamento.getPessoa().getCodigo());
		if(pessoa == null || pessoa.isInativo()) {
			throw new PessoaInexistenteOuInativaException();
		}*/

		validarPessoa(lancamento);

		if(StringUtils.hasText(lancamento.getAnexo())){
			s3.salvar(lancamento.getAnexo());
		}

		return lancamentoRepository.save(lancamento);
	}


	public Lancamento atualizar(Long codigo, Lancamento lancamento) {
		Lancamento lancamentoSalvo = buscarLancamentoExistente(codigo);
		if (!lancamento.getPessoa().equals(lancamentoSalvo.getPessoa())) {
			validarPessoa(lancamento);
		}

		if(StringUtils.isEmpty(lancamento.getAnexo()) && StringUtils.hasText(lancamentoSalvo.getAnexo())){
			s3.remover(lancamentoSalvo.getAnexo());
		} else if (StringUtils.hasLength(lancamento.getAnexo()) && !lancamento.getAnexo().equals(lancamentoSalvo.getAnexo())) {
			s3.substituir(lancamentoSalvo.getAnexo(), lancamento.getAnexo());
		}

		BeanUtils.copyProperties(lancamento, lancamentoSalvo, "codigo");

		return lancamentoRepository.save(lancamentoSalvo);
	}
	
	private void validarPessoa(Lancamento lancamento) {
		Pessoa pessoa = null;
		if (lancamento.getPessoa().getCodigo() != null) {
			pessoa = pessoaRepository.getOne(lancamento.getPessoa().getCodigo());
		}

		if (pessoa == null || pessoa.isInativo()) {
			throw new PessoaInexistenteOuInativaException();
		}
	}

	private Lancamento buscarLancamentoExistente(Long codigo) {
		Optional<Lancamento> lancamentoSalvo = lancamentoRepository.findById(codigo);
		if (!lancamentoSalvo.isPresent()) {
			throw new IllegalArgumentException();
		}
		return lancamentoSalvo.get();
	}
	

}
