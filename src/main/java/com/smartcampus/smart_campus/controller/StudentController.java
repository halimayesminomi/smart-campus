
package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.entity.Student;
import com.smartcampus.smart_campus.repository.StudentRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Add Student
    @PostMapping
    public Student addStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // Get All Students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get Student By ID
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    // Update Student
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id,
                                 @RequestBody Student student) {
        return studentRepository.findById(id).map(existingStudent -> {
            existingStudent.setName(student.getName());
            existingStudent.setEmail(student.getEmail());
            existingStudent.setDepartment(student.getDepartment());
            existingStudent.setPhone(student.getPhone());
            if (student.getStudentId() != null) existingStudent.setStudentId(student.getStudentId());
            if (student.getUniversity() != null) existingStudent.setUniversity(student.getUniversity());
            return studentRepository.save(existingStudent);
        }).orElse(null);
    }

    // Delete Student
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable Long id) {
        if (!studentRepository.existsById(id)) {
            return "Student not found";
        }
        studentRepository.deleteById(id);
        return "Student deleted successfully";
    }
}
