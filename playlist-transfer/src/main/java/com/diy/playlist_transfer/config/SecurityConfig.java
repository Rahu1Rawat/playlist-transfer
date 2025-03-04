package com.diy.playlist_transfer.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF protection
                .authorizeHttpRequests(authorizeRequests ->
                                authorizeRequests
//                        .requestMatchers("/spotify/authorize").permitAll() // Allow access to /spotify/authorize without authentication
//                        .anyRequest().authenticated() // Require authentication for any other request
                                        .anyRequest().permitAll()
                );
//                .formLogin(Customizer.withDefaults()); // Enable form-based login with default settings
        return http.build();
    }
}