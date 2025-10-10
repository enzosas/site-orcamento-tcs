package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.entity.Motor;
import com.tcs.site_orcamento.entity.Talha;
import com.tcs.site_orcamento.repository.MotorRepository;
import com.tcs.site_orcamento.repository.TalhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.StyledEditorKit;
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

    public String calculaPrecoDeVenda(String talhaString) {

        Talha talha = talhaRepository.findById(talhaString)
                .orElseThrow(() -> new RuntimeException("Talha não encontrada com o ID: " + talhaString));


        Motor motor = motorRepository.findByMotorAndTensao(talha.getMotorElevacao(), 380);

        Double precoTotal = 0.0;


        Double precoPainel = getPreco(talha.getCodigoPainelTalhaSemOpcional(), false);

        Double precoPainel6Mov = 0.0;
        if (talha.getCodigoPainel6Mov() != null && !talha.getCodigoPainel6Mov().isEmpty()) {
            precoPainel6Mov = maxiprodService.getPrecoDeVenda(motor.getResistor());
        }

        Double precoContatora = getPreco(motor.getContatora(), false);

        Double precoDisjuntorContatora = getPreco(motor.getDisjuntorContatora(), false);

        Double precoDisjuntorInversor = getPreco(motor.getDisjuntorInversor(), false);

        Double precoInversor = getPreco(motor.getInversor(), false);

        Double precoResistor = 0.0;
        if (motor.getResistor() != null && !motor.getResistor().isEmpty()) {
            precoResistor = maxiprodService.getPrecoDeVenda(motor.getResistor());
        }

        precoTotal = precoPainel + precoContatora*2 + precoDisjuntorContatora;

        return precoPainel + " " + precoContatora + " " + precoDisjuntorContatora;
    }
}
