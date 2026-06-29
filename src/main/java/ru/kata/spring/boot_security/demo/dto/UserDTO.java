package ru.kata.spring.boot_security.demo.dto;

import jakarta.validation.constraints.*;

import java.util.HashSet;
import java.util.Set;

public class UserDTO {

    private Long id;

    @NotBlank(message = "Имя не должно быть пустым")
    @Size(min = 2, max = 30, message = "Имя должно быть от 2 до 30 символов")
    private String firstName;

    @NotBlank(message = "Фамилия не должна быть пустой")
    @Size(min = 2, max = 30, message = "Фамилия должна быть от 2 до 30 символов")
    private String lastName;

    @NotNull(message = "Возраст не должен быть пустым")
    @Min(value = 18, message = "Пользоваться сервисом можно только с 18 лет")
    @Max(value = 150, message = "Возраст превышает допустимый")
    private Integer age;

    @NotBlank(message = "Электронная почта не должна быть пустой")
    @Email(message = "Некорректный формат электронной почты")
    @Size(max = 100, message = "Электронная почта не должна превышать 100 символов")
    private String email;

    @NotBlank(message = "Пароль не должен быть пустым")
    @Size(min = 8, max = 100, message = "Пароль должен быть от 8 до 100 символов")
    private String password;

    @NotEmpty(message = "Необходимо выбрать хотя бы одну роль")
    private Set<RoleDTO> roles = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<RoleDTO> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleDTO> roles) {
        this.roles = roles;
    }
}
