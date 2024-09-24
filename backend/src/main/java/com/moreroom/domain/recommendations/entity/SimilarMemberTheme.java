package com.moreroom.domain.recommendations.entity;

import jakarta.persistence.Id;
import java.util.List;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "themeRec_similarMemberTheme")
@Getter
@ToString
public class SimilarMemberTheme {

    @Id
    private String id;
    private Long memberId;
    private List<Integer> similarMemberThemes;
}
