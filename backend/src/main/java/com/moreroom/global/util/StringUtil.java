package com.moreroom.global.util;

import com.moreroom.global.exception.globalException.DateTimeInvalidException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class StringUtil {

    public static boolean isEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static String dateToString(LocalDateTime date) {
        if (date == null) {
            throw new DateTimeInvalidException();
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String formattedDateTime = date.format(formatter);
        return formattedDateTime;
    }

    public static LocalDateTime stringToDate(String date) {
        if (date == null) {
            throw new DateTimeInvalidException();
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        LocalDateTime localDateTime = null;

        try {
            LocalDate localDate = LocalDate.parse(date, formatter);
            localDateTime = localDate.atStartOfDay(); // 자정으로 설정
        } catch (DateTimeParseException e) {
            try {
                localDateTime = LocalDateTime.parse(date, dateTimeFormatter);
            } catch (DateTimeParseException ex) {
                throw new DateTimeInvalidException();
            }
        }

        return localDateTime;
    }

    public static boolean isParent(String regionId) {
        if (regionId.length() < 10) {
            return false;
        }
        return regionId.substring(2).equals("00000000");
    }
}
