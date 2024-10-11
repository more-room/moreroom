package com.moreroom.global.converter;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.stereotype.Component;

@Component
@WritingConverter
public class DateToLocalDateTimeKstConverter implements Converter<Date, LocalDateTime> {

  @Override
  public LocalDateTime convert(Date source) {
    return source.toInstant().atZone(ZoneId.systemDefault())
        .toLocalDateTime().minusHours(9);
  }
}