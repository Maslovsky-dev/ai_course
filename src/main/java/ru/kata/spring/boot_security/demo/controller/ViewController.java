package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@Controller
public class ViewController {

    private final UserService userService;

    @Autowired
    public ViewController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String adminPage(@AuthenticationPrincipal UserDetails currentUser, Model model) {
        User authUser = userService.findById(((User) currentUser).getId());
        model.addAttribute("authUser", authUser);
        return "admin";
    }

    @GetMapping("/user")
    public String userPage(@AuthenticationPrincipal UserDetails currentUser, Model model) {
        User authUser = userService.findById(((User) currentUser).getId());
        model.addAttribute("authUser", authUser);
        return "user";
    }
}
