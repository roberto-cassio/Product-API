package com.example.productapi.products;

public class ProductResponseDto {
    private Long id;
    private String name;
    private String description;
    private Double priceInReais;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPriceInReais() {
        return priceInReais;
    }

    public void setPriceInReais(Double priceInReais) {
        this.priceInReais = priceInReais;
    }

    public static ProductResponseDto fromEntity(Product product){
    ProductResponseDto dto = new ProductResponseDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPriceInReais(product.getPrice()/100.0);

        return dto;
    }

}


