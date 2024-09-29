package com.moreroom.global.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RedisUserInfo {
  private Long memberId;
  private String email;
  private String nickname;
  private String photo;
}
