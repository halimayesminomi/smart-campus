package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.entity.User;
import com.smartcampus.smart_campus.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Map<String, Object> response = new HashMap<>();

        if (username == null || password == null) {
            response.put("success", false);
            response.put("message", "Username and password are required");
            return ResponseEntity.badRequest().body(response);
        }

        Optional<User> userOpt = userRepository.findByUsername(username.trim());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password.trim())) {
                response.put("success", true);
                response.put("message", "Login successful");
                
                // Do not expose password in response
                Map<String, Object> userData = new HashMap<>();
                userData.put("id", user.getId());
                userData.put("username", user.getUsername());
                userData.put("fullName", user.getFullName());
                userData.put("email", user.getEmail());
                userData.put("role", user.getRole());
                userData.put("department", user.getDepartment());
                userData.put("studentId", user.getStudentId());

                response.put("user", userData);
                return ResponseEntity.ok(response);
            }
        }

        response.put("success", false);
        response.put("message", "Invalid username or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    // Register Endpoint
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Username is required");
            return ResponseEntity.badRequest().body(response);
        }

        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Password is required");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepository.existsByUsername(user.getUsername().trim())) {
            response.put("success", false);
            response.put("message", "Username is already taken");
            return ResponseEntity.badRequest().body(response);
        }

        if (user.getEmail() != null && !user.getEmail().trim().isEmpty() && userRepository.existsByEmail(user.getEmail().trim())) {
            response.put("success", false);
            response.put("message", "Email is already registered");
            return ResponseEntity.badRequest().body(response);
        }

        // Default role is STUDENT if not provided or invalid
        if (user.getRole() == null || user.getRole().trim().isEmpty()) {
            user.setRole("STUDENT");
        } else {
            user.setRole(user.getRole().toUpperCase().trim());
        }

        user.setUsername(user.getUsername().trim());
        user.setPassword(user.getPassword().trim());
        User savedUser = userRepository.save(user);

        response.put("success", true);
        response.put("message", "Registration successful. You can now log in.");
        
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", savedUser.getId());
        userData.put("username", savedUser.getUsername());
        userData.put("fullName", savedUser.getFullName());
        userData.put("role", savedUser.getRole());
        response.put("user", userData);

        return ResponseEntity.ok(response);
    }

    // List all users for Admin
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Delete a user (Admin control)
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        if (!userRepository.existsById(id)) {
            response.put("success", false);
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        userRepository.deleteById(id);
        response.put("success", true);
        response.put("message", "User deleted successfully");
        return ResponseEntity.ok(response);
    }

    // Logout endpoint
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }
}
