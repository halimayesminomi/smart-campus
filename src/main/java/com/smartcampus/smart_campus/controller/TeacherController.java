package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.entity.Teacher;
import com.smartcampus.smart_campus.repository.TeacherRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*")
public class TeacherController {

    private final TeacherRepository teacherRepository;

    public TeacherController(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @GetMapping
    public List<Teacher> getAll() { return teacherRepository.findAll(); }

    @GetMapping("/{id}")
    public Teacher getById(@PathVariable Long id) {
        return teacherRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Teacher create(@RequestBody Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @PutMapping("/{id}")
    public Teacher update(@PathVariable Long id, @RequestBody Teacher teacher) {
        return teacherRepository.findById(id).map(existing -> {
            existing.setName(teacher.getName());
            existing.setEmail(teacher.getEmail());
            existing.setPhone(teacher.getPhone());
            existing.setDepartment(teacher.getDepartment());
            existing.setDesignation(teacher.getDesignation());
            existing.setQualification(teacher.getQualification());
            existing.setJoinDate(teacher.getJoinDate());
            if (teacher.getUniversity() != null) existing.setUniversity(teacher.getUniversity());
            return teacherRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        if (!teacherRepository.existsById(id)) return "Not found";
        teacherRepository.deleteById(id);
        return "Deleted";
    }
}
