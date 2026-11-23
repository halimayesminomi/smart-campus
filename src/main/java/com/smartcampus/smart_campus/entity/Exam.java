package com.smartcampus.smart_campus.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private String studentId;
    private String course;
    private String examType;    // Midterm, Final, Quiz
    private String totalMarks;
    private String obtainedMarks;
    private String grade;
    private String semester;
    private String examDate;

    public Exam() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getExamType() { return examType; }
    public void setExamType(String examType) { this.examType = examType; }

    public String getTotalMarks() { return totalMarks; }
    public void setTotalMarks(String totalMarks) { this.totalMarks = totalMarks; }

    public String getObtainedMarks() { return obtainedMarks; }
    public void setObtainedMarks(String obtainedMarks) { this.obtainedMarks = obtainedMarks; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public String getExamDate() { return examDate; }
    public void setExamDate(String examDate) { this.examDate = examDate; }
}
