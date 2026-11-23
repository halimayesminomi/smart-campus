package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.entity.Exam;
import com.smartcampus.smart_campus.repository.ExamRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "*")
public class ExamController {

    private final ExamRepository examRepository;

    public ExamController(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    @GetMapping
    public List<Exam> getAll() { return examRepository.findAll(); }

    @GetMapping("/{id}")
    public Exam getById(@PathVariable Long id) {
        return examRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Exam create(@RequestBody Exam exam) {
        return examRepository.save(exam);
    }

    @PutMapping("/{id}")
    public Exam update(@PathVariable Long id, @RequestBody Exam exam) {
        return examRepository.findById(id).map(existing -> {
            existing.setStudentName(exam.getStudentName());
            existing.setStudentId(exam.getStudentId());
            existing.setCourse(exam.getCourse());
            existing.setExamType(exam.getExamType());
            existing.setTotalMarks(exam.getTotalMarks());
            existing.setObtainedMarks(exam.getObtainedMarks());
            existing.setGrade(exam.getGrade());
            existing.setSemester(exam.getSemester());
            existing.setExamDate(exam.getExamDate());
            return examRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        if (!examRepository.existsById(id)) return "Not found";
        examRepository.deleteById(id);
        return "Deleted";
    }
}
