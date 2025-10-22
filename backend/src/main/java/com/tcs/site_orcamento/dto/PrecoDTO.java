package com.tcs.site_orcamento.dto;

import lombok.Data;

import java.util.List;

@Data
public class PrecoDTO {
    private Double precoTotal;
    private List<ComponentePrecoDTO> componentes;
}
