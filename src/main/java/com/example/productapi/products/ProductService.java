package com.example.productapi.products;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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

  public Product updateProduct(Long id, Product updatedProduct) {
    validateProduct(updatedProduct);
    return productRepository.findById(id).map(product -> {
      product.setName(updatedProduct.getName());
      product.setDescription(updatedProduct.getDescription());
      product.setPrice(updatedProduct.getPrice());
      return productRepository.save(product);
    }).orElseThrow(() -> new IllegalArgumentException("Product with ID " + id + " not found"));
  }

  public Page<ProductResponseDto> getAllProducts() {
    Page<Product> products = productRepository.findAll(pageable);
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

    if (product.getPrice() == null || product.getPrice() < 0) {
      throw new IllegalArgumentException("Product price must be positive");
    }
  }

  private void validateDuplicatedName(String name) {
    if (productRepository.existsByName(name)) {
      throw new IllegalArgumentException("Product with name '" + name + "' already exists");
    }
  }
}