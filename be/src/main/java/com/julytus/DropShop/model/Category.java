package com.julytus.DropShop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "categories")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Category extends AbstractEntity<String> {
    @Column(name = "name")
    String name;

    @Column(name = "description")
    String description;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    Set<Product> products = new HashSet<>();
}
