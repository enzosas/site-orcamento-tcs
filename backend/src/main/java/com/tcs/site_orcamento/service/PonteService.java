package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.dto.OrcamentoPonteDTO;
import com.tcs.site_orcamento.dto.PonteConfigDTO;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.slf4j.Slf4j;

import com.tcs.site_orcamento.entity.Cabeceira;
import com.tcs.site_orcamento.entity.MatrizCabeceira;
import com.tcs.site_orcamento.repository.CabeceiraRepository;
import com.tcs.site_orcamento.repository.MatrizCabeceiraRepository;
import com.tcs.site_orcamento.repository.MatrizVigaSimplesRepository;
import com.tcs.site_orcamento.repository.VigaWRepository;

@Service
@Slf4j
public class PonteService {

    @Autowired
    MaxiprodService maxiprodService;

    @Autowired
    private MatrizCabeceiraRepository matrizCabeceiraRepository;

    @Autowired
    private CabeceiraRepository cabeceiraRepository;

    @Autowired
    private MatrizVigaSimplesRepository vigaSimplesRepository;

    @Autowired
    VigaWRepository vRepository;

    static Double precoTrilhoPorQuilo = 13.0;
    static Double valorKgAco = 7.0;
    static Double vigaWRsKg = 10.0;

    public static Double calculaCargaMaximaPorRoda(
            Double capacidadePonte, Double comprimentoPonte, Double pesoMetroLinear, Double pesoVigaPonte,
            Double pesoCabeceiraUtilizada) {
        if (pesoMetroLinear == 0) {
            return 0.0;
        }

        Double metadePVP = pesoVigaPonte / 2;
        Double fatorSeguranca = 1.15;
        Double parenteses = (capacidadePonte * (comprimentoPonte - 1000) / comprimentoPonte
                + (20 * comprimentoPonte / 1000 / 2)) * fatorSeguranca / 2;

        return metadePVP + pesoCabeceiraUtilizada + parenteses;
    }

    public static Double calculaPesoTotalPonteComTalha(
            Double comprimentoPonte, Double pesoMetroLinear, Double pesoVigaPonte, Double pesoCabeceiraUtilizada,
            Double pesoTalha) {
        if (pesoMetroLinear == 0) {
            return 0.0;
        }

        Double soma = pesoCabeceiraUtilizada * 2 + 10 * comprimentoPonte / 1000 + pesoTalha;

        return pesoVigaPonte + soma;
    }

    public static Double calculaValorVigaPonte(Double pesoVigaPonte, Double valorKgAco) {
        return pesoVigaPonte * valorKgAco / 0.4;
    }

    public Double calculaValorParCabeceiras(Cabeceira cabeceira) {
        return maxiprodService.getPrecoDeVenda(cabeceira.getModelo());
    }

    public static Double getPesoTrilho(String tipoTrilho) {
        if (tipoTrilho == null) {
            return 0.0;
        }
        return switch (tipoTrilho) {
            case "QD.32 mm" -> 8.04;
            case "QD.38 mm" -> 11.51;
            case "QD.44 mm" -> 15.2;
            case "QD.51 mm" -> 20.42;
            case "TR-25" -> 25.0;
            case "TR-32" -> 32.0;
            case "TR-37" -> 37.0;
            case "ASCE 25" -> 12.0;
            default -> 0.0;
        };
    }

    public static Double getPesoColunaPorMetro(String tipoColuna) {
        if (tipoColuna == null) {
            return 0.0;
        }

        return switch (tipoColuna) {
            case "100 x 100 x 4,75" -> 14.915;
            case "100 x 100 x 6,35" -> 19.939;
            case "127 x 127 x 4,75" -> 18.94205;
            case "127 x 127 x 6,35" -> 25.32253;
            case "150 x 150 x 4,75" -> 22.3725;
            case "150 x 150 x 6,35" -> 29.9085;
            case "175 x 175 x 6,35" -> 34.89325;
            case "200 x 200 x 6,35" -> 39.878;
            case "250 x 250 x 6,35" -> 48.58;
            case "300 x 300 x 6,35" -> 58.55;
            case "300 x 300 x 8,00" -> 73.35;
            default -> 0.0;
        };
    }

    public static Double getPesoFlangeColuna(String tipoColuna) {
        if (tipoColuna == null) {
            return 0.0;
        }

        return switch (tipoColuna) {
            case "100 x 100 x 4,75", "100 x 100 x 6,35" -> 12.265625;
            case "127 x 127 x 4,75", "127 x 127 x 6,35" -> 17.6625;
            case "150 x 150 x 4,75", "150 x 150 x 6,35" -> 24.040625;
            case "175 x 175 x 6,35" -> 34.221094;
            case "200 x 200 x 6,35" -> 47.728;
            case "250 x 250 x 6,35" -> 48.0;
            case "300 x 300 x 6,35" -> 58.0;
            case "300 x 300 x 8,00" -> 73.0;
            default -> 0.0;
        };
    }

    public static Double calculaPesoVigaPonte(Double comprimentoPonte, Double pesoMetroLinear) {
        return comprimentoPonte * pesoMetroLinear / 1000;
    }

    public static Double calculaPesoCaminhoRolamento(
            Double comprimentoA,
            Double comprimentoB,
            Double vigaKgMA,
            Double vigaKgMB,
            Double trilhoKgMA,
            Double trilhoKgMB,
            Boolean comViga) {
        Double pesoTrilhoA = comprimentoA * trilhoKgMA;
        Double pesoTrilhoB = comprimentoB * trilhoKgMB;
        Double pesoVigaA = 0.0;
        Double pesoVigaB = 0.0;
        if (comViga) {
            pesoVigaA = comprimentoA * vigaKgMA;
            pesoVigaB = comprimentoB * vigaKgMB;
        }
        return pesoTrilhoA + pesoTrilhoB + pesoVigaA + pesoVigaB;
    }

    public static Double calculaValorVigaCR(Double comprimento, Double vigaKgM, Double vigaRsKg) {
        return comprimento * vigaKgM * vigaRsKg / 0.5;
    }

    public static Double calculaValorTrilhoCR(Double comprimento, Double trilhoKgM, Double trilhoRsKg) {
        return comprimento * trilhoKgM * trilhoRsKg;
    }

    public static Double calculaEletrificacaoTransversal(String tipo, Double precoCoisa1, Double precoCoisa2, Double vaoMm) {
        return switch (tipo) {
            case "Cabo Chato" -> precoCoisa1 * vaoMm / 1000;
            case "Esteira porta cabo" -> precoCoisa2 * vaoMm / 1000;
            default -> 0.0;
        };
    }

    public static Double calculaValorEletrificacaoLongitudinal(Double comprimento, Double precoCoisa1,
            Double precoCoisa2, String tipo) {
        Integer numeroCarroColetor = switch (tipo) {
            case "Barramento Blindado - 1 consumidor" -> 1;
            case "Barramento Blindado - 2 consumidores" -> 2;
            case "Barramento Blindado - 3 consumidores" -> 3;
            case "Barramento Blindado - 4 consumidores" -> 4;
            case "Somente o Carro coletor" -> 1;
            default -> 0;
        };
        Integer outraCoisa = switch (tipo) {
            case "Barramento Blindado - 1 consumidor",
                    "Barramento Blindado - 2 consumidores",
                    "Barramento Blindado - 3 consumidores",
                    "Barramento Blindado - 4 consumidores" ->
                1;
            default -> 0;
        };
        return precoCoisa1 * outraCoisa * comprimento + precoCoisa2 * numeroCarroColetor + 30 * comprimento;
    }

    public static Double calculaPesoColunas(Boolean isPonteRolante, Double altura, String tipoColuna) {
        Double pesoColunaMetro = getPesoColunaPorMetro(tipoColuna);
        Double flange = getPesoFlangeColuna(tipoColuna);
        if (isPonteRolante) {
            return pesoColunaMetro * altura + flange * 2;
        } else { // is portico rolante
            return pesoColunaMetro * (altura + 1) + flange * 2;
        }
    }

    public static Double calculaValorKgColunas() {
        return valorKgAco*2.5;
    }

    public static Double calculaPrecoColunas(Double q1, Double q2, Double p1, Double p2, Double rsKg1, Double rsKg2, Boolean doisLados) {
        if (!doisLados) q2 = 0.0;
        return q1 * p1 * rsKg1 + q2 * p2 * rsKg2;
    }

    public static Double calculaPesoColunasTotal(Double q1, Double q2, Integer p1, Integer p2, Boolean doisLados) {
        if (!doisLados) q2 = 0.0;
        return q1 * p1 + q2 * p2;
    }

    public Double calculaAntiColisao(Double comprimentoPonteMm) {
        Double coisa1 = maxiprodService.getPrecoDeVenda("BC0445");
        Double coisa2 = maxiprodService.getPrecoDeVenda("CAB.CHA.06X15");
        coisa1 = coisa1 * 2;
        coisa2 = coisa2 * ((comprimentoPonteMm/1000)+5);
        return coisa1 + coisa2;
    }

    private static final double[] CAPACIDADES_MONTAGEM = {250, 500, 1000, 1500, 2000, 3000, 5000, 6000, 6300, 8000, 10000, 12000, 12500, 15000, 20000, 25000, 30000, 35000};
    private static final double[] VAOS_MONTAGEM = {4999, 6999, 8999, 10999, 12999, 14999, 16999, 18999, 20999, 22999, 25000};

    private static final double[][] VALORES_MONTAGEM = {
        {12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00},
        {12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00},
        {13000.00,13000.00,13000.00,13000.00,13000.00,13000.00,13000.00,13000.00,13000.00,13000.00,13000.00},
        {13000.00,13000.00,13000.00,13000.00,13000.00,13000.00,13000.00,13000.00,13000.00,13000.00,13000.00},
        {12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00,12000.00},
        {12000.00,12000.00,12000.00,12000.00,13000.00,13000.00,13000.00,13000.00,13000.00,15000.00,15000.00},
        {12000.00,12000.00,12000.00,12000.00,13000.00,13000.00,13000.00,13000.00,13000.00,15000.00,15000.00},
        {12000.00,12000.00,12000.00,12000.00,13000.00,13000.00,13000.00,13000.00,13000.00,15000.00,15000.00},
        {13000.00,13000.00,13000.00,13000.00,15000.00,15000.00,15000.00,15000.00,15000.00,15000.00,15000.00},
        {13000.00,13000.00,13000.00,13000.00,15000.00,15000.00,15000.00,15000.00,15000.00,15000.00,15000.00},
        {13000.00,13000.00,13000.00,13000.00,15000.00,15000.00,15000.00,15000.00,15000.00,15000.00,15000.00},
        {13000.00,13000.00,13000.00,13000.00,15000.00,15000.00,15000.00,15000.00,15000.00,15000.00,15000.00},
        {13000.00,13000.00,13000.00,13000.00,15000.00,15000.00,15000.00,15000.00,15000.00,15000.00,15000.00},
        {15000.00,15000.00,15000.00,15000.00,20000.00,20000.00,20000.00,20000.00,20000.00,20000.00,20000.00},
        {15000.00,15000.00,15000.00,15000.00,20000.00,20000.00,20000.00,20000.00,20000.00,20000.00,20000.00},
        {15000.00,15000.00,15000.00,15000.00,20000.00,20000.00,20000.00,20000.00,20000.00,20000.00,20000.00},
        {15000.00,15000.00,15000.00,15000.00,20000.00,20000.00,20000.00,20000.00,20000.00,20000.00,20000.00},
        {15000.00,15000.00,15000.00,15000.00,20000.00,20000.00,20000.00,20000.00,20000.00,20000.00,20000.00}
    };

    public static Double consultaMontagem(Double capacidade, Double vao) {
        int iCap = -1;
        for (int i = 0; i < CAPACIDADES_MONTAGEM.length; i++) {
            if (CAPACIDADES_MONTAGEM[i] >= capacidade) {
                iCap = i;
                break;
            }
        }
        int iVao = -1;
        for (int j = 0; j < VAOS_MONTAGEM.length; j++) {
            if (VAOS_MONTAGEM[j] >= vao) {
                iVao = j;
                break;
            }
        }
        if (iCap != -1 && iVao != -1) {
            return VALORES_MONTAGEM[iCap][iVao];
        }
        return 0.0;
    }

    public Cabeceira getCabeceira(Integer capacidadeKg, Integer vaoMaximoMm) {
        MatrizCabeceira mc = matrizCabeceiraRepository.findByCapacidadeAndVao(capacidadeKg, vaoMaximoMm);
        if (mc == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "entrada na matriz de cabeceira nao encontrada para a capacidade e vao informados");
        }
        Cabeceira c = cabeceiraRepository.findByCodigo(mc.getModelo());
        if (c == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "cabeceira nao encontrada para o modelo: " + mc.getModelo());
        }
        return c;
    }

    public OrcamentoPonteDTO geraOrcamentoPonte(PonteConfigDTO config, Double pesoTalha) {

        List<String> logs = new ArrayList<>();
        log.info("\n- - - NOVA REQUISICAO DE ORCAMENTO DE PONTE - - -");
        
        Double precoTotal = 0.0;
        Double pesoCaminhoRolamento = 0.0;
        Double pesoColunasTotal = 0.0;
        Double valorCaminhoRolamento = 0.0;
        Double precoColunasApoio = 0.0;
        
        OrcamentoPonteDTO orcamento = new OrcamentoPonteDTO();
        Cabeceira cabeceira = getCabeceira(config.getDadosBasicos_capacidade(), config.getDadosBasicos_vaoLivre());
        String trilhoCR = config.getCaminhoRolamento_bitolaTrilho();
        Integer capacidadePonteInt = config.getDadosBasicos_capacidade();
        Integer comprimentoPonteInt = config.getDadosBasicos_vaoLivre();
        Double capacidadePonte = config.getDadosBasicos_capacidade().doubleValue();
        Double comprimentoPonte = config.getDadosBasicos_vaoLivre().doubleValue();
        Double pesoMetroLinear = vigaSimplesRepository.findByCapacidadeAndVao(capacidadePonteInt, comprimentoPonteInt).getPesoMetroLinear();
        Double pesoVigaPonte = calculaPesoVigaPonte(comprimentoPonte, pesoMetroLinear);
        Double pesoCabeceira = cabeceira.getPesoCabeceiraIndividual().doubleValue();
        Double cargaMaximaRoda = calculaCargaMaximaPorRoda(capacidadePonte, comprimentoPonte, pesoMetroLinear, pesoVigaPonte, pesoCabeceira);
        Double comprimento2 = config.getDadosBasicos_comprimento().doubleValue();
        

        logs.add(String.format(
            "Cabeceira para capacidade %dkg e vao livre %dmm: %s", 
            config.getDadosBasicos_capacidade(), 
            config.getDadosBasicos_vaoLivre(), 
            cabeceira.getModelo()
        ));
        logs.add(String.format("Peso por metro linear da viga simples obtido: %.2f", pesoMetroLinear));
        logs.add(String.format(
            "Calculo peso da viga da ponte: comprimento=%.2f | pesoMetroLinear=%.2f | resultado=%.2f", 
            comprimentoPonte,
            pesoMetroLinear,
            pesoVigaPonte
        ));
        logs.add(String.format(
            "Calculo carga maxima roda: capacidadePonte=%.2f | comprimentoPonte=%.2f | pesoMetroLinear=%.2f | pesoVigaPonte=%.2f | pesoCabeceira=%.2f | resultado=%.2f", 
            capacidadePonte,
            comprimentoPonte,
            pesoMetroLinear,
            pesoVigaPonte,
            pesoCabeceira,
            cargaMaximaRoda
        ));


        if (config.getDadosBasicos_isCaminhoRolamento()) {
            Double pesoTrilhoA = getPesoTrilho(trilhoCR);
            Double pesoTrilhoB = getPesoTrilho(trilhoCR);
            Double valorCaminhoRolamentoTrilhoA = calculaValorTrilhoCR(comprimento2, pesoTrilhoA, precoTrilhoPorQuilo);
            Double valorCaminhoRolamentoTrilhoB = calculaValorTrilhoCR(comprimento2, pesoTrilhoB, precoTrilhoPorQuilo);
            Double vigaAKgM = 0.0;
            Double vigaBKgM = 0.0;
            Double valorCaminhoRolamentoVigaA = 0.0;
            Double valorCaminhoRolamentoVigaB = 0.0;


            logs.add(String.format("Peso do trilho %s: %.2f", trilhoCR, pesoTrilhoA));
            logs.add(String.format(
                "Calculo preco trilho caminho rolamento: comprimento=%.2f | pesoTrilho=%.2f | precoKgTrilho=%.2f | resultado=%.2f", 
                comprimento2,
                pesoTrilhoA,
                precoTrilhoPorQuilo,
                valorCaminhoRolamentoTrilhoA
            ));


            Boolean comViga = "Viga Metálica + Trilho".equals(config.getCaminhoRolamento_tipo());
            if (comViga) {
                Boolean perfilMetalicoVazio = config.getCaminhoRolamento_ladoA_perfilMetalico().isEmpty() || config.getCaminhoRolamento_ladoB_perfilMetalico().isEmpty();
                if (!perfilMetalicoVazio) {
                    String vigaA = config.getCaminhoRolamento_ladoA_perfilMetalico();
                    String vigaB = config.getCaminhoRolamento_ladoB_perfilMetalico();
                    vigaAKgM = vRepository.findByCodigo(vigaA).getMassaLinear();
                    vigaBKgM = vRepository.findByCodigo(vigaB).getMassaLinear();
                    valorCaminhoRolamentoVigaA = calculaValorVigaCR(comprimento2, vigaAKgM, vigaWRsKg); 
                    valorCaminhoRolamentoVigaB = calculaValorVigaCR(comprimento2, vigaBKgM, vigaWRsKg); 
                    
                    logs.add(String.format(
                        "Calculo preco viga A caminho rolamento: comprimento=%.2f | vigaA=%s | vigaAKgM=%.2f | vigaWRsKg=%.2f | resultado=%.2f", 
                        comprimento2,
                        vigaA,
                        vigaAKgM,
                        vigaWRsKg,
                        valorCaminhoRolamentoVigaA
                    ));
                    logs.add(String.format(
                        "Calculo preco viga B caminho rolamento: comprimento=%.2f | vigaB=%s | vigaBKgM=%.2f | vigaWRsKg=%.2f | resultado=%.2f", 
                        comprimento2,
                        vigaB,
                        vigaBKgM,
                        vigaWRsKg,
                        valorCaminhoRolamentoVigaA
                    ));
                }
            }
            pesoCaminhoRolamento = calculaPesoCaminhoRolamento(comprimento2, comprimento2, vigaAKgM, vigaBKgM, pesoTrilhoA, pesoTrilhoB, comViga);
            valorCaminhoRolamento = valorCaminhoRolamentoVigaA + valorCaminhoRolamentoVigaB + valorCaminhoRolamentoTrilhoA + valorCaminhoRolamentoTrilhoB;
            
            logs.add(String.format(
                "Calculo peso caminho rolamento: comprimento=%.2f | vigaAKgM=%.2f | vigaBKgM=%.2f | pesoTrilhoA=%.2f | pesoTrilhoB=%.2f | resultado=%.2f", 
                comprimento2,
                vigaAKgM,
                vigaBKgM,
                pesoTrilhoA,
                pesoTrilhoB,
                pesoCaminhoRolamento
            ));
            logs.add(String.format(
                "Calculo preco caminho rolamento: valorCaminhoRolamentoVigaA=%.2f | valorCaminhoRolamentoVigaB=%.2f | valorCaminhoRolamentoTrilhoA=%.2f | valorCaminhoRolamentoTrilhoB=%.2f | resultado=%.2f", 
                valorCaminhoRolamentoVigaA,
                valorCaminhoRolamentoVigaB,
                valorCaminhoRolamentoTrilhoA,
                valorCaminhoRolamentoTrilhoB,
                valorCaminhoRolamento
            ));
        }

        Double pesoEletTransversal = 10*comprimentoPonte/1000;
        logs.add(String.format(
            "Calculo peso eletrificacao transversal: comprimentoPonte=%.2f | 10*comprimentoPonte/1000 | resultado=%.2f", 
            comprimentoPonte,
            pesoEletTransversal
        ));
        Double pesoEletLongitudinal = 8*comprimentoPonte/1000;
        logs.add(String.format(
            "Calculo peso eletrificacao longitudinal: comprimentoPonte=%.2f | 8*comprimentoPonte/1000 | resultado=%.2f", 
            comprimentoPonte,
            pesoEletLongitudinal
        ));
        Double pesoParCabeceira = 2*pesoCabeceira;
        logs.add(String.format(
            "Calculo peso par cabeceira: pesoCabeceira=%.2f | 2*pesoCabeceira | resultado=%.2f", 
            pesoCabeceira,
            pesoParCabeceira
        ));
        
        Boolean isPonteRolante = config.getDadosBasicos_isPonte();
        Double alturaA = config.getColunasSustentacao_ladoA_altura().doubleValue();
        Double alturaB = config.getColunasSustentacao_ladoB_altura().doubleValue();
        String dimensoesA = config.getColunasSustentacao_ladoA_dimensoes();
        String dimensoesB = config.getColunasSustentacao_ladoB_dimensoes();
        Double pesoTotalColunaKgA = calculaPesoColunas(isPonteRolante, alturaA, dimensoesA);
        logs.add(String.format(
            "Calculo peso coluna: se for ponte rolante: pesoColunaMetro * altura + flange * 2"
        ));
        logs.add(String.format(
            "Calculo peso coluna: se for portico rolante: pesoColunaMetro * (altura + 1) + flange * 2;"
        ));
        logs.add(String.format(
            "Calculo peso coluna A: alturaA=%.2f | dimensoesA=%s | resultado=%.2f", 
            alturaA,
            dimensoesA,
            pesoTotalColunaKgA
        ));
        Double pesoTotalColunaKgB = calculaPesoColunas(isPonteRolante, alturaB, dimensoesB);
        logs.add(String.format(
            "Calculo peso coluna B: alturaA=%.2f | dimensoesB=%s | resultado=%.2f", 
            alturaB,
            dimensoesB,
            pesoTotalColunaKgB
        ));
        Integer qA = config.getColunasSustentacao_ladoA_numeroColunas();
        Integer qB = config.getColunasSustentacao_ladoB_numeroColunas();

        Double valorVigaPonte = calculaValorVigaPonte(pesoVigaPonte, valorKgAco);
        logs.add(String.format(
            "Calculo valor viga ponte: pesoVigaPonte=%.2f | valorKgAco=%.2f | pesoVigaPonte * valorKgAco / 0.4 | resultado=%.2f", 
            pesoVigaPonte,
            valorKgAco,
            valorVigaPonte
        ));
        // Double valorParCabeceiras = calculaValorParCabeceiras(cabeceira);
        Double valorParCabeceiras = 27900.0;
        logs.add(String.format(
            "preco par cabeceiras provisorio=%.2f", 
            valorParCabeceiras
        ));
        Double valorMontagem = consultaMontagem(capacidadePonte, comprimentoPonte);
        logs.add(String.format(
            "valor montagem consultado=%.2f", 
            valorMontagem
        ));

        String tipoET = config.getDadosBasicos_eletrificacaoTransversal();
        Double valorEletTransversal = calculaEletrificacaoTransversal(tipoET, 215.00, 232.70, comprimentoPonte);
        logs.add(String.format(
            "Calculo eletrificacao transversal: BC1002=%.2f | BC1016=%.2f | vaoMm=%.2f | codigo * vaoMm / 1000 | resultado=%.2f", 
            215.00,
            232.70,
            comprimentoPonte,
            valorEletTransversal
        ));

        String tipoEL = config.getDadosBasicos_eletrificacaoLongitudinal();
        Double precoCoisa2 = maxiprodService.getPrecoDeVenda("CAR.COL.40A");
        Double valorEletLongitudinal = calculaValorEletrificacaoLongitudinal(comprimento2, 232.70, precoCoisa2, tipoEL);
        logs.add(String.format(
            "Calculo eletrificacao longitudinal: BC1015=%.2f | CAR.COL.40A=%.2f | comprimento=%.2f | resultado=%.2f", 
            215.00,
            232.70,
            comprimento2,
            valorEletLongitudinal
        ));

        Double qADouble = qA.doubleValue();
        Double qBDouble = qB.doubleValue();
        Double colunaRsKg = calculaValorKgColunas();
        logs.add(String.format(
            "valor coluna R$/kg: valorKgAco*2.5 | valorKgAco=%.2f | resultado=%.2f", 
            valorKgAco,
            colunaRsKg
        ));

        
        if (config.getDadosBasicos_isColunasSustentacao()) {
            Boolean doisLados = config.getColunasSustentacao_distribuicaoIs2Lados();
            pesoColunasTotal = calculaPesoColunasTotal(pesoTotalColunaKgA, pesoTotalColunaKgB, qA, qB, doisLados);
            logs.add(String.format(
                "peso colunas: pesoTotalColunaKgA=%.2f | pesoTotalColunaKgB=%.2f | qA=%d | qB=%d | resultado=%.2f", 
                pesoTotalColunaKgA,
                pesoTotalColunaKgB,
                qA,
                qB,
                pesoColunasTotal
            ));
            precoColunasApoio = calculaPrecoColunas(qADouble, qBDouble, pesoTotalColunaKgA, pesoTotalColunaKgB, colunaRsKg, colunaRsKg, doisLados);
            logs.add(String.format(
                "peso colunas: pesoTotalColunaKgA=%.2f | pesoTotalColunaKgB=%.2f | qA=%d | qB=%d | colunaRsKgA=%.2f | colunaRsKgB=%.2f | q1 * p1 * rsKg1 + q2 * p2 * rsKg2 | resultado=%.2f", 
                pesoTotalColunaKgA,
                pesoTotalColunaKgB,
                qA,
                qB,
                colunaRsKg,
                colunaRsKg,
                pesoColunasTotal
            ));
        }
        Double pesoTotal = pesoVigaPonte + pesoParCabeceira + pesoEletTransversal + pesoEletLongitudinal + pesoTalha + pesoCaminhoRolamento + pesoColunasTotal;
        
        precoTotal += valorVigaPonte;
        precoTotal += valorParCabeceiras;
        precoTotal += valorMontagem;
        precoTotal += valorEletTransversal;
        precoTotal += valorEletLongitudinal;
        precoTotal += valorCaminhoRolamento;
        precoTotal += precoColunasApoio;

        orcamento.setCabeceira(cabeceira.getModelo());
        orcamento.setTrilhoCR(trilhoCR);
        orcamento.setCargaMaximaRoda(cargaMaximaRoda);
        orcamento.setPesoViga(pesoVigaPonte);
        orcamento.setPesoParCabeceira(pesoParCabeceira);
        orcamento.setPesoEletrificacaoTransversal(pesoEletTransversal);
        orcamento.setPesoEletrificacaoLongitudinal(pesoEletLongitudinal);
        orcamento.setPesoCaminhoRolamento(pesoCaminhoRolamento);
        orcamento.setPesoColunasApoio(pesoColunasTotal);
        orcamento.setPesoTotal(pesoTotal);
        orcamento.setPrecoVigaPrincipal(valorVigaPonte);
        orcamento.setPrecoCabeceiras(valorParCabeceiras);
        orcamento.setPrecoMontagem(valorMontagem);
        orcamento.setPrecoEletrificacaoTransversal(valorEletTransversal);
        orcamento.setPrecoEletrificacaoLongitudinal(valorEletLongitudinal);
        orcamento.setPrecoCaminhoRolamento(valorCaminhoRolamento);
        orcamento.setPrecoColunasApoio(precoColunasApoio);
        orcamento.setPrecoTotal(precoTotal);
        
        for (String mensagem : logs) {
            log.info("\n" + mensagem);
        }
        orcamento.setLogs(logs);

        return orcamento;
    }
}
