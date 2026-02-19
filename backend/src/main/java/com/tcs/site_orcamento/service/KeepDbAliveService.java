package com.tcs.site_orcamento.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

    @Service
    public class KeepDbAliveService {

        @Autowired
        private JdbcTemplate jdbcTemplate;

        @Scheduled(fixedRate = 600000)
        public void keepAlive() {
            try {
                jdbcTemplate.execute("SELECT 1");
                System.out.println("Keep-alive: Conexão com Supabase ativa.");
            } catch (Exception e) {
                System.err.println("Erro no keep-alive: " + e.getMessage());
            }
    }
    
}
