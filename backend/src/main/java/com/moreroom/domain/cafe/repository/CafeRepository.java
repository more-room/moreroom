package com.moreroom.domain.cafe.repository;

import com.moreroom.domain.cafe.entity.Cafe;
import jakarta.persistence.Tuple;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CafeRepository extends JpaRepository<Cafe, Integer> {

    @Query(value = """
            SELECT
                c.cafeId,
                c.brandId AS brandId,
                c.regionId AS regionId,
                c.address,
                c.cafeName,
                c.latitude,
                c.longitude,
                COUNT(DISTINCT t.themeId) AS themeCount,
                COUNT(r.reviewId) AS reviewCount,
                (SELECT t2.poster
                 FROM Theme t2
                 JOIN Review r2 ON t2.themeId = r2.themeId
                 WHERE t2.cafeId = c.cafeId
                 GROUP BY t2.themeId
                 ORDER BY COUNT(r2.reviewId) DESC
                 LIMIT 1) AS themePoster
            FROM Cafe c
            LEFT JOIN Theme t ON c.cafeId = t.cafeId
            LEFT JOIN Review r ON t.themeId = r.themeId
            LEFT JOIN Region rg ON c.regionId = rg.regionId
            WHERE (:cafeName IS NULL OR c.cafeName LIKE :cafeName)
                  AND (:brandIds IS NULL OR c.brandId IN (:brandIds))
                  AND (:regionId IS NULL OR rg.regionId = :regionId OR rg.parentRegionId = :regionId)
                  AND c.openFlag = true
            GROUP BY c.cafeId
        """, nativeQuery = true)
    public List<Tuple> findCafes(String cafeName, List<Integer> brandIds, String regionId);
}
