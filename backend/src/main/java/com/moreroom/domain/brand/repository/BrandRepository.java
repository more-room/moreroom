package com.moreroom.domain.brand.repository;

import com.moreroom.domain.brand.entity.Brand;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Integer> {

    @Query("SELECT b FROM Brand b LEFT JOIN Cafe c ON b.brandId = c.brand.brandId GROUP BY b ORDER BY COUNT(c) DESC")
    List<Brand> findAllOrderByCafeCountDesc();
}
