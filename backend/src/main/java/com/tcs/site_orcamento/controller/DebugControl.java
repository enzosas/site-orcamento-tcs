package com.tcs.site_orcamento.controller;


import com.tcs.site_orcamento.dto.ConfigDTO;
import com.tcs.site_orcamento.service.DebugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/debug")
public class DebugControl {

    @Autowired
    DebugService debugService;

    @GetMapping("/getCodigosFaltando")
    public List<String> getCodigosFaltando() {
        return debugService.getCodigosFaltando();
    }

}
