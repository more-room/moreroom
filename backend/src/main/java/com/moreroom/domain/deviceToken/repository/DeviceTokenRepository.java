package com.moreroom.domain.deviceToken.repository;

import com.moreroom.domain.deviceToken.entity.DeviceToken;
import com.moreroom.domain.member.entity.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DeviceTokenRepository extends JpaRepository<DeviceToken, Long> {
  Optional<DeviceToken> findByMember(Member member);

  @Query("select dt from DeviceToken dt join Member m on dt.member = m where m.email = :email")
  Optional<DeviceToken> findByEmail(String email);
}
