package com.moreroom.domain.mapping.member.repository;

import com.moreroom.domain.genre.entity.Genre;
import com.moreroom.domain.mapping.member.entity.MemberGenreId;
import com.moreroom.domain.mapping.member.entity.MemberGenreMapping;
import com.moreroom.domain.member.entity.Member;
import jakarta.persistence.Tuple;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberGenreMappingRepository extends JpaRepository<MemberGenreMapping, MemberGenreId> {

    List<MemberGenreMapping> findByMember(Member member);

    MemberGenreMapping findByMemberAndGenre(Member member, Genre genre);

    boolean existsByMemberAndGenre(Member member, Genre genre);


    // 추천 테마 - 자주 방문/안 자주 방문 장르 조회
    @Query(value = """
        select mg.genreId, count(pg.themeId)
        from membergenremapping mg
        left join\s
        	(select p.themeId, p.memberId, tg.genreId\s
            from playlog p\s
            left join themegenremapping tg on p.themeId = tg.themeId
            where p.memberId = :memberId) as pg\s
        on mg.genreId = pg.genreId\s
        where mg.memberId = :memberId
        group by mg.genreId
        order by count(pg.themeId) desc
        """, nativeQuery = true)
    public List<Tuple> getFrequentGenres(long memberId);
}
