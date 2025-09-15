package com.bankingSystem.prediction.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping()
    public String GetUser(){
        return "Hi";
    }

    @PostMapping("/login")
    public String userLogin(){
        return "User Loged in";
    }

}
