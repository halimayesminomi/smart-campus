package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.entity.Fee;
import com.smartcampus.smart_campus.repository.FeeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "*")
public class FeeController {

    private final FeeRepository feeRepository;

    public FeeController(FeeRepository feeRepository) {
        this.feeRepository = feeRepository;
    }

    @GetMapping
    public List<Fee> getAll() { return feeRepository.findAll(); }

    @GetMapping("/{id}")
    public Fee getById(@PathVariable Long id) {
        return feeRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Fee create(@RequestBody Fee fee) {
        return feeRepository.save(fee);
    }

    @PutMapping("/{id}")
    public Fee update(@PathVariable Long id, @RequestBody Fee fee) {
        return feeRepository.findById(id).map(existing -> {
            existing.setStudentName(fee.getStudentName());
            existing.setStudentId(fee.getStudentId());
            existing.setFeeType(fee.getFeeType());
            existing.setAmount(fee.getAmount());
            existing.setDueDate(fee.getDueDate());
            existing.setPaidDate(fee.getPaidDate());
            existing.setStatus(fee.getStatus());
            return feeRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        if (!feeRepository.existsById(id)) return "Not found";
        feeRepository.deleteById(id);
        return "Deleted";
    }
}
