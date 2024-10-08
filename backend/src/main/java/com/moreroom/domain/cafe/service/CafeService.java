package com.moreroom.domain.cafe.service;

import com.moreroom.domain.cafe.dto.Response.CafeDetailResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeListComponentDto;
import com.moreroom.domain.cafe.dto.Response.CafeListResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeSearchNameResponseDto;
import com.moreroom.domain.cafe.dto.Response.CafeThemeDetailResponseDto;
import com.moreroom.domain.cafe.dto.request.CafeListRequestDto;
import com.moreroom.domain.cafe.repository.CafeQueryRepository;
import com.moreroom.domain.cafe.repository.CafeRepository;
import jakarta.persistence.Tuple;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CafeService {

    private final CafeRepository cafeRepository;
    private final CafeQueryRepository cafeQueryRepository;


    public CafeListResponseDto findCafes(CafeListRequestDto c) {
//        System.out.println("\"%\" + c.getCafeName() + \"%\" = " + "%" + c.getCafeName() + "%");
        System.out.println("c.getRegion() = " + c.getRegion());
        long beforeTime = System.currentTimeMillis();
        List<Tuple> tuples = cafeRepository.findCafes(
            c.getCafeName() == null ? null : ("%" + c.getCafeName() + "%"), c.getBrandId(),
            c.getRegion());
        List<CafeListComponentDto> cafeList = new ArrayList<>();
        long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
        double secDiffTime = (double) (afterTime - beforeTime) / 1000; //두 시간에 차 계산
        System.out.println("시간차이(m) : " + secDiffTime);
        for (Tuple tuple : tuples) {
            CafeListComponentDto dto = CafeListComponentDto.builder()
                .cafeId(tuple.get(0, Integer.class))
                .brandId(tuple.get(1, Integer.class))
                .regionId(tuple.get(2, String.class))
                .address(tuple.get(3, String.class))
                .cafeName(tuple.get(4, String.class))
                .latitude(tuple.get(5, Float.class))
                .longitude(tuple.get(6, Float.class))
                .themeCount(tuple.get(7, Long.class).intValue())
                .reviewCount(tuple.get(8, Long.class).intValue())
                .themePoster(tuple.get(9, String.class))
                .build();

            cafeList.add(dto);
        }
        long afterTime2 = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
        double secDiffTime2 = (double) (afterTime2 - afterTime) / 1000; //두 시간에 차 계산
        System.out.println("시간차이2(m) : " + secDiffTime2);
        return CafeListResponseDto.builder().cafeList(cafeList).build();
    }

    public CafeDetailResponseDto findCafeByCafeId(Integer cafeId, Long memberId) {
        return cafeQueryRepository.findCafeByCafeId(cafeId, memberId);
    }

    public CafeThemeDetailResponseDto findCafeByThemeId(Integer themeId) {
        return cafeQueryRepository.findByThemeId(themeId);
    }

    public CafeSearchNameResponseDto findCafeByName(String name) {
        PageRequest pageRequest = PageRequest.of(0, 10);
        CafeSearchNameResponseDto cafeSearchNameResponseDto = cafeQueryRepository.findAllByCafeName(
            name, pageRequest);

        return cafeSearchNameResponseDto;
    }
}
