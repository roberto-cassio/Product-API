package com.example.productapi.products;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductsRepository extends JpaRepository<Product, Long> {
} 