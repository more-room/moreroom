package com.moreroom.global.config;

import com.moreroom.global.converter.DateToLocalDateTimeKstConverter;
import com.moreroom.global.converter.LocalDateTimeToDateKstConverter;
import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

@Configuration
public class MongoConfig {

  @Bean
  public MongoCustomConversions customConversions(
      LocalDateTimeToDateKstConverter localDateTimeToDateKstConverter,
      DateToLocalDateTimeKstConverter dateToLocalDateTimeKstConverter
  ) {
    return new MongoCustomConversions(
        Arrays.asList(
            localDateTimeToDateKstConverter,
            dateToLocalDateTimeKstConverter
        )
    );
  }
}