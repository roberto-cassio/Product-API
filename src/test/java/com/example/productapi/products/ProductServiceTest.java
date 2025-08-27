package com.example.productapi.products;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductsRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product validProduct;
    private ProductResponseDto productResponseDto;
    private Pageable pageable;

    @BeforeEach
    void setUp() {
        validProduct = new Product();
        validProduct.setName("Teste Mock");
        validProduct.setDescription("Descrição Mock");
        validProduct.setPrice(2500);

        productResponseDto = new ProductResponseDto();
        productResponseDto.setId(1L);
        productResponseDto.setName("Teste Mock");
        productResponseDto.setDescription("Descrição Mock");
        productResponseDto.setPriceInReais(25.0);

        pageable = PageRequest.of(0, 10);
    }

    @Test
    void shouldCreateProductSuccessfully() {
        when(productRepository.existsByName("Teste Mock")).thenReturn(false);
        when(productRepository.save(any(Product.class))).thenReturn(validProduct);

        Product result = productService.createProduct(validProduct);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Teste Mock");
        assertThat(result.getDescription()).isEqualTo("Descrição Mock");
        assertThat(result.getPrice()).isEqualTo(2500);

        verify(productRepository).existsByName("Teste Mock");
        verify(productRepository).save(validProduct);
    }

    @Test
    void shouldThrowExceptionWhenCreatingProductWithDuplicateName() {
        when(productRepository.existsByName("Teste Mock")).thenReturn(true);

        assertThatThrownBy(() -> productService.createProduct(validProduct))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Product with name 'Teste Mock' already exists");

        verify(productRepository).existsByName("Teste Mock");
        verify(productRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenCreatingProductWithNullName() {
        Product invalidProduct = new Product();
        invalidProduct.setName(null);
        invalidProduct.setDescription("Descrição Mock");
        invalidProduct.setPrice(2500);

        assertThatThrownBy(() -> productService.createProduct(invalidProduct))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Product name cannot be null or empty");

        verify(productRepository, never()).existsByName(any());
        verify(productRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenCreatingProductWithEmptyName() {
        Product invalidProduct = new Product();
        invalidProduct.setName("");
        invalidProduct.setDescription("Descrição Mock");
        invalidProduct.setPrice(2500);

        assertThatThrownBy(() -> productService.createProduct(invalidProduct))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Product name cannot be null or empty");

        verify(productRepository, never()).existsByName(any());
        verify(productRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenCreatingProductWithNullPrice() {
        Product invalidProduct = new Product();
        invalidProduct.setName("Teste Mock");
        invalidProduct.setDescription("Descrição Mock");
        invalidProduct.setPrice(null);

        assertThatThrownBy(() -> productService.createProduct(invalidProduct))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Product price must be positive");

        verify(productRepository, never()).existsByName(any());
        verify(productRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenCreatingProductWithNegativePrice() {
        Product invalidProduct = new Product();
        invalidProduct.setName("Teste Mock");
        invalidProduct.setDescription("Descrição Mock");
        invalidProduct.setPrice(-100);

        assertThatThrownBy(() -> productService.createProduct(invalidProduct))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Product price must be positive");

        verify(productRepository, never()).existsByName(any());
        verify(productRepository, never()).save(any());
    }

    @Test
    void shouldUpdateProductSuccessfully() {
        Long productId = 1L;
        Product existingProduct = new Product();
        existingProduct.setName("Nome Antigo");
        existingProduct.setDescription("Descrição Antiga");
        existingProduct.setPrice(1500);

        Product updatedProduct = new Product();
        updatedProduct.setName("Teste Mock");
        updatedProduct.setDescription("Descrição Mock");
        updatedProduct.setPrice(2500);

        when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(any(Product.class))).thenReturn(existingProduct);

        Product result = productService.updateProduct(productId, updatedProduct);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Teste Mock");
        assertThat(result.getDescription()).isEqualTo("Descrição Mock");
        assertThat(result.getPrice()).isEqualTo(2500);

        verify(productRepository).findById(productId);
        verify(productRepository).save(existingProduct);
    }

    @Test
    void shouldThrowExceptionWhenUpdatingNonExistentProduct() {
        Long nonExistentId = 999L;
        when(productRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> productService.updateProduct(nonExistentId, validProduct))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Product with ID " + nonExistentId + " not found");

        verify(productRepository).findById(nonExistentId);
        verify(productRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenUpdatingWithInvalidName() {
        Long productId = 1L;
        Product existingProduct = new Product();
        existingProduct.setName("Nome Antigo");
        existingProduct.setDescription("Descrição Antiga");
        existingProduct.setPrice(1500);

        Product invalidUpdate = new Product();
        invalidUpdate.setName(null);
        invalidUpdate.setDescription("Descrição Mock");
        invalidUpdate.setPrice(2500);

        when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));

        assertThatThrownBy(() -> productService.updateProduct(productId, invalidUpdate))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Product name cannot be null or empty");

        verify(productRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenUpdatingWithInvalidPrice() {
        Long productId = 1L;
        Product existingProduct = new Product();
        existingProduct.setName("Nome Antigo");
        existingProduct.setDescription("Descrição Antiga");
        existingProduct.setPrice(1500);

        Product invalidUpdate = new Product();
        invalidUpdate.setName("Teste Mock");
        invalidUpdate.setDescription("Descrição Mock");
        invalidUpdate.setPrice(-100);

        when(productRepository.findById(productId)).thenReturn(Optional.of(existingProduct));

        assertThatThrownBy(() -> productService.updateProduct(productId, invalidUpdate))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Product price must be positive");

        verify(productRepository, never()).save(any());
    }

    @Test
    void shouldGetProductByIdSuccessfully() {
        Long productId = 1L;
        when(productRepository.findById(productId)).thenReturn(Optional.of(validProduct));

        ProductResponseDto result = productService.getProductByID(productId);

        assertThat(result).isNotNull();
        assertThat(result.getName()).isEqualTo("Teste Mock");
        assertThat(result.getDescription()).isEqualTo("Descrição Mock");
        assertThat(result.getPriceInReais()).isEqualTo(25.0);

        verify(productRepository).findById(productId);
    }

    @Test
    void shouldReturnNullWhenProductNotFound() {
        Long nonExistentId = 999L;
        when(productRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        ProductResponseDto result = productService.getProductByID(nonExistentId);

        assertThat(result).isNull();

        verify(productRepository).findById(nonExistentId);
    }

    @Test
    void shouldDeleteProductSuccessfully() {
        Long productId = 1L;
        when(productRepository.findById(productId)).thenReturn(Optional.of(validProduct));

        boolean result = productService.deleteProduct(productId);

        assertThat(result).isTrue();

        verify(productRepository).findById(productId);
        verify(productRepository).delete(validProduct);
    }

    @Test
    void shouldReturnFalseWhenDeletingNonExistentProduct() {
        Long nonExistentId = 999L;
        when(productRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        boolean result = productService.deleteProduct(nonExistentId);

        assertThat(result).isFalse();

        verify(productRepository).findById(nonExistentId);
        verify(productRepository, never()).delete(any());
    }
}
}
