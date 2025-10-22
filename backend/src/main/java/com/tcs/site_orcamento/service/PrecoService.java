package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.dto.ComponentePrecoDTO;
import com.tcs.site_orcamento.dto.ConfigDTO;
import com.tcs.site_orcamento.dto.PrecoDTO;
import com.tcs.site_orcamento.entity.Motor;
import com.tcs.site_orcamento.entity.Talha;
import com.tcs.site_orcamento.repository.MotorRepository;
import com.tcs.site_orcamento.repository.TalhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

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

    private ComponentePrecoDTO calculaPrecoDeVendaPainelBase(Talha talha, Boolean ipi){

        Set<String> listaForaDoMaxiprod = Set.of(
                "CIRC.ORIGINAL",
                "CIRC.BASE.60X80"
        );
        if(listaForaDoMaxiprod.contains(talha.getCodigoPainelTalhaSemOpcional())){
            return new ComponentePrecoDTO("painelBase fora do max", talha.getCodigoPainelTalhaSemOpcional(), 0.0);
        }
        else {
            return new ComponentePrecoDTO("painelBase", talha.getCodigoPainelTalhaSemOpcional(), getPreco(talha.getCodigoPainelTalhaSemOpcional(), ipi));
        }
    }

    private ComponentePrecoDTO calculaPrecoDeVendaPainelAdicional(Talha talha, ConfigDTO config, Boolean ipi){

        Set<String> listaForaDoMaxiprod = Set.of(
                "CIRC.PTE1"
        );
        if(config.isPainel6Mov()){
            if(listaForaDoMaxiprod.contains(talha.getCodigoPainel6Mov())){
                return new ComponentePrecoDTO("painelAdicional fora do max", talha.getCodigoPainel6Mov(), 0.0);
            }
            if(talha.getCodigoPainel6Mov() != null && !talha.getCodigoPainel6Mov().isEmpty()){
                return new ComponentePrecoDTO("painelAdicional", talha.getCodigoPainel6Mov(), getPreco(talha.getCodigoPainel6Mov(), ipi));
            } else {
                throw new IllegalArgumentException("Sem painel6mov para a talha: " + talha.getModelo());
            }
        } else {
            return null;
        }
    }

    private List<ComponentePrecoDTO> calculaPrecoDeVendaDuplaVelocidadeElevacao(Motor motor, ConfigDTO config, Boolean ipi, TipoMotor tipo ){

        List<ComponentePrecoDTO> dto = new ArrayList<>();

        String contatora;
        String disjuntorContatora;
        String disjuntorInversor;
        String inversor;
        String resistor;

        switch (tipo){
            case TCS:
                contatora = motor.getContatoraTcs();
                if(contatora.isEmpty()){contatora = motor.getContatoraSch();}
                disjuntorContatora = motor.getDisjuntorContatoraTcs();
                if(disjuntorContatora.isEmpty()){disjuntorContatora = motor.getDisjuntorContatoraSch();}
                inversor = motor.getInversorTcs();
                if(inversor.isEmpty()){inversor = motor.getInversorSch();}
                disjuntorInversor = motor.getDisjuntorInversorTcs();
                if(disjuntorInversor.isEmpty()){disjuntorInversor = motor.getDisjuntorInversorSch();}
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

        resistor = motor.getResistorTcs();

        if(!config.isDuplaVelocidadeElevacao()){
            dto.add(new ComponentePrecoDTO("Contatora 2x", contatora, 2 * getPreco(contatora, ipi)));
            dto.add(new ComponentePrecoDTO("Disjuntor Contatora", disjuntorContatora, getPreco(disjuntorContatora, ipi)));

        } else {
            dto.add(new ComponentePrecoDTO("Inversor", inversor, getPreco(inversor, ipi)));
            dto.add(new ComponentePrecoDTO("Disjuntor Inversor", disjuntorInversor, getPreco(disjuntorInversor, ipi)));
            if(motor.getResistorTcs() != null && !motor.getResistorTcs().isEmpty()){
                dto.add(new ComponentePrecoDTO("Resistor", resistor, getPreco(resistor, ipi)));
            }
        }
        return dto;
    }

    private List<ComponentePrecoDTO> calculaPrecoDeVendaDuplaVelocidadeTranslacao(Motor motor, ConfigDTO config, Boolean ipi, TipoMotor tipo){

        List<ComponentePrecoDTO> dto = new ArrayList<>();

        String disjuntorInversor;
        String inversor;
        String resistor;

        if(config.isDuplaVelocidadeTranslacao()) {
            switch(tipo){
                case TCS:
                    disjuntorInversor = motor.getDisjuntorInversorTcs();
                    if(disjuntorInversor.isEmpty()){disjuntorInversor = motor.getDisjuntorInversorSch();}
                    inversor = motor.getInversorTcs();
                    if(inversor.isEmpty()){inversor = motor.getInversorSch();}
                    break;
                case SCH:
                    disjuntorInversor = motor.getDisjuntorInversorSch();
                    inversor = motor.getInversorSch();
                    break;
                    default:
                        throw new IllegalArgumentException("Tipo de painel desconhecido: " + tipo);
            }

            dto.add(new ComponentePrecoDTO("Inversor", inversor, getPreco(inversor, ipi)));
            dto.add(new ComponentePrecoDTO("Disjuntor Inversor", disjuntorInversor, getPreco(disjuntorInversor, ipi)));

            resistor = motor.getResistorTcs();
            if(motor.getResistorTcs() != null && !motor.getResistorTcs().isEmpty()){
                dto.add(new ComponentePrecoDTO("Resistor", resistor, getPreco(resistor, ipi)));
            }
        }
        return dto;
    }

    private List<ComponentePrecoDTO> calculaPrecoDeVenda6Movimentos(Motor motor, ConfigDTO config, Boolean ipi, TipoMotor tipo){

        List<ComponentePrecoDTO> dto = new ArrayList<>();

        String disjuntorInversor;
        String inversor;
        String resistor;

        if(config.isPainel6Mov()) {
            switch(tipo){
                case TCS:
                    disjuntorInversor = motor.getDisjuntorInversorTcs();
                    if(disjuntorInversor.isEmpty()){disjuntorInversor = motor.getDisjuntorInversorSch();}
                    inversor = motor.getInversorTcs();
                    if(inversor.isEmpty()){inversor = motor.getInversorSch();}
                    break;
                case SCH:
                    disjuntorInversor = motor.getDisjuntorInversorSch();
                    inversor = motor.getInversorSch();
                    break;
                default:
                    throw new IllegalArgumentException("Tipo de painel desconhecido: " + tipo);
            }
            dto.add(new ComponentePrecoDTO("Inversor", inversor, getPreco(inversor, ipi)));
            dto.add(new ComponentePrecoDTO("Disjuntor Inversor", disjuntorInversor, getPreco(disjuntorInversor, ipi)));

            resistor = motor.getResistorTcs();
            if(motor.getResistorTcs() != null && !motor.getResistorTcs().isEmpty()){
                dto.add(new ComponentePrecoDTO("Resistor", resistor, getPreco(resistor, ipi)));
            }

        }
        return dto;
    }

    public PrecoDTO calculaPrecoDeVenda(ConfigDTO config, TipoMotor tipoMotor) {

        List<ComponentePrecoDTO> componentes = new ArrayList<>();
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

        componentes.add(calculaPrecoDeVendaPainelBase(talha, ipi));
        componentes.add(calculaPrecoDeVendaPainelAdicional(talha, config, ipi));

        componentes.addAll(calculaPrecoDeVendaDuplaVelocidadeElevacao(motorElevacao, config, ipi, tipoMotor));
        componentes.addAll(calculaPrecoDeVendaDuplaVelocidadeTranslacao(motorTranslacao, config, ipi, tipoMotor));
        componentes.addAll(calculaPrecoDeVenda6Movimentos(motor6Mov, config, ipi, tipoMotor));

        Double precoTotal = 0.0;
        for (ComponentePrecoDTO componente : componentes) {
            if(componente != null){
                precoTotal += componente.getPreco();
                System.out.println(componente);
            }
        }
        return new PrecoDTO(precoTotal, componentes);
    }
}
