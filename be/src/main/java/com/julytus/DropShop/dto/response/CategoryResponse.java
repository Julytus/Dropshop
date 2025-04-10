package com.julytus.DropShop.dto.response;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryResponse {
    @JsonProperty("id")
    String id;

    @JsonProperty("name")
    String name;

    @JsonProperty("description")
    String description;
}
