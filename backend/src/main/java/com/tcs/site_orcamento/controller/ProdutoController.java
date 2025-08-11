package com.tcs.site_orcamento.controller;

import com.tcs.site_orcamento.entity.Talha;
import com.tcs.site_orcamento.repository.TalhaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private TalhaRepository talhaRepository;

    @GetMapping
    public List<Talha> listarTodos() {
        return talhaRepository.findAll();
    }
}
