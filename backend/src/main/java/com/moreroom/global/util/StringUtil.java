package com.moreroom.global.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class StringUtil {

    public static boolean isEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static String dateToString(LocalDateTime date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String formattedDateTime = date.format(formatter);
        return formattedDateTime;
    }

    public static LocalDateTime stringToDate(String date) {
        if (date == null) {
            return null;
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime localDateTime = null;

        try {
            LocalDate localDate = LocalDate.parse(date, formatter);
            localDateTime = localDate.atStartOfDay(); // 자정으로 설정
        } catch (DateTimeParseException e) {
            System.out.println("날짜 형식이 잘못되었습니다: " + e.getMessage());
            return null;
        }

        return localDateTime;
    }
}
