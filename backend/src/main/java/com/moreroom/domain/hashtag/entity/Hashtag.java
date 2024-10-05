package com.moreroom.domain.hashtag.entity;

import com.moreroom.domain.hashtagGroup.entity.HashtagGroup;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.mapping.Join;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true)
@Builder
@Table(name="hashtag")
public class Hashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer hashtagId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "hashtagGroupId")
    private HashtagGroup hashtagGroup;
    @Column(nullable = false, length = 50)
    private String hashtagName;
}
