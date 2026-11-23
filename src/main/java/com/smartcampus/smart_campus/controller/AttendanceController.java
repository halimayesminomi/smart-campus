package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.entity.Attendance;
import com.smartcampus.smart_campus.repository.AttendanceRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;

    public AttendanceController(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    @GetMapping
    public List<Attendance> getAll() { return attendanceRepository.findAll(); }

    @GetMapping("/{id}")
    public Attendance getById(@PathVariable Long id) {
        return attendanceRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Attendance create(@RequestBody Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    @PutMapping("/{id}")
    public Attendance update(@PathVariable Long id, @RequestBody Attendance attendance) {
        return attendanceRepository.findById(id).map(existing -> {
            existing.setStudentName(attendance.getStudentName());
            existing.setStudentId(attendance.getStudentId());
            existing.setCourse(attendance.getCourse());
            existing.setDate(attendance.getDate());
            existing.setStatus(attendance.getStatus());
            return attendanceRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        if (!attendanceRepository.existsById(id)) return "Not found";
        attendanceRepository.deleteById(id);
        return "Deleted";
    }
}
