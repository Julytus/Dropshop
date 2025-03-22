package com.julytus.DropShop.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
@Setter
@Builder
public class UserResponse {
    @JsonProperty("id")
    String id;

    @JsonProperty("full_name")
    String fullName;

    @JsonProperty("email")
    String email;

    @JsonProperty("phone_number")
    String phoneNumber;

    @JsonProperty("avatar_url")
    String avatarUrl;

    @JsonProperty("role")
    String role;
}
