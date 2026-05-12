package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.controller.MaxiprodController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tcs.site_orcamento.entity.Cabeceira;

@Service
public class PonteService {

    @Autowired
    MaxiprodService maxiprodService;

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
            Double trilhoKgMB) {
        Double a = comprimentoA * (vigaKgMA + trilhoKgMA);
        Double b = comprimentoB * (vigaKgMB + trilhoKgMB);
        return a + b;
    }

    public static Double calculaValorVigaCR(Double comprimento, Double vigaKgM, Double vigaRsKg) {
        return comprimento * vigaKgM * vigaRsKg / 0.5;
    }

    public static Double calculaValorTrilhoCR(Double comprimento, Double trilhoKgM, Double trilhoRsKg) {
        return comprimento * trilhoKgM * trilhoRsKg / 0.5;
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

    public static Double calculaPesoColunas(String tipo, Double altura, String tipoColuna) {
        Double pesoColunaMetro = getPesoColunaPorMetro(tipoColuna);
        Double flange = getPesoFlangeColuna(tipoColuna);
        if (tipo == "Ponte Rolante") {
            return pesoColunaMetro * altura + flange * 2;
        } else {
            return pesoColunaMetro * (altura + 1) + flange * 2;
        }
    }

    public static Double calculaValorKgColunas() {
        return valorKgAco*2.5;
    }

    public static Double calculaPrecoColunas(Double q1, Double q2, Double p1, Double p2, Double rsKg1, Double rsKg2) {
        return q1 * p1 * rsKg1 + q2 * p2 * rsKg2;
    }

    public static Double calculaPesoColunasTotal(Double q1, Double q2, Double p1, Double p2) {
        return q1 * p1 + q2 * p2;
    }

    public Double calculaAntiColisao(Double comprimentoPonteMm) {
        Double coisa1 = maxiprodService.getPrecoDeVenda("BC0445");
        Double coisa2 = maxiprodService.getPrecoDeVenda("CAB.CHA.06X15");
        coisa1 = coisa1 * 2;
        coisa2 = coisa2 * ((comprimentoPonteMm/1000)+5);
        return coisa1 + coisa2;
    } 

}
