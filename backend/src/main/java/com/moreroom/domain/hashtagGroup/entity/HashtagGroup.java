package com.moreroom.domain.hashtagGroup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Builder
public class HashtagGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer hashtagGroupId;
    @Column(nullable = false, length = 50)
    private String hashtagGroupName;
}
