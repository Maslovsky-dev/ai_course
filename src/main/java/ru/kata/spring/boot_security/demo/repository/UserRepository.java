package ru.kata.spring.boot_security.demo.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @EntityGraph(attributePaths = {"roles"})
    List<User> findAll();

    @EntityGraph(attributePaths = {"roles"})
    Optional<User> findById(Long id);

    @EntityGraph(attributePaths = {"roles"})
    Optional<User> findByEmail(String email);
}
