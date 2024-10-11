package com.moreroom.domain.externalReview.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ExternalReviewExtractService {

    public static String getFirstKeyword(String content, String title, Integer length) {
        Integer len = length == null ? 150 : length;
        List<String> keywords = new ArrayList<>(List.of(
            "한줄평", "강점", "스토리", "장치", "인테리어", "연출", "체감",
            "공포도", "활동성", "볼륨", "만족", "가성비", "추천", "포인트",
            "힌트", "난이도"));

        for (String keyword : keywords) {
            int index = content.indexOf(keyword);
            if (index != -1) {
                // 키워드가 발견된 경우 그 위치에서부터 length만큼 자른 문자열 반환
                int endIndex = Math.min(index + len, content.length());
                return content.substring(index, endIndex);
            }
        }
        if (title != null) {
            int index = content.indexOf(title);
            if (index != -1) {
                // 키워드가 발견된 경우 그 위치에서부터 length만큼 자른 문자열 반환
                int endIndex = Math.min(index + len, content.length());
                return content.substring(index, endIndex);
            }
        }
        return content.substring(0, Math.min(len, content.length()));
    }
}
