package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.entity.Student;
import com.smartcampus.smart_campus.entity.Teacher;
import com.smartcampus.smart_campus.entity.User;
import com.smartcampus.smart_campus.repository.StudentRepository;
import com.smartcampus.smart_campus.repository.TeacherRepository;
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
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    public AuthController(UserRepository userRepository, StudentRepository studentRepository, TeacherRepository teacherRepository) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }

    // Automatically sync registered user to Student or Teacher tables in database
    private void syncProfileToCampus(User user, String phone, String designation) {
        if (user == null || user.getEmail() == null) return;
        String role = (user.getRole() != null) ? user.getRole().toUpperCase().trim() : "STUDENT";
        String email = user.getEmail().trim().toLowerCase();
        String name = (user.getFullName() != null && !user.getFullName().trim().isEmpty()) ? user.getFullName() : user.getUsername();
        String dept = (user.getDepartment() != null && !user.getDepartment().trim().isEmpty()) ? user.getDepartment() : "Computer Science & Engineering";
        String uni = (user.getUniversity() != null && !user.getUniversity().trim().isEmpty()) ? user.getUniversity() : "Metropolitan University";
        String sId = (user.getStudentId() != null && !user.getStudentId().trim().isEmpty()) ? user.getStudentId() : ("SC-" + (1000 + Math.abs(email.hashCode() % 9000)));

        if ("STUDENT".equals(role)) {
            if (!studentRepository.existsByEmail(email)) {
                Student s = new Student();
                s.setName(name);
                s.setEmail(email);
                s.setDepartment(dept);
                s.setPhone(phone != null && !phone.trim().isEmpty() ? phone : "+880 1711-000111");
                s.setStudentId(sId);
                s.setUniversity(uni);
                studentRepository.save(s);
            }
        } else if ("TEACHER".equals(role)) {
            if (!teacherRepository.existsByEmail(email)) {
                Teacher t = new Teacher();
                t.setName(name);
                t.setEmail(email);
                t.setPhone(phone != null && !phone.trim().isEmpty() ? phone : "+880 1812-334455");
                t.setDepartment(dept);
                t.setDesignation(designation != null && !designation.trim().isEmpty() ? designation : "Lecturer / Faculty");
                t.setQualification("M.Sc / Ph.D in " + dept);
                t.setJoinDate(java.time.LocalDate.now().toString());
                t.setUniversity(uni);
                teacherRepository.save(t);
            }
        }
    }

    // Login Endpoint (Accepts Master Admin 'omi' OR authentic Gmail addresses)
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String identifier = credentials.get("username"); // username or email
        String password = credentials.get("password");

        Map<String, Object> response = new HashMap<>();

        if (identifier == null || password == null || identifier.trim().isEmpty() || password.trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Gmail address and password are required");
            return ResponseEntity.badRequest().body(response);
        }

        String searchId = identifier.trim();
        boolean isMasterAdmin = "omi".equalsIgnoreCase(searchId) || "halimaomi2002@gmail.com".equalsIgnoreCase(searchId);

        // Enforce authentic Gmail address unless Master Admin 'omi'
        if (!isMasterAdmin && !searchId.toLowerCase().endsWith("@gmail.com")) {
            response.put("success", false);
            response.put("message", "Only authentic Google Gmail accounts (@gmail.com) are allowed to sign in.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

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
                userData.put("university", user.getUniversity());

                response.put("user", userData);
                return ResponseEntity.ok(response);
            }
        }

        response.put("success", false);
        response.put("message", "Invalid Gmail address or password. Please verify your credentials.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    // Google OAuth / Gmail Sign-In Endpoint
    @PostMapping("/google")
    public ResponseEntity<Map<String, Object>> googleAuth(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String fullName = payload.get("fullName");
        String university = payload.get("university");
        String role = payload.get("role");

        Map<String, Object> response = new HashMap<>();

        if (email == null || !email.trim().toLowerCase().endsWith("@gmail.com")) {
            response.put("success", false);
            response.put("message", "Only authentic Google accounts ending with @gmail.com are supported");
            return ResponseEntity.badRequest().body(response);
        }

        String searchEmail = email.trim().toLowerCase();
        Optional<User> existingUser = userRepository.findByEmail(searchEmail);
        User user;

        if (existingUser.isPresent()) {
            user = existingUser.get();
            if (university != null && !university.trim().isEmpty()) {
                user.setUniversity(university);
                userRepository.save(user);
            }
        } else {
            user = new User();
            user.setEmail(searchEmail);
            String baseUser = searchEmail.split("@")[0].replaceAll("[^a-zA-Z0-9_]", "");
            if (baseUser.isEmpty()) baseUser = "google_user";
            String generatedUsername = baseUser;
            if (userRepository.existsByUsername(generatedUsername)) {
                generatedUsername = baseUser + "_" + (System.currentTimeMillis() % 10000);
            }
            user.setUsername(generatedUsername);
            user.setFullName((fullName != null && !fullName.trim().isEmpty()) ? fullName.trim() : generatedUsername);
            user.setPassword("google_auth_secured");

            if ("halimaomi2002@gmail.com".equalsIgnoreCase(searchEmail)) {
                user.setRole("ADMIN");
            } else {
                user.setRole((role != null && !role.trim().isEmpty() && !"ADMIN".equalsIgnoreCase(role)) ? role.toUpperCase() : "STUDENT");
            }

            user.setUniversity((university != null && !university.trim().isEmpty()) ? university : "Metropolitan University");
            user = userRepository.save(user);
        }

        // Automatically create Student/Teacher profile in database
        syncProfileToCampus(user, null, null);

        response.put("success", true);
        response.put("message", "Google authentication successful");

        Map<String, Object> userData = new HashMap<>();
        userData.put("id", user.getId());
        userData.put("username", user.getUsername());
        userData.put("fullName", user.getFullName());
        userData.put("email", user.getEmail());
        userData.put("role", user.getRole());
        userData.put("department", user.getDepartment());
        userData.put("studentId", user.getStudentId());
        userData.put("university", user.getUniversity());
        response.put("user", userData);

        return ResponseEntity.ok(response);
    }

    // Register Endpoint (Requires authentic Gmail address)
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        if (user.getEmail() == null || !user.getEmail().trim().toLowerCase().endsWith("@gmail.com")) {
            response.put("success", false);
            response.put("message", "A valid Gmail address (@gmail.com) is strictly required to register");
            return ResponseEntity.badRequest().body(response);
        }

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

        // SECURITY: Only pre-seeded omi is Master Admin
        String requestedRole = (user.getRole() != null) ? user.getRole().toUpperCase().trim() : "STUDENT";
        if ("ADMIN".equals(requestedRole)) {
            user.setRole("STUDENT");
        } else if ("TEACHER".equals(requestedRole) || "STAFF".equals(requestedRole) || "STUDENT".equals(requestedRole)) {
            user.setRole(requestedRole);
        } else {
            user.setRole("STUDENT");
        }

        if (user.getUniversity() == null || user.getUniversity().trim().isEmpty()) {
            user.setUniversity("Metropolitan University");
        }

        user.setUsername(user.getUsername().trim());
        user.setPassword(user.getPassword().trim());
        if (user.getEmail() != null) user.setEmail(user.getEmail().trim());

        User savedUser = userRepository.save(user);

        // Automatically create Student/Teacher profile in database
        syncProfileToCampus(savedUser, null, null);

        response.put("success", true);
        response.put("message", "Account created successfully. You can now log in with your Gmail or username.");
        
        Map<String, Object> userData = new HashMap<>();
        userData.put("id", savedUser.getId());
        userData.put("username", savedUser.getUsername());
        userData.put("fullName", savedUser.getFullName());
        userData.put("email", savedUser.getEmail());
        userData.put("role", savedUser.getRole());
        userData.put("university", savedUser.getUniversity());
        response.put("user", userData);

        return ResponseEntity.ok(response);
    }

    // List all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Delete a user
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
        if ("ADMIN".equalsIgnoreCase(u.getRole()) || "omi".equalsIgnoreCase(u.getUsername())) {
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
