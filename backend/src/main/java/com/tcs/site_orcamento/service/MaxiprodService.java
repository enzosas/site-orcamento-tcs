package com.tcs.site_orcamento.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MaxiprodService {
    private final WebClient webClient;

    public MaxiprodService(WebClient.Builder builder) throws IOException {

        Path path = Path.of("backend/maxitoken.txt");
        if (!Files.exists(path)) {
            throw new IllegalStateException("Arquivo maxitoken.txt não encontrado em " + path.toAbsolutePath());
        }
        String apiToken = Files.readString(path, StandardCharsets.UTF_8).trim();

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

    public double getPrecoDeVenda(String codigo) {
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
            throw new RuntimeException("Erro ao processar a resposta do GraphQL", e);
        }
    }

    public double getIpi(String codigo) {
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
            throw new RuntimeException("Erro ao processar a resposta do GraphQL", e);
        }
    }


}
