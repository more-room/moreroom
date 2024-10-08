package com.moreroom.domain.recommendations.repository;

import com.moreroom.domain.theme.entity.Theme;
import io.lettuce.core.dynamic.annotation.Param;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LocationThemeRepository extends
    JpaRepository<Theme, Integer> {

    @Query(value = """
        SELECT t.themeId
        FROM theme t
        JOIN (
            SELECT c.cafeId\s
            FROM cafe c\s
            ORDER BY (
                6371 * acos(
                    cos(radians(:lat)) * cos(radians(c.latitude)) *\s
                    cos(radians(c.longitude) - radians(:lon)) +\s
                    sin(radians(:lat)) * sin(radians(c.latitude))
                )
            )\s
            LIMIT 10
        ) AS nearby_cafes ON t.cafeId = nearby_cafes.cafeId
        join review r on t.themeId = r.themeId
        group by t.themeId
        order by count(r.reviewId) desc;
        """, nativeQuery = true)
    public List<Integer> findThemeByLocation(@Param("lat") Double lat, @Param("lon") Double lon);

}
