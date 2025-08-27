package com.example.productapi.products;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@Transactional
public class ProductService {
  //DI
  private final ProductsRepository productRepository;

  public ProductService(ProductsRepository productRepository) {
    this.productRepository = productRepository;
  }

  public Product createProduct(Product product) {
    validateProduct(product);
    validateDuplicatedName(product.getName());
    return productRepository.save(product);
  }

  public List<ProductResponseDto> getAllProducts() {
    List<Product> products = productRepository.findAll();
    return products.stream()
            .map(ProductResponseDto::fromEntity)
            .toList();
  }

  public ProductResponseDto getProductByID(Long id) {
    return productRepository.findById(id)
            .map(ProductResponseDto::fromEntity)
            .orElse(null);
  }

  public boolean deleteProduct(Long id) {
    return productRepository.findById(id).map(product -> { productRepository.delete(product);
        return true;
    }).orElse(false);
  }


  //-----------------------------

  private void validateProduct(Product product) {
    if (product.getName() == null || product.getName().isEmpty()) {
      throw new IllegalArgumentException("Product name cannot be null or empty");
    }
    //TODO: Fix this validation
    // if (product.getPrice() == null || product.getPrice() < 0) {
    //   throw new IllegalArgumentException("Product price must be positive");
    // }
  }

  private void validateDuplicatedName(String name) {
    if (productRepository.existsByName(name)) {
      throw new IllegalArgumentException("Product with name '" + name + "' already exists");
    }
  }
}