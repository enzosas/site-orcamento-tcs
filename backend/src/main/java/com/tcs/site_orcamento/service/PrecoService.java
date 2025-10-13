package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.dto.ConfigDTO;
import com.tcs.site_orcamento.entity.Motor;
import com.tcs.site_orcamento.entity.Talha;
import com.tcs.site_orcamento.repository.MotorRepository;
import com.tcs.site_orcamento.repository.TalhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.StyledEditorKit;
import java.util.Objects;
import java.util.Optional;

@Service
public class PrecoService {

    @Autowired
    private MaxiprodService maxiprodService;

    @Autowired
    private TalhaRepository talhaRepository;

    @Autowired
    private MotorRepository motorRepository;

    private Double getPreco(String codigo, Boolean ipi){

        if(ipi){
            return maxiprodService.getPrecoDeVenda(codigo) *  (1 + maxiprodService.getIpi(codigo)/100);
        }
        else{
            return maxiprodService.getPrecoDeVenda(codigo);
        }
    }

    public Double calculaPrecoDeVenda(ConfigDTO config) {

        Boolean ipi = false;

        Talha talha = talhaRepository.findById(config.getTalhaSelecionada())
                .orElseThrow(() -> new RuntimeException("?????????Talha não encontrada com o ID: " + config.getTalhaSelecionada()));

        System.out.println(config.getTalhaSelecionada());
        System.out.println(talha.getMotorElevacao());

        Integer tensao;
        if(Objects.equals(config.getTensao(), "380V - Trifásica")){
            tensao = 380;
        }
        else if(Objects.equals(config.getTensao(), "220V - Trifásica")){
            tensao = 220;
        }
        else{
            throw new IllegalArgumentException("Tensão inválida ou não suportada: " + config.getTensao());
        }

        System.out.println(tensao);

        Motor motor = motorRepository.findByMotorAndTensao(talha.getMotorElevacao(), tensao);

        System.out.println("motorid:" + motor.getId());

        System.out.println("CodigoPainelTalhaSemOpcional:" + talha.getCodigoPainelTalhaSemOpcional());

        Double precoTotal = 0.0;
        Double precoPainel = 0.0;

        if(Objects.equals(talha.getCodigoPainelTalhaSemOpcional(), "CIRC.ORIGINAL")){
            precoPainel = 0.0;
        }
        else {
            precoPainel = getPreco(talha.getCodigoPainelTalhaSemOpcional(), ipi);
        }

        System.out.println("precoPainel:" + precoPainel);


        Double precoPainel6Mov = 0.0;
        if (talha.getCodigoPainel6Mov() != null && !talha.getCodigoPainel6Mov().isEmpty()) {
            precoPainel6Mov = maxiprodService.getPrecoDeVenda(motor.getResistor());
        }

        Double precoContatora = getPreco(motor.getContatora(), ipi);

        Double precoDisjuntorContatora = getPreco(motor.getDisjuntorContatora(), ipi);

        Double precoDisjuntorInversor = getPreco(motor.getDisjuntorInversor(), ipi);

        Double precoInversor = getPreco(motor.getInversor(), ipi);

        Double precoResistor = 0.0;
        if (motor.getResistor() != null && !motor.getResistor().isEmpty()) {
            precoResistor = maxiprodService.getPrecoDeVenda(motor.getResistor());
        }

        System.out.println();
        System.out.println("--- Detalhes do Cálculo de Preços ---");
        System.out.println("Preço Painel 6 Mov: " + precoPainel6Mov);
        System.out.println("Preço Contatora: " + precoContatora);
        System.out.println("Preço Disjuntor Contatora: " + precoDisjuntorContatora);
        System.out.println("Preço Disjuntor Inversor: " + precoDisjuntorInversor);
        System.out.println("Preço Inversor: " + precoInversor);
        System.out.println("Preço Resistor: " + precoResistor);
        System.out.println("------------------------------------");

        return precoTotal;
    }
}
