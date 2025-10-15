package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.dto.ConfigDTO;
import com.tcs.site_orcamento.entity.Motor;
import com.tcs.site_orcamento.entity.Talha;
import com.tcs.site_orcamento.repository.MotorRepository;
import com.tcs.site_orcamento.repository.TalhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

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

    private Integer getTensaoInt(ConfigDTO config){

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
        return tensao;
    }

    private String getMotor6MovPotencia(ConfigDTO config){
        return config.getPotenciaMotores().replace("2 x ", "");

    }

    private Double calculaPrecoDeVendaPainelBase(Talha talha, Boolean ipi){

        double precoPainel;
        if(Objects.equals(talha.getCodigoPainelTalhaSemOpcional(), "CIRC.ORIGINAL")){
            precoPainel = 0.0;
        }
        else {
            precoPainel = getPreco(talha.getCodigoPainelTalhaSemOpcional(), ipi);
        }

        System.out.println("precoPainel:" + precoPainel);
        return precoPainel;
    }

    private Double calculaPrecoDeVendaPainelAdicional(Talha talha, Boolean ipi){

        double precoPainel = 0.0;
        if(talha.getCodigoPainel6Mov() != null && !talha.getCodigoPainel6Mov().isEmpty()){

            System.out.println("getCodigoPainel6Mov:" + talha.getCodigoPainel6Mov());
            precoPainel = getPreco(talha.getCodigoPainel6Mov(), ipi);
        }
        System.out.println("precoPainelAdd:" + precoPainel);
        return precoPainel;
    }

    private Double calculaPrecoDeVendaDuplaVelocidadeElevacao(Motor motor, ConfigDTO config, Boolean ipi){

        double precoTotal = 0.0;
        if(!config.isDuplaVelocidadeElevacao()){
            precoTotal += 2 * getPreco(motor.getContatoraSch(), ipi);
            System.out.println("getContatora:" + motor.getContatoraSch());
            System.out.println("getContatora:" + "preco" + 2 * getPreco(motor.getContatoraSch(), ipi));
            precoTotal += getPreco(motor.getDisjuntorContatoraSch(), ipi);
            System.out.println("getDisjuntorContatora:" + motor.getDisjuntorContatoraSch());
            System.out.println("getDisjuntorContatora:" + "preco" + getPreco(motor.getDisjuntorContatoraSch(), ipi));
        }
        else{
            precoTotal += getPreco(motor.getInversorSch(), ipi);
            System.out.println("getInversor:" + motor.getInversorSch());
            System.out.println("getInversor:" + "preco" + getPreco(motor.getInversorSch(), ipi));
            precoTotal += getPreco(motor.getDisjuntorInversorSch(), ipi);
            System.out.println("getDisjuntorInversor:" + motor.getDisjuntorInversorSch());
            System.out.println("getDisjuntorInversor:" + "preco" + getPreco(motor.getDisjuntorInversorSch(), ipi));
        }
        return precoTotal;
    }

    private Double calculaPrecoDeVendaDuplaVelocidadeTranslacao(Motor motor, ConfigDTO config, Boolean ipi){

        double precoTotal = 0.0;
        if(config.isDuplaVelocidadeTranslacao()) {
            precoTotal += getPreco(motor.getInversorSch(), ipi);
            System.out.println("getInversor:" + motor.getInversorSch());
            System.out.println("getInversor:" + "preco" + getPreco(motor.getInversorSch(), ipi));
            precoTotal += getPreco(motor.getDisjuntorInversorSch(), ipi);
            System.out.println("getDisjuntorInversor:" + motor.getDisjuntorInversorSch());
            System.out.println("getDisjuntorInversor:" + "preco" + getPreco(motor.getDisjuntorInversorSch(), ipi));
        }
        return precoTotal;
    }

    private Double calculaPrecoDeVenda6Movimentos(Motor motor, ConfigDTO config, Boolean ipi){

        double precoTotal = 0.0;
        if(config.isPainel6Mov()) {
            precoTotal += getPreco(motor.getInversorSch(), ipi);
            System.out.println("getInversor:" + motor.getInversorSch());
            System.out.println("getInversor:" + "preco" + getPreco(motor.getInversorSch(), ipi));
            precoTotal += getPreco(motor.getDisjuntorInversorSch(), ipi);
            System.out.println("getDisjuntorInversor:" + motor.getDisjuntorInversorSch());
            System.out.println("getDisjuntorInversor:" + "preco" + getPreco(motor.getDisjuntorInversorSch(), ipi));
        }
        return precoTotal;
    }

    public Double calculaPrecoDeVenda(ConfigDTO config) {

        Boolean ipi = false;

        Talha talha = talhaRepository.findById(config.getTalhaSelecionada())
                .orElseThrow(() -> new RuntimeException("?????????Talha não encontrada com o ID: " + config.getTalhaSelecionada()));
        Motor motorElevacao = motorRepository.findByMotorAndTensao(talha.getMotorElevacao(), getTensaoInt(config));
        Motor motorTranslacao = motorRepository.findByMotorAndTensao(talha.getMotorTranslacao(), getTensaoInt(config));
        Motor motor6Mov = motorRepository.findByMotorAndTensao(getMotor6MovPotencia(config), getTensaoInt(config));

        System.out.println("talha:" +config.getTalhaSelecionada());
        System.out.println("motorPotencia:" +talha.getMotorElevacao());
        System.out.println("motorid:" + motorElevacao.getId());
        System.out.println("motorid:" + motorElevacao.getId());
        System.out.println("motorid:" + motorElevacao.getId());
        System.out.println("CodigoPainelTalhaSemOpcional:" + talha.getCodigoPainelTalhaSemOpcional());

        Double precoTotal = 0.0;
        precoTotal += calculaPrecoDeVendaPainelBase(talha, ipi);
        precoTotal += calculaPrecoDeVendaPainelAdicional(talha, ipi);
        precoTotal += calculaPrecoDeVendaDuplaVelocidadeElevacao(motorElevacao, config, ipi);
        precoTotal += calculaPrecoDeVendaDuplaVelocidadeTranslacao(motorTranslacao, config, ipi);
        precoTotal += calculaPrecoDeVenda6Movimentos(motor6Mov, config, ipi);

        return precoTotal;
    }
}
