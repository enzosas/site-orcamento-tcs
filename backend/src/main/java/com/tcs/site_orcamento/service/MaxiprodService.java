package com.tcs.site_orcamento.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tcs.site_orcamento.dto.ClienteDTO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class MaxiprodService {
    private final WebClient webClient;

    public MaxiprodService(WebClient.Builder builder) throws IOException {

        String apiToken = System.getenv("MAXIPROD_TOKEN").trim();

        this.webClient = builder
                .baseUrl("https://api.maxiprod.com.br/graphql/")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, apiToken)
                .build();
    }

    public WebClient getClient() {
        return webClient;
    }





    public Mono<String> queryLegal(String codigo) {
        String query = """
        query {
            itens(where: { codigo: { eq: "%s" } }) {
                items {
                    descricao
                    precoDeVenda
                    ncm {
                        ipiAliquota
                    }
                    aquisicaoOuOrcamentacaoCusto
                }
            }
        }
        """.formatted(codigo);

        Map<String, String> body = Map.of("query", query);

        return webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class);
    }

    public Double getPrecoDeVenda(String codigo) {
        String query = """
        query {
            itens(where: { codigo: { eq: "%s" } }) {
                items {
                    precoDeVenda
                }
            }
        }
        """.formatted(codigo);
        Map<String, String> body = Map.of("query", query);

        String response = webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            return root.path("data")
                    .path("itens")
                    .path("items")
                    .get(0)
                    .path("precoDeVenda")
                    .asDouble();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao processar a resposta do GraphQL para o código: " + codigo, e);
        }
    }

    public Double getIpi(String codigo) {
        String query = """
                query {
                    itens(where: { codigo: { eq: "%s" } }) {
                        items {
                            ncm {
                                ipiAliquota
                            }
                        }
                    }
                }
                """.formatted(codigo);
        Map<String, String> body = Map.of("query", query);

        String response = webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            return root.path("data")
                    .path("itens")
                    .path("items")
                    .get(0)
                    .path("ncm")
                    .path("ipiAliquota")
                    .asDouble();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao processar a resposta do GraphQL para o código: " + codigo, e);
        }
    }

    public Double getPrecoDeAquisicao(String codigo) {
        String query = """
        query {
            itens(where: { codigo: { eq: "%s" } }) {
                items {
                    aquisicaoOuOrcamentacaoCusto
                }
            }
        }
        """.formatted(codigo);
        Map<String, String> body = Map.of("query", query);

        String response = webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            return root.path("data")
                    .path("itens")
                    .path("items")
                    .get(0)
                    .path("aquisicaoOuOrcamentacaoCusto")
                    .asDouble();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao processar a resposta do GraphQL para o código: " + codigo, e);
        }
    }

    public ClienteDTO getClienteByCnpj(String cnpj) {

        String query = """
                query NotasFiscais {
                     empresas(where: { cnpjOuCpf: { eq: "%s" } }) {
                         items {
                             cnpjOuCpf
                             razaoSocial
                             inscricaoEstadual
                             endereco {
                                 cep
                                 logradouro
                                 numero
                                 complemento
                                 bairro
                                 municipio {
                                     descricao
                                     uf {
                                         sigla
                                     }
                                 }
                                 telefone1
                             }
                         }
                     }
                 }
                """.formatted(cnpj);
        Map<String, String> body = Map.of("query", query);

        String response = webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode items = root.path("data").path("empresas").path("items");

            if(items.isEmpty()) {

                throw new RuntimeException("Erro ao processar a resposta do GraphQL para o CNPJ: " + cnpj);
            }

            JsonNode empresaNode = items.get(0);
            JsonNode enderecoNode = empresaNode.path("endereco");
            JsonNode municipioNode = enderecoNode.path("municipio");

            return new ClienteDTO(
                    empresaNode.path("cnpjOuCpf").asText(null),
                    empresaNode.path("razaoSocial").asText(null),
                    empresaNode.path("inscricaoEstadual").asText(null),
                    enderecoNode.path("cep").asText(null),
                    enderecoNode.path("logradouro").asText(null),
                    enderecoNode.path("numero").asText(null),
                    enderecoNode.path("complemento").asText(null),
                    enderecoNode.path("bairro").asText(null),
                    municipioNode.path("descricao").asText(null),
                    municipioNode.path("uf").path("sigla").asText(null),
                    enderecoNode.path("telefone1").asText(null)
            );
        } catch (Exception e) {
            throw new RuntimeException("Erro ao processar a resposta do GraphQL para o CNPJ: " + cnpj, e);
        }
    }

    public List<ClienteDTO> getClienteByRazaoSocial(String razaoSocial) {

        String query = """
                query NotasFiscais {
                     empresas(where: { razaoSocial: { contains: "%s" } }) {
                         items {
                             cnpjOuCpf
                             razaoSocial
                             inscricaoEstadual
                             endereco {
                                 cep
                                 logradouro
                                 numero
                                 complemento
                                 bairro
                                 municipio {
                                     descricao
                                     uf {
                                         sigla
                                     }
                                 }
                                 telefone1
                             }
                         }
                     }
                 }
                """.formatted(razaoSocial);
        Map<String, String> body = Map.of("query", query);

        String response = webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode items = root.path("data").path("empresas").path("items");

            List<ClienteDTO> listaClientes = new ArrayList<>();

            if(items.isEmpty()) {
                return listaClientes;
            }

            for (JsonNode empresaNode : items) {

                JsonNode enderecoNode = empresaNode.path("endereco");
                JsonNode municipioNode = enderecoNode.path("municipio");

                listaClientes.add(new ClienteDTO(
                    empresaNode.path("cnpjOuCpf").asText(null),
                    empresaNode.path("razaoSocial").asText(null),
                    empresaNode.path("inscricaoEstadual").asText(null),
                    enderecoNode.path("cep").asText(null),
                    enderecoNode.path("logradouro").asText(null),
                    enderecoNode.path("numero").asText(null),
                    enderecoNode.path("complemento").asText(null),
                    enderecoNode.path("bairro").asText(null),
                    municipioNode.path("descricao").asText(null),
                    municipioNode.path("uf").path("sigla").asText(null),
                    enderecoNode.path("telefone1").asText(null)
                ));
            }
            return listaClientes;

        } catch (Exception e) {
            throw new RuntimeException("Erro ao processar a resposta do GraphQL para a razao social: " + razaoSocial, e);
        }
    }
}
