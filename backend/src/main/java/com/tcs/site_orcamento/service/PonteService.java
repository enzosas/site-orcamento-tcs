package com.tcs.site_orcamento.service;

import org.springframework.stereotype.Service;

@Service
public class PonteService {
    
    public static Double calculaCargaMaximaPorRoda
    (
        Double capacidadePonte, Double comprimentoPonte, Double pesoMetroLinear, Double pesoVigaPonte, Double pesoCabeceiraUtilizada
    ) {

        if (pesoMetroLinear == 0) {
            return 0.0;
        }

        Double metadePVP = pesoVigaPonte / 2;
        Double fatorSeguranca = 1.15;
        Double parenteses = (capacidadePonte *(comprimentoPonte-1000)/comprimentoPonte+(20*comprimentoPonte/1000/2))*fatorSeguranca/2;

        return metadePVP + pesoCabeceiraUtilizada + parenteses;
    }

    public static Double calculaPesoTotalPonteComTalha(
        Double comprimentoPonte, Double pesoMetroLinear, Double pesoVigaPonte, Double pesoCabeceiraUtilizada, Double pesoTalha
    ) {

        if (pesoMetroLinear == 0) {
            return 0.0;
        }

        Double soma = pesoCabeceiraUtilizada * 2 + 10 * comprimentoPonte / 1000 + pesoTalha;

        return pesoVigaPonte + soma;
    }
}
