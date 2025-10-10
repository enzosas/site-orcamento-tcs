package com.tcs.site_orcamento.controller;


import com.tcs.site_orcamento.entity.Motor;
import com.tcs.site_orcamento.repository.MotorRepository;
import com.tcs.site_orcamento.service.PrecoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motores")
public class MotorController {

    @Autowired
    private MotorRepository motorRepository;

    @Autowired
    private PrecoService precoService;

    @GetMapping("/")
    public List<Motor> motores(){
        return motorRepository.findAll();
    }

    @GetMapping("/filtro")
    public Motor filtro(
            @RequestParam(required = true) String motor,
            @RequestParam(required = true) Integer tensao)
    {
        return motorRepository.findByMotorAndTensao(motor, tensao);
    }

    @GetMapping("/abc")
    public String abc(
            @RequestParam(required = true) String talha)
    {
        return precoService.calculaPrecoDeVenda(talha);
    }
}
