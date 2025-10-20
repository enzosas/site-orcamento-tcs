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

    public enum TipoMotor {
        TCS,
        SCH
    }

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

    private Double calculaPrecoDeVendaDuplaVelocidadeElevacao(Motor motor, ConfigDTO config, Boolean ipi, TipoMotor tipo ){

        double precoTotal = 0.0;
        String contatora;
        String disjuntorContatora;
        String disjuntorInversor;
        String inversor;

        switch (tipo){
            case TCS:
                contatora = motor.getContatoraTcs();
                disjuntorContatora = motor.getDisjuntorContatoraTcs();
                inversor = motor.getInversorTcs();
                disjuntorInversor = motor.getDisjuntorInversorTcs();
                break;
            case SCH:
                contatora = motor.getContatoraSch();
                disjuntorContatora = motor.getDisjuntorContatoraSch();
                inversor = motor.getInversorSch();
                disjuntorInversor = motor.getDisjuntorInversorSch();
                break;
                default:
                    throw new IllegalArgumentException("Tipo de painel desconhecido: " + tipo);
        }

        if(!config.isDuplaVelocidadeElevacao()){
            precoTotal += 2 * getPreco(contatora, ipi);
            precoTotal += getPreco(disjuntorContatora, ipi);
        } else {
            precoTotal += getPreco(inversor, ipi);
            precoTotal += getPreco(disjuntorInversor, ipi);
        }

        if(motor.getResistorTcs() != null && !motor.getResistorTcs().isEmpty()){
            precoTotal += getPreco(motor.getResistorTcs(), ipi);
            System.out.println("resistor:" + motor.getResistorTcs());
            System.out.println("resistor:" + "preco" + getPreco(motor.getResistorTcs(), ipi));
        }

        System.out.println("contatora:" + contatora);
        System.out.println("contatora:" + "preco" + 2 * getPreco(contatora, ipi));
        System.out.println("disjuntorContatora:" + disjuntorContatora);
        System.out.println("disjuntorContatora:" + "preco" + getPreco(disjuntorContatora, ipi));
        System.out.println("disjuntorInversor:" + disjuntorInversor);
        System.out.println("disjuntorInversor:" + "preco" + getPreco(disjuntorInversor, ipi));
        System.out.println("inversor:" + inversor);
        System.out.println("inversor:" + "preco" + getPreco(inversor, ipi));


        return precoTotal;
    }

    private Double calculaPrecoDeVendaDuplaVelocidadeTranslacao(Motor motor, ConfigDTO config, Boolean ipi, TipoMotor tipo){

        double precoTotal = 0.0;
        String disjuntorInversor;
        String inversor;

        if(config.isDuplaVelocidadeTranslacao()) {
            switch(tipo){
                case TCS:
                    disjuntorInversor = motor.getDisjuntorInversorTcs();
                    inversor = motor.getInversorTcs();
                    break;
                case SCH:
                    disjuntorInversor = motor.getDisjuntorInversorSch();
                    inversor = motor.getInversorSch();
                    break;
                    default:
                        throw new IllegalArgumentException("Tipo de painel desconhecido: " + tipo);
            }
            precoTotal += getPreco(disjuntorInversor, ipi);
            precoTotal += getPreco(inversor, ipi);

            if(motor.getResistorTcs() != null && !motor.getResistorTcs().isEmpty()){
                precoTotal += getPreco(motor.getResistorTcs(), ipi);
                System.out.println("resistor:" + motor.getResistorTcs());
                System.out.println("resistor:" + "preco" + getPreco(motor.getResistorTcs(), ipi));
            }

            System.out.println("disjuntorInversor:" + disjuntorInversor);
            System.out.println("disjuntorInversor:" + "preco" + getPreco(disjuntorInversor, ipi));
            System.out.println("inversor:" + inversor);
            System.out.println("inversor:" + "preco" + getPreco(inversor, ipi));
        }
        return precoTotal;
    }

    private Double calculaPrecoDeVenda6Movimentos(Motor motor, ConfigDTO config, Boolean ipi, TipoMotor tipo){

        double precoTotal = 0.0;
        String disjuntorInversor;
        String inversor;

        if(config.isPainel6Mov()) {
            switch(tipo){
                case TCS:
                    disjuntorInversor = motor.getDisjuntorInversorTcs();
                    inversor = motor.getInversorTcs();
                    break;
                case SCH:
                    disjuntorInversor = motor.getDisjuntorInversorSch();
                    inversor = motor.getInversorSch();
                    break;
                default:
                    throw new IllegalArgumentException("Tipo de painel desconhecido: " + tipo);
            }
            precoTotal += getPreco(disjuntorInversor, ipi);
            precoTotal += getPreco(inversor, ipi);

            if(motor.getResistorTcs() != null && !motor.getResistorTcs().isEmpty()){
                precoTotal += getPreco(motor.getResistorTcs(), ipi);
                System.out.println("resistor:" + motor.getResistorTcs());
                System.out.println("resistor:" + "preco" + getPreco(motor.getResistorTcs(), ipi));
            }

            System.out.println("disjuntorInversor:" + disjuntorInversor);
            System.out.println("disjuntorInversor:" + "preco" + getPreco(disjuntorInversor, ipi));
            System.out.println("inversor:" + inversor);
            System.out.println("inversor:" + "preco" + getPreco(inversor, ipi));

        }
        return precoTotal;
    }

    public Double calculaPrecoDeVenda(ConfigDTO config, TipoMotor tipoMotor) {

        System.out.println(config);

        Boolean ipi = false;

        Talha talha = talhaRepository.findById(config.getTalhaSelecionada())
                .orElseThrow(() -> new RuntimeException("Talha não encontrada com o ID: " + config.getTalhaSelecionada()));
        Motor motorElevacao = motorRepository.findByMotorAndTensao(talha.getMotorElevacao(), getTensaoInt(config));
        Motor motorTranslacao = motorRepository.findByMotorAndTensao(talha.getMotorTranslacao(), getTensaoInt(config));
        Motor motor6Mov = null;
        if(config.isPainel6Mov()){
        motor6Mov = motorRepository.findByMotorAndTensao(config.getPotenciaMotores(), getTensaoInt(config));
        }

        System.out.println("talha:" +config.getTalhaSelecionada());
        System.out.println("motorPotencia:" +talha.getMotorElevacao());
        System.out.println("motorid:" + motorElevacao.getId());
        System.out.println("CodigoPainelTalhaSemOpcional:" + talha.getCodigoPainelTalhaSemOpcional());

        Double precoTotal = 0.0;
        precoTotal += calculaPrecoDeVendaPainelBase(talha, ipi);
        precoTotal += calculaPrecoDeVendaPainelAdicional(talha, ipi);
        precoTotal += calculaPrecoDeVendaDuplaVelocidadeElevacao(motorElevacao, config, ipi, tipoMotor);
        precoTotal += calculaPrecoDeVendaDuplaVelocidadeTranslacao(motorTranslacao, config, ipi, tipoMotor);
        precoTotal += calculaPrecoDeVenda6Movimentos(motor6Mov, config, ipi, tipoMotor);

        return precoTotal;
    }
}
