package com.tcs.site_orcamento.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tcs.site_orcamento.dto.ClienteDTO;
import com.tcs.site_orcamento.dto.TalhaDTO;

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
            itens(where: { codigo: { startsWith: "%s" } }) {
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
                     empresas(where: { razaoSocial: { contains: "%s" } }, take: 10000) {
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

    public String getAllTalhasJSON() {
        String query = """
        query {
            itens(where: { grupoId: { eq: 146780004271266 } }, take: 10000) {
                items {
                    codigo
                    parametros {
                        codigo
                        valor
                        descricao
                    }
                }
            }
        }
        """;
        Map<String, String> body = Map.of("query", query);

        String response = webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return response;
    }

    public List<TalhaDTO> getAllTalhas() {

        String json = getAllTalhasJSON();
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(json);
            JsonNode items = root.path("data").path("itens").path("items");
            List<TalhaDTO> listaTalhas = new ArrayList<>();
            if (items.isMissingNode() || items.isEmpty()) {
                return listaTalhas;
            }
            for (JsonNode itemNode : items) {
                TalhaDTO talha = new TalhaDTO();
                talha.setCodigo(itemNode.path("codigo").asText(null));
                JsonNode parametrosNode = itemNode.path("parametros");
                if (parametrosNode.isArray()) {
                    for (JsonNode param : parametrosNode) {
                        String codParam = param.path("codigo").asText("");
                        String valorParam = param.path("valor").asText(null);
                        if (valorParam != null) {
                            valorParam = valorParam.trim();
                            if (valorParam.equals("-")) {
                                valorParam = null;
                            }
                        }
                        switch (codParam) {
                            case "CAP" -> talha.setCapacidade(converterParaInteger(valorParam));
                            case "CUG" -> talha.setCursoUtilGancho(converterParaInteger(valorParam));
                            case "FRM" -> talha.setFormaConstrutiva(valorParam);
                            case "GT"  -> talha.setGrupoTrabalho(valorParam);
                            case "CC"  -> talha.setCorrenteCabo(valorParam);
                            case "BIT" -> talha.setBitola(valorParam);
                            case "RAM" -> talha.setRamais(converterParaInteger(valorParam));
                            case "MOV" -> talha.setTipoTrole(valorParam);
                            case "V"   -> talha.setTensaoTrifasica(valorParam);
                            case "PME" -> talha.setMotorElevacao(valorParam);
                            case "TME" -> talha.setAcionamentoMotorElevacao(valorParam);
                            case "VEL" -> talha.setVelElevacaoPadrao(valorParam);
                            case "PMT" -> talha.setMotorTranslacao(valorParam);
                            case "TMT" -> talha.setAcionamentoMotorTranslacao(valorParam);
                            case "VTR" -> talha.setVelTranslacaoPadrao(valorParam);
                            case "FTR" -> talha.setFreioNoCarroTranslacao(converterParaBoolean(valorParam));
                            case "PMP" -> talha.setPotenciaMotorPonte(valorParam);
                            case "CEL" -> talha.setCelulaCargaSerie(converterParaBoolean(valorParam));
                            case "FCS" -> talha.setFimCursoSobe(valorParam);
                            case "FCD" -> talha.setFimCursoDesce(valorParam);
                            case "FCE" -> talha.setFimCursoEmergencia(valorParam);
                            case "FCT" -> talha.setFimCursoDireitaEsquerdaDisponivel(converterParaBoolean(valorParam));
                            case "GUI" -> talha.setGuiaCabo(valorParam);
                            case "LVG" -> talha.setLarguraVigaPadrao(valorParam);
                            case "CIR" -> talha.setPainelComandoPadrao(valorParam);
                            case "VCM" -> talha.setTensaoComando(valorParam);
                            case "BTE" -> talha.setBotoeira(valorParam);
                            case "CRM" -> talha.setControleRemoto(valorParam);
                            case "MCE" -> talha.setPainelParaPonteRolante(converterParaBoolean(valorParam));
                        }
                    }
                }
                listaTalhas.add(talha);
            }
            return listaTalhas;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao processar a resposta do GraphQL para a listagem de talhas.", e);
        }
    }

    private Integer converterParaInteger(String valor) {
        if (valor == null || valor.trim().isEmpty()) {
            return null;
        }
        try {
            String valorLimpo = valor.replace(".", "").trim();
            return Integer.parseInt(valorLimpo);
        } catch (NumberFormatException e) {
            System.err.println("Aviso: Não foi possível converter o valor para Integer: " + valor);
            return null;
        }
    }

    private Boolean converterParaBoolean(String valor) {
        if (valor == null) return null;
        return valor.equalsIgnoreCase("Sim");
    }

}
