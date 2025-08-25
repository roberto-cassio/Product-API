package com.example.productapi.products;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Product name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;
    @Min(value = 0, message = "Price must be positive")
    @NotNull(message = "Price is required")
    private Integer price;



    public Long getId(){return id;}

    public String getName(){return name;}
    public void setName(String name){this.name = name;}

    public String getDescription(){return description;}
    public void setDescription(String description){this.description = description;}

    public Integer getPrice(){return price;}
    public void setPrice(Integer price){this.price = price;}
}
