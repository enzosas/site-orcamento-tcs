package com.tcs.site_orcamento.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrcamentoCompletoDTO {
    private Double totalSch;
    private Double totalTcs;
    private Double circuitoSch;
    private Double circuitoTcs;
    private Double talhaSemCircuito;
    private Double adaptadorViga;
}