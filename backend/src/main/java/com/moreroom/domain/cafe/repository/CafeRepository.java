package com.moreroom.domain.cafe.repository;

import com.moreroom.domain.cafe.entity.Cafe;
import jakarta.persistence.Tuple;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CafeRepository extends JpaRepository<Cafe, Integer> {

    @Query("""
            SELECT\s
                c.cafeId,
                c.brand.brandId as brandId,
                c.region.regionId as regionId,
                c.address,
                c.cafeName,
                c.latitude,
                c.longitude,
                COUNT(DISTINCT t.themeId) AS themeCount,
                COUNT(r.reviewId) AS reviewCount,
                (SELECT t2.poster\s
                 FROM Theme t2\s
                 JOIN Review r2 ON t2.themeId = r2.theme.themeId\s
                 WHERE t2.cafe.cafeId = c.cafeId\s
                 GROUP BY t2.themeId\s
                 ORDER BY COUNT(r2.reviewId) DESC\s
                 LIMIT 1) AS themePoster
            FROM Cafe c
            LEFT JOIN Theme t ON c.cafeId = t.cafe.cafeId
            LEFT JOIN Review r ON t.themeId = r.theme.themeId
            WHERE (:cafeName IS NULL OR c.cafeName LIKE :cafeName)
                  AND (:brandIds IS NULL OR c.brand.brandId IN (:brandIds))
                  AND (:regionId IS NULL OR c.region.regionId = :regionId)
                  AND c.openFlag = true
            GROUP BY c.cafeId
        """)
    public List<Tuple> findCafes(String cafeName, List<Integer> brandIds, String regionId);
}
