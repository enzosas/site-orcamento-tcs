package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.entity.Motor;
import com.tcs.site_orcamento.entity.Talha;
import com.tcs.site_orcamento.repository.MotorRepository;
import com.tcs.site_orcamento.repository.TalhaRepository;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
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

    public Map<String, List<String>> getCodigosFaltando() {

        Map<String, Set<String>> codigosParaTestar = new LinkedHashMap<>();

        Set<String> talhas = new LinkedHashSet<>();
        Set<String> paineis = new LinkedHashSet<>();
        Set<String> contatoras = new LinkedHashSet<>();
        Set<String> disjuntores = new LinkedHashSet<>();
        Set<String> inversores = new LinkedHashSet<>();
        Set<String> resistores = new LinkedHashSet<>();

        codigosParaTestar.put("talhas", talhas);
        codigosParaTestar.put("paineis", paineis);
        codigosParaTestar.put("contatoras", contatoras);
        codigosParaTestar.put("disjuntores", disjuntores);
        codigosParaTestar.put("inversores", inversores);
        codigosParaTestar.put("resistores", resistores);

        List<Talha> talhasAll = talhaRepository.findAll();
        for (Talha talha : talhasAll) {
            paineis.add(talha.getCodigoPainelTalhaSemOpcional());
            paineis.add(talha.getCodigoPainel6Mov());
            talhas.add(talha.getModelo());
        }

        List<Motor> motores = motorRepository.findAll();
        for (Motor motor : motores) {
            contatoras.add(motor.getContatoraSch());
            contatoras.add(motor.getContatoraTcs());
            disjuntores.add(motor.getDisjuntorContatoraSch());
            disjuntores.add(motor.getDisjuntorContatoraTcs());
            inversores.add(motor.getInversorSch());
            inversores.add(motor.getInversorTcs());
            disjuntores.add(motor.getDisjuntorInversorSch());
            disjuntores.add(motor.getDisjuntorInversorTcs());
            resistores.add(motor.getResistorTcs());
        }

        Map<String, List<String>> codigosComErro = codigosParaTestar.entrySet().parallelStream()
            .collect(Collectors.toMap(
                Map.Entry::getKey,
                entry -> entry.getValue().stream()
                    .filter(Objects::nonNull)
                    .filter(codigo -> !codigo.isEmpty())
                    .filter(this::isCodigoFaltando)
                    .collect(Collectors.toList()),
                (list1, list2) -> list1,
                LinkedHashMap::new
            ));

        return codigosComErro;
    }

    public Map<String, Double> getPrecoTalhaAll() {

        Map<String, Double> info = new LinkedHashMap<>();

        List<Talha> talhasAll = talhaRepository.findAll();
        for (Talha talha : talhasAll) {
            String modelo = talha.getModelo();
            Double venda;
            try {
                venda = maxiprodService.getPrecoDeVenda(modelo);
            } catch (Exception e) {
                venda = null;
            }
            info.put(modelo, venda);
        }
        return info;
    }

    public Map<String, String> getDisjuntoresContatoraAll() {

        Map<String, String> disjuntores = new LinkedHashMap<>();
        List<Motor> motorAll = motorRepository.findAll();
        for (Motor motor : motorAll) {
            String disjuntorAndExisteSch = motor.getDisjuntorContatoraSch();
            String disjuntorAndExisteTcs = motor.getDisjuntorContatoraTcs();
            disjuntorAndExisteSch += (isCodigoFaltando(disjuntorAndExisteSch)? " out" : " in");
            disjuntorAndExisteTcs += (isCodigoFaltando(disjuntorAndExisteTcs)? " out" : " in");

            disjuntores.put(disjuntorAndExisteSch, disjuntorAndExisteTcs);
        }
        return disjuntores;
    }

    public Map<String, String> getDisjuntoresInversorAll() {

        Map<String, String> disjuntores = new LinkedHashMap<>();
        List<Motor> motorAll = motorRepository.findAll();
        for (Motor motor : motorAll) {
            String disjuntorAndExisteSch = motor.getDisjuntorInversorSch();
            String disjuntorAndExisteTcs = motor.getDisjuntorInversorTcs();
            disjuntorAndExisteSch += (isCodigoFaltando(disjuntorAndExisteSch)? " out" : " in");
            disjuntorAndExisteTcs += (isCodigoFaltando(disjuntorAndExisteTcs)? " out" : " in");

            disjuntores.put(disjuntorAndExisteSch, disjuntorAndExisteTcs);
        }
        return disjuntores;
    }
}
