package com.moreroom.domain.recommendations.entity;

import jakarta.persistence.Id;
import java.util.List;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "themeRec_demographicsTheme")
@Getter
@ToString
public class DemographicsTheme {

    @Id
    private String id;
    private String groupId;
    private List<Integer> demographicThemes;
}
