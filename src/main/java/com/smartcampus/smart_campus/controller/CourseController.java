package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.entity.Course;
import com.smartcampus.smart_campus.repository.CourseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseRepository courseRepository;

    public CourseController(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @GetMapping
    public List<Course> getAll() { return courseRepository.findAll(); }

    @GetMapping("/{id}")
    public Course getById(@PathVariable Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Course create(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable Long id, @RequestBody Course course) {
        return courseRepository.findById(id).map(existing -> {
            existing.setCode(course.getCode());
            existing.setName(course.getName());
            existing.setDepartment(course.getDepartment());
            existing.setTeacherName(course.getTeacherName());
            existing.setCreditHours(course.getCreditHours());
            existing.setSemester(course.getSemester());
            existing.setSchedule(course.getSchedule());
            existing.setStatus(course.getStatus());
            return courseRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        if (!courseRepository.existsById(id)) return "Not found";
        courseRepository.deleteById(id);
        return "Deleted";
    }
}
