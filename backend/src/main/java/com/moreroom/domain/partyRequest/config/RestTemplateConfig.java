package com.moreroom.domain.partyRequest.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {

    @Value("${spring.fastAPI.URL}")
    private String FASTAPI_URL;

    @Value("${spring.fastAPI.ONE_URL}")
    private String FASTAPI_ONE_URL;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    @Qualifier("fastApiUrl")
    public String fastApiUrl() {
        return FASTAPI_URL;
    }

    @Bean
    @Qualifier("fastApiOneUrl")
    public String fastApiOneUrl() {
        return FASTAPI_ONE_URL;
    }
}
