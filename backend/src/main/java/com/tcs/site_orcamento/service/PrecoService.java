package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.dto.ComponentePrecoDTO;
import com.tcs.site_orcamento.dto.ConfigDTO;
import com.tcs.site_orcamento.dto.OrcamentoCompletoDTO;
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

    public Boolean ipi = false;

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

    public ComponentePrecoDTO calculaPrecoDeVendaTalhaSemCircuito(Talha talha, Boolean ipi){
        return new ComponentePrecoDTO("Talha sem Circuito", talha.getModelo(), getPreco(talha.getModelo(), ipi));
    }

    private ComponentePrecoDTO calculaPrecoDeVendaPainelBase(Talha talha, Boolean ipi){

        Set<String> listaForaDoMaxiprod = Set.of(
                "CIRC.BASE.60X80"
        );
        if(Objects.equals(talha.getCodigoPainelTalhaSemOpcional(), "CIRC.ORIGINAL")){
            return new ComponentePrecoDTO("Painel Base Original", talha.getCodigoPainelTalhaSemOpcional(), 0.0);
        }
        if(listaForaDoMaxiprod.contains(talha.getCodigoPainelTalhaSemOpcional())){
            return new ComponentePrecoDTO("Painel Base fora do max", talha.getCodigoPainelTalhaSemOpcional(), 0.0);
        }
        else {
            return new ComponentePrecoDTO("Painel Base", talha.getCodigoPainelTalhaSemOpcional(), getPreco(talha.getCodigoPainelTalhaSemOpcional(), ipi));
        }
    }

    private ComponentePrecoDTO calculaPrecoDeVendaPainelAdicional(Talha talha, ConfigDTO config, Boolean ipi){

        Set<String> listaForaDoMaxiprod = Set.of(
                "CIRC.PTE1"
        );
        if(config.isPainel6Mov()){
            if(talha.getCodigoPainelTalhaSemOpcional().equals("CIRC.BASE.60X80")){
                return new ComponentePrecoDTO("Painel Adicional incluso CIRC.BASE.60X80", talha.getCodigoPainel6Mov(), 0.0);
            }
            if(listaForaDoMaxiprod.contains(talha.getCodigoPainel6Mov())){
                return new ComponentePrecoDTO("Painel Adicional fora do max", talha.getCodigoPainel6Mov(), 0.0);
            }
            if(talha.getCodigoPainel6Mov() != null && !talha.getCodigoPainel6Mov().isEmpty()){
                return new ComponentePrecoDTO("Painel Adicional", talha.getCodigoPainel6Mov(), getPreco(talha.getCodigoPainel6Mov(), ipi));
            } else {
                throw new IllegalArgumentException("Sem painel6mov para a talha: " + talha.getModelo());
            }
        } else {
            return null;
        }
    }

    private List<ComponentePrecoDTO> calculaPrecoDeVendaDuplaVelocidadeElevacao(Talha talha, Motor motor, ConfigDTO config, Boolean ipi, TipoMotor tipo ){

        List<ComponentePrecoDTO> dto = new ArrayList<>();

        String contatora;
        String disjuntorContatora;
        String disjuntorInversor;
        String inversor;
        String resistor;

        if(!Objects.equals(talha.getCodigoPainelTalhaSemOpcional(), "CIRC.ORIGINAL")){

            switch (tipo){
                case TCS:
                    contatora = motor.getContatoraTcs();
                    if(contatora == null || contatora.isEmpty()){
                        contatora = motor.getContatoraSch();
                    }

                    disjuntorContatora = motor.getDisjuntorContatoraTcs();
                    if(disjuntorContatora == null || disjuntorContatora.isEmpty()){
                        disjuntorContatora = motor.getDisjuntorContatoraSch();
                    }

                    inversor = motor.getInversorTcs();
                    if(inversor == null || inversor.isEmpty()){
                        inversor = motor.getInversorSch();
                    }

                    disjuntorInversor = motor.getDisjuntorInversorTcs();
                    if(disjuntorInversor == null || disjuntorInversor.isEmpty()){
                        disjuntorInversor = motor.getDisjuntorInversorSch();
                    }
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

    private String getCodigoControle(String controle){
        switch(controle){
            case "BCI 404":
                return "CR.BCI404";
            case "BCI 808":
                return "CR.BCI808";
            default:
                throw new IllegalArgumentException("Tipo de controle desconhecido: " + controle);
        }
    }

    private ComponentePrecoDTO calculaPrecoDeVendaControle(ConfigDTO config, Boolean ipi){

        if(config.isControleRemoto()) {
            String controleRemoto = getCodigoControle(config.getModeloControle());
            return new ComponentePrecoDTO("Controle Remoto", controleRemoto, getPreco(controleRemoto, ipi));
        }
        return null;
    }

    private List<ComponentePrecoDTO> calculaPrecoDeVendaSinalizadores(ConfigDTO config, Boolean ipi, TipoMotor tipo){

        List<ComponentePrecoDTO> dto = new ArrayList<>();

        String sinalizador;
        String sirene;
        if(config.isIncluirSinalizadores()) {
            switch(tipo){
                case TCS:
                    sinalizador = "SIN.LUM.TCS";
                    break;
                case SCH:
                    sinalizador = "SIN.LUM.10W.24V";
                    break;
                default:
                    throw new IllegalArgumentException("Tipo de painel desconhecido: " + tipo);
            }
            sirene = "SIR.DP250.24V";
            dto.add(new ComponentePrecoDTO("Sinalizador", sinalizador, getPreco(sinalizador, ipi)));
            dto.add(new ComponentePrecoDTO("Sirene", sirene, getPreco(sirene, ipi)));
        }
        return dto;
    }

    private ComponentePrecoDTO calculaPrecoDeVendaFimDeCurso(ConfigDTO config, Boolean ipi, TipoMotor tipo){

        String fimDeCurso;
        if(config.isFimCursoEsquerdaDireita()) {
            switch(tipo){
                case TCS:
                    fimDeCurso = "FCR006.TCS";
                    break;
                case SCH:
                    fimDeCurso = "FCR006";
                    break;
                default:
                    throw new IllegalArgumentException("Tipo de painel desconhecido: " + tipo);
            }
            return new ComponentePrecoDTO("Fim De Curso EsqDir", fimDeCurso, getPreco(fimDeCurso, ipi));
        }
        return null;
    }

    public ComponentePrecoDTO calculaPrecoDeVendaAdaptadorViga(ConfigDTO config, Boolean ipi){

        String adaptadorViga = "AC0912-400";
        if(config.isAdaptadorViga()) {
            return new ComponentePrecoDTO("Adaptador Viga", adaptadorViga, getPreco(adaptadorViga, ipi));
        }
        return null;
    }

    public PrecoDTO calculaPrecoDeVenda(ConfigDTO config, TipoMotor tipoMotor) {

        ComponentePrecoDTO talhaSemCircuito;
        List<ComponentePrecoDTO> componentesCircuito = new ArrayList<>();
        List<ComponentePrecoDTO> componentesTalha = new ArrayList<>();

        System.out.println(config);

        Talha talha = talhaRepository.findById(config.getTalhaSelecionada())
                .orElseThrow(() -> new RuntimeException("Talha não encontrada com o ID: " + config.getTalhaSelecionada()));
        Motor motorElevacao = motorRepository.findByMotorAndTensao(talha.getMotorElevacao(), getTensaoInt(config));
        Motor motorTranslacao = motorRepository.findByMotorAndTensao(talha.getMotorTranslacao(), getTensaoInt(config));
        Motor motor6Mov = null;
        if(config.isPainel6Mov()){
        motor6Mov = motorRepository.findByMotorAndTensao(config.getPotenciaMotores(), getTensaoInt(config));
        }

        talhaSemCircuito = calculaPrecoDeVendaTalhaSemCircuito(talha, ipi);

        componentesCircuito.add(calculaPrecoDeVendaPainelBase(talha, ipi));
        componentesCircuito.add(calculaPrecoDeVendaPainelAdicional(talha, config, ipi));
        componentesCircuito.addAll(calculaPrecoDeVendaDuplaVelocidadeElevacao(talha, motorElevacao, config, ipi, tipoMotor));
        componentesCircuito.addAll(calculaPrecoDeVendaDuplaVelocidadeTranslacao(motorTranslacao, config, ipi, tipoMotor));
        componentesCircuito.addAll(calculaPrecoDeVenda6Movimentos(motor6Mov, config, ipi, tipoMotor));
        componentesCircuito.add(calculaPrecoDeVendaControle(config, ipi));
        componentesCircuito.addAll(calculaPrecoDeVendaSinalizadores(config, ipi, tipoMotor));
        componentesCircuito.add(calculaPrecoDeVendaFimDeCurso(config, ipi, tipoMotor));
        componentesCircuito.add(calculaPrecoDeVendaAdaptadorViga(config, ipi));

        componentesTalha.add(talhaSemCircuito);
        componentesTalha.addAll(componentesCircuito);

        Double precoTotal = 0.0;
        System.out.println("Talha:");
        for (ComponentePrecoDTO componente : componentesTalha) {
            if(componente != null){
                precoTotal += componente.getPreco();
                System.out.println(tipoMotor + " " + componente);
            }
        }
        Double precoCircuito = precoTotal - talhaSemCircuito.getPreco();

        return new PrecoDTO(precoTotal, precoCircuito, componentesCircuito);
    }

    public OrcamentoCompletoDTO calculaOrcamentoCompleto(ConfigDTO config) {

        Talha talha = talhaRepository.findById(config.getTalhaSelecionada())
                .orElseThrow(() -> new RuntimeException("Talha não encontrada com o ID: " + config.getTalhaSelecionada()));

        PrecoDTO dtoSch = this.calculaPrecoDeVenda(config, TipoMotor.SCH);
        PrecoDTO dtoTcs = this.calculaPrecoDeVenda(config, TipoMotor.TCS);

        ComponentePrecoDTO compTalha = this.calculaPrecoDeVendaTalhaSemCircuito(talha, ipi);
        ComponentePrecoDTO compAdaptador = this.calculaPrecoDeVendaAdaptadorViga(config, ipi);

        return new OrcamentoCompletoDTO(
                dtoSch.getPrecoTotal(),
                dtoTcs.getPrecoTotal(),
                dtoSch.getPrecoCircuito(),
                dtoTcs.getPrecoCircuito(),
                (compTalha != null) ? compTalha.getPreco() : 0.0,
                (compAdaptador != null) ? compAdaptador.getPreco() : 0.0
        );
    }
}
