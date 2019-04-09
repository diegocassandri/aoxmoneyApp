package com.aox.aoxmoney.api.repository.listener;

import com.aox.aoxmoney.api.AoxmoneyApiApplication;
import com.aox.aoxmoney.api.model.Lancamento;
import com.aox.aoxmoney.api.storage.S3;
import org.springframework.util.StringUtils;

import javax.persistence.PostLoad;

public class LancamentoAnexoListener {

    @PostLoad
    public void postLoad(Lancamento lancamento) {
        if(StringUtils.hasText(lancamento.getAnexo())) {
            S3 s3 = AoxmoneyApiApplication.getBean(S3.class);
            lancamento.setUrlAnexo(s3.configurarUrl(lancamento.getAnexo()));
        }
    }
}
