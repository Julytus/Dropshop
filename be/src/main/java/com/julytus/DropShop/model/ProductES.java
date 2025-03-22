package com.julytus.DropShop.model;

import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.io.Serial;
import java.io.Serializable;

@Document(indexName = "book")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductES implements Serializable {
    @Serial
    private static final long serialVersionUID = -5257626960164837310L;

    @Id
    String id;

    @Field(name = "title", type = FieldType.Text)
    String name;

    @Field(name = "category", type = FieldType.Text)
    String category;

    @Field(name = "image_url", type = FieldType.Text)
    String imageUrl;

    @Field(name = "price", type = FieldType.Float)
    Float price;
}
