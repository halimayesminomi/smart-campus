package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.entity.Job;
import com.smartcampus.smart_campus.repository.JobRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    private final JobRepository jobRepository;

    public JobController(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @GetMapping
    public List<Job> getAll() {
        return jobRepository.findAll();
    }

    @GetMapping("/{id}")
    public Job getById(@PathVariable Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Job create(@RequestBody Job job) {
        return jobRepository.save(job);
    }

    @PutMapping("/{id}")
    public Job update(@PathVariable Long id, @RequestBody Job job) {
        return jobRepository.findById(id).map(existing -> {
            existing.setTitle(job.getTitle());
            existing.setCompany(job.getCompany());
            existing.setLocation(job.getLocation());
            existing.setType(job.getType());
            existing.setDescription(job.getDescription());
            existing.setSalary(job.getSalary());
            existing.setDeadline(job.getDeadline());
            existing.setStatus(job.getStatus());
            return jobRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        if (!jobRepository.existsById(id)) return "Not found";
        jobRepository.deleteById(id);
        return "Deleted";
    }
}
