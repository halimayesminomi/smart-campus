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

    // Login Endpoint (Accepts Username OR Gmail/Email)
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String identifier = credentials.get("username"); // can be username or gmail
        String password = credentials.get("password");

        Map<String, Object> response = new HashMap<>();

        if (identifier == null || password == null || identifier.trim().isEmpty() || password.trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Username/Gmail and password are required");
            return ResponseEntity.badRequest().body(response);
        }

        String searchId = identifier.trim();
        Optional<User> userOpt = userRepository.findByUsernameOrEmail(searchId, searchId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password.trim())) {
                response.put("success", true);
                response.put("message", "Login successful");
                
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
        response.put("message", "Invalid username/Gmail or password");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    // Register Endpoint (For Teachers, Students, Staff)
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
            response.put("message", "This Gmail/Email address is already registered");
            return ResponseEntity.badRequest().body(response);
        }

        // SECURITY: Public registration CANNOT create an ADMIN account!
        // Admin is strictly reserved for the owner.
        String requestedRole = (user.getRole() != null) ? user.getRole().toUpperCase().trim() : "STUDENT";
        if ("ADMIN".equals(requestedRole)) {
            user.setRole("STUDENT"); // prevent privilege escalation
        } else if ("TEACHER".equals(requestedRole) || "STAFF".equals(requestedRole) || "STUDENT".equals(requestedRole)) {
            user.setRole(requestedRole);
        } else {
            user.setRole("STUDENT");
        }

        user.setUsername(user.getUsername().trim());
        user.setPassword(user.getPassword().trim());
        if (user.getEmail() != null) user.setEmail(user.getEmail().trim());

        User savedUser = userRepository.save(user);

        response.put("success", true);
        response.put("message", "Account created successfully. You can now log in with your Gmail or username.");
        
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", savedUser.getId());
        userData.put("username", savedUser.getUsername());
        userData.put("fullName", savedUser.getFullName());
        userData.put("email", savedUser.getEmail());
        userData.put("role", savedUser.getRole());
        response.put("user", userData);

        return ResponseEntity.ok(response);
    }

    // List all users (Only for Admin control panel)
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Delete a user (Admin control)
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            response.put("success", false);
            response.put("message", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        User u = userOpt.get();
        if ("ADMIN".equalsIgnoreCase(u.getRole())) {
            response.put("success", false);
            response.put("message", "Master Admin account cannot be deleted");
            return ResponseEntity.badRequest().body(response);
        }

        userRepository.deleteById(id);
        response.put("success", true);
        response.put("message", "User deleted successfully");
        return ResponseEntity.ok(response);
    }

    // Logout
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logged out successfully");
        return ResponseEntity.ok(response);
    }
}
