package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.entity.LibraryBook;
import com.smartcampus.smart_campus.repository.LibraryBookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library")
@CrossOrigin(origins = "*")
public class LibraryController {

    private final LibraryBookRepository libraryBookRepository;

    public LibraryController(LibraryBookRepository libraryBookRepository) {
        this.libraryBookRepository = libraryBookRepository;
    }

    @GetMapping
    public List<LibraryBook> getAll() { return libraryBookRepository.findAll(); }

    @GetMapping("/{id}")
    public LibraryBook getById(@PathVariable Long id) {
        return libraryBookRepository.findById(id).orElse(null);
    }

    @PostMapping
    public LibraryBook create(@RequestBody LibraryBook book) {
        return libraryBookRepository.save(book);
    }

    @PutMapping("/{id}")
    public LibraryBook update(@PathVariable Long id, @RequestBody LibraryBook book) {
        return libraryBookRepository.findById(id).map(existing -> {
            existing.setTitle(book.getTitle());
            existing.setAuthor(book.getAuthor());
            existing.setIsbn(book.getIsbn());
            existing.setCategory(book.getCategory());
            existing.setPublisher(book.getPublisher());
            existing.setPublishYear(book.getPublishYear());
            existing.setTotalCopies(book.getTotalCopies());
            existing.setAvailableCopies(book.getAvailableCopies());
            existing.setStatus(book.getStatus());
            return libraryBookRepository.save(existing);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        if (!libraryBookRepository.existsById(id)) return "Not found";
        libraryBookRepository.deleteById(id);
        return "Deleted";
    }
}
