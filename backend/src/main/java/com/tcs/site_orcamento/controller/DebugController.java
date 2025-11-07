package com.tcs.site_orcamento.controller;


import com.tcs.site_orcamento.service.DebugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @Autowired
    DebugService debugService;

    @GetMapping("/getCodigosFaltando")
    public Map<String, List<String>> getCodigosFaltando() {
        return debugService.getCodigosFaltando();
    }

}
