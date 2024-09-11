package com.moreroom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MoreroomApplication {

	public static void main(String[] args) {
		SpringApplication.run(MoreroomApplication.class, args);
	}

}
