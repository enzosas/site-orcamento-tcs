package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.entity.Motor;
import com.tcs.site_orcamento.entity.Talha;
import com.tcs.site_orcamento.repository.MotorRepository;
import com.tcs.site_orcamento.repository.TalhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DebugService {

    @Autowired
    private TalhaRepository talhaRepository;

    @Autowired
    private MotorRepository motorRepository;

    @Autowired
    private MaxiprodService maxiprodService;

    private Boolean isCodigoFaltando(String codigo) {
        if (codigo == null || codigo.isEmpty()) {
            return false;
        }

        try{
            maxiprodService.getPrecoDeVenda(codigo);
            return false;
        }
        catch (Exception e){
            return true;
        }
    }

    public List<String> getCodigosFaltando(){

        Set<String> codigosParaTestar = new LinkedHashSet<>();

        List<Talha> talhas = talhaRepository.findAll();
        for (Talha talha : talhas) {
            codigosParaTestar.add(talha.getCodigoPainelTalhaSemOpcional());
            codigosParaTestar.add(talha.getCodigoPainel6Mov());
            codigosParaTestar.add(talha.getModelo());
        }

        List<Motor> motores = motorRepository.findAll();
        for (Motor motor : motores) {
            codigosParaTestar.add(motor.getContatoraSch());
            codigosParaTestar.add(motor.getContatoraTcs());
            codigosParaTestar.add(motor.getDisjuntorContatoraSch());
            codigosParaTestar.add(motor.getDisjuntorContatoraTcs());
            codigosParaTestar.add(motor.getInversorSch());
            codigosParaTestar.add(motor.getInversorTcs());
            codigosParaTestar.add(motor.getDisjuntorInversorSch());
            codigosParaTestar.add(motor.getDisjuntorInversorTcs());
            codigosParaTestar.add(motor.getResistorTcs());
        }

        List<String> codigosComErro = codigosParaTestar.parallelStream() // <-- MUDANÇA AQUI
                .filter(this::isCodigoFaltando) // <-- Filtra: mantém apenas os que retornam true
                .collect(Collectors.toList());  // <-- Coleta os resultados em uma nova lista

        return codigosComErro;
    }
}
