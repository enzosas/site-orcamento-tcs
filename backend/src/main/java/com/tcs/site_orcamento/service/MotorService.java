package com.tcs.site_orcamento.service;

import com.tcs.site_orcamento.controller.MotorController;
import com.tcs.site_orcamento.entity.Motor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MotorService {

    @Autowired
    private MaxiprodService maxiprodService;

    public Double calculaPrecoDeVenda(Motor motor) {

        Double precoResistor = 0.0;

        Double precoContatora = maxiprodService.getPrecoDeVenda(motor.getContatora());
        Double precoDisjuntorContatora = maxiprodService.getPrecoDeVenda(motor.getDisjuntorContatora());
        Double precoDisjuntorInversor = maxiprodService.getPrecoDeVenda(motor.getDisjuntorInversor());
        Double precoInversor = maxiprodService.getPrecoDeVenda(motor.getInversor());
        if (motor.getResistor() != null && !motor.getResistor().isEmpty()) {
            precoResistor = maxiprodService.getPrecoDeVenda(motor.getResistor());
        }

        return precoContatora + precoDisjuntorContatora + precoDisjuntorInversor + precoInversor + precoResistor;
    }
}
