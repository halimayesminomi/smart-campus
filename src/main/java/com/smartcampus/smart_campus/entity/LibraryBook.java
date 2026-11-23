package com.smartcampus.smart_campus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "library_books")
public class LibraryBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String isbn;
    private String category;
    private String publisher;
    private String publishYear;
    private String totalCopies;
    private String availableCopies;
    private String status;      // Available, Out of Stock

    public LibraryBook() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }

    public String getPublishYear() { return publishYear; }
    public void setPublishYear(String publishYear) { this.publishYear = publishYear; }

    public String getTotalCopies() { return totalCopies; }
    public void setTotalCopies(String totalCopies) { this.totalCopies = totalCopies; }

    public String getAvailableCopies() { return availableCopies; }
    public void setAvailableCopies(String availableCopies) { this.availableCopies = availableCopies; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
