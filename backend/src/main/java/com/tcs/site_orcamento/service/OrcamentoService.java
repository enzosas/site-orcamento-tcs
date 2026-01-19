package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.dto.ConfigDTO;
import com.tcs.site_orcamento.entity.Orcamento;
import com.tcs.site_orcamento.repository.OrcamentoRepository;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrcamentoService {

    @Autowired
    private OrcamentoRepository orcamentoRepository;

    public Orcamento salvarOrcamento(ConfigDTO config, Map<String, Object> dadosCliente) {
        Orcamento orcamento = new Orcamento();
        orcamento.setTalhaSelecionada(config.getTalhaSelecionada());
        orcamento.setExcluirPainel(config.isExcluirPainel());
        orcamento.setPainel6Mov(config.isPainel6Mov());
        orcamento.setControleRemoto(config.isControleRemoto());
        orcamento.setDuplaVelocidadeElevacao(config.isDuplaVelocidadeElevacao());
        orcamento.setDuplaVelocidadeTranslacao(config.isDuplaVelocidadeTranslacao());
        orcamento.setTransmissorExtra(config.isTransmissorExtra());

        orcamento.setPotenciaMotores(config.getPotenciaMotores() != null ? config.getPotenciaMotores() : "");
        orcamento.setModeloControle(config.getModeloControle() != null ? config.getModeloControle() : "");
        orcamento.setTensao(config.getTensao() != null ? config.getTensao() : "");

        orcamento.setIncluirSinalizadores(config.isIncluirSinalizadores());
        orcamento.setFimCursoEsquerdaDireita(config.isFimCursoEsquerdaDireita());
        orcamento.setGuiaCaboAco(config.isGuiaCaboAco());
        orcamento.setCelulaCarga(config.isCelulaCarga());
        orcamento.setAdaptadorViga(config.isAdaptadorViga());

        orcamento.setCliente(dadosCliente);

        return orcamentoRepository.save(orcamento);
    }

    public ConfigDTO orcToDto(Orcamento orcamento) {
        ConfigDTO dto = new ConfigDTO();
        dto.setTalhaSelecionada(orcamento.getTalhaSelecionada());
        dto.setExcluirPainel(orcamento.getExcluirPainel());
        dto.setPainel6Mov(orcamento.getPainel6Mov());
        dto.setControleRemoto(orcamento.getControleRemoto());
        dto.setDuplaVelocidadeElevacao(orcamento.getDuplaVelocidadeElevacao());
        dto.setDuplaVelocidadeTranslacao(orcamento.getDuplaVelocidadeTranslacao());
        dto.setTransmissorExtra(orcamento.getTransmissorExtra());
        dto.setPotenciaMotores(orcamento.getPotenciaMotores());
        dto.setModeloControle(orcamento.getModeloControle());
        dto.setTensao(orcamento.getTensao());
        dto.setIncluirSinalizadores(orcamento.getIncluirSinalizadores());
        dto.setFimCursoEsquerdaDireita(orcamento.getFimCursoEsquerdaDireita());
        dto.setGuiaCaboAco(orcamento.getGuiaCaboAco());
        dto.setCelulaCarga(orcamento.getCelulaCarga());
        dto.setAdaptadorViga(orcamento.getAdaptadorViga());
        return dto;
    }
}
