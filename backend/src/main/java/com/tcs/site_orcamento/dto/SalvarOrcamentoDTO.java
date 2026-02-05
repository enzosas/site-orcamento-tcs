package com.tcs.site_orcamento.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SalvarOrcamentoDTO {

    private ConfigDTO config;
    private Map<String, Object> cliente;
    private String username;
}
