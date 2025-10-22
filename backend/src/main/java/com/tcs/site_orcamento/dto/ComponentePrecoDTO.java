package com.tcs.site_orcamento.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ComponentePrecoDTO {
    private String descricao;
    private String codigo;
    private Double preco;
}
