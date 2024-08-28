package com.example.backApp.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Désactive CSRF
                .authorizeRequests(authz -> authz
                        .requestMatchers("/api/auth/**").permitAll()  // Permet l'accès à toutes les requêtes sous /api/auth/
                        .anyRequest().permitAll()  // Permet l'accès à toutes les autres requêtes
                );
        return http.build();
    }
}
