package com.tcs.site_orcamento.controller;


import com.tcs.site_orcamento.dto.ConfigDTO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/config")
public class ConfigController {

    @PostMapping
    public ConfigDTO postConfig(@RequestBody ConfigDTO dto) {
        System.out.println(dto);
        return dto;
    }

}
