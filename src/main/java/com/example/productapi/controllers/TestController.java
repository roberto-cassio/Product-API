package com.example.productapi.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class TestController {

    @GetMapping("/api/test")
    public String testar() {
        return "API está funcional!";
    }
}