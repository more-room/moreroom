package com.moreroom.domain.deviceToken.repository;

import com.moreroom.domain.deviceToken.entity.DeviceToken;
import com.moreroom.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceTokenRepository extends JpaRepository<DeviceToken, Long> {
  Optional<DeviceToken> findByMember(Member member);
  int deleteByMember(Member member);
}
