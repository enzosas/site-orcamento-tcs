package com.tcs.site_orcamento;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SiteOrcamentoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SiteOrcamentoApplication.class, args);
	}

}
