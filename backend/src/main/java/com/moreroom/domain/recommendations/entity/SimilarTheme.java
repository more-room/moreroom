package com.moreroom.domain.recommendations.entity;

import jakarta.persistence.Id;
import java.util.List;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "themeRec_similarTheme")
@Getter
@ToString
public class SimilarTheme {

    @Id
    private String id;
    private Long themeId;
    private List<Integer> similarThemes;
    private List<Double> similarThemesSim;
}
