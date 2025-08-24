package com.example.productapi.products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
//TODO: Implement Pagination
public class ProductController {
    @Autowired
    private ProductsRepository productsRepository;

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productsRepository.save(product);
    }

    @GetMapping
    public List<ProductResponseDto> getAllProducts() {
        List<Product> products = productsRepository.findAll();
        return products.stream()
                .map(ProductResponseDto::fromEntity)
                .toList();
    }

     @GetMapping("/{id}")
     public ResponseEntity<ProductResponseDto> getProductByID(@PathVariable Long id) {
        return productsRepository.findById(id).map(product -> ResponseEntity.ok().body(ProductResponseDto.fromEntity(product)))
                .orElse(ResponseEntity.notFound().build());
     }

     @DeleteMapping("/{id}")
     public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        return productsRepository.findById(id).map(product -> { productsRepository.delete(product);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
     }
}
