package com.moreroom.domain.member.email.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailCheckRequestDTO {
    private String email;

    private String authToken;

}
