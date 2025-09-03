package com.tcs.site_orcamento.controller;


import com.tcs.site_orcamento.entity.Motor;
import com.tcs.site_orcamento.repository.MotorRepository;
import com.tcs.site_orcamento.service.MotorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motores")
public class MotorController {

    @Autowired
    private MotorRepository motorRepository;

    @Autowired
    private MotorService motorService;

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

    @GetMapping("/filtroPreco")
    public Double filtroPreco(
            @RequestParam(required = true) String motor,
            @RequestParam(required = true) Integer tensao)
    {
        Motor motorObjeto = motorRepository.findByMotorAndTensao(motor, tensao);
        return motorService.calculaPrecoDeVenda(motorObjeto);
    }
}
