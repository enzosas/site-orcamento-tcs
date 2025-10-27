package com.tcs.site_orcamento.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PrecoDTO {
    private Double precoTotal;
    private Double precoCircuito;
    private List<ComponentePrecoDTO> componentes;
}
