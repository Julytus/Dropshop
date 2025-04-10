package com.julytus.DropShop.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;

@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RefreshTokenResponse implements Serializable {
    @JsonProperty("user_id")
    String userId;
    @JsonProperty("access_token")
    String accessToken;
}
