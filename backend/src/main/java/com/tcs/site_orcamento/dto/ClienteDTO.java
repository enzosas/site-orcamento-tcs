package com.tcs.site_orcamento.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ClienteDTO {

    String cnpj;
    String razaoSocial;
    String inscricaoEstadual;
    String cep;
    String logradouro;
    String enderecoNumero;
    String complemento;
    String bairro;
    String cidade;
    String estado;
}
