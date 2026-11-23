package com.smartcampus.smart_campus;

import com.smartcampus.smart_campus.entity.*;
import com.smartcampus.smart_campus.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SmartCampusApplication {

    public static void main(String[] args) {
        SpringApplication.run(SmartCampusApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(UserRepository userRepository,
                                      StudentRepository studentRepository,
                                      TeacherRepository teacherRepository,
                                      CourseRepository courseRepository,
                                      JobRepository jobRepository) {
        return args -> {
            // Seed Master Admin account (Exclusive control panel access)
            if (!userRepository.existsByUsername("admin_omi")) {
                User admin = new User("admin_omi", "Admin@2026#Smart", "Halima Yesmin (Administrator)", "halimaomi2002@gmail.com", "ADMIN", "Administration", "ADM-MASTER-01");
                userRepository.save(admin);
            }
            // Backward-compatible admin alias
            if (!userRepository.existsByUsername("admin")) {
                User admin2 = new User("admin", "Admin@2026#Smart", "System Admin", "admin@smartcampus.edu", "ADMIN", "Administration", "ADM-001");
                userRepository.save(admin2);
            }

            // Seed sample Student account
            if (!userRepository.existsByUsername("student")) {
                User student = new User("student", "student123", "Tanvir Ahmed", "tanvir.student@gmail.com", "STUDENT", "Computer Science", "CSE-2024-001");
                userRepository.save(student);
            }

            // Seed sample Teacher account
            if (!userRepository.existsByUsername("teacher")) {
                User teacher = new User("teacher", "teacher123", "Dr. Ayesha Siddiqa", "ayesha.teacher@gmail.com", "TEACHER", "Computer Science", "FAC-005");
                userRepository.save(teacher);
            }

            // Seed sample Staff/Worker account
            if (!userRepository.existsByUsername("staff")) {
                User staff = new User("staff", "staff123", "Md. Karim Uddin", "karim.staff@gmail.com", "STAFF", "Campus Operations", "STF-102");
                userRepository.save(staff);
            }

            // Sample Course
            if (courseRepository.count() == 0) {
                Course c1 = new Course();
                c1.setCode("CSE-301");
                c1.setName("Object Oriented Programming with Java");
                c1.setDepartment("Computer Science");
                c1.setTeacherName("Dr. Ayesha Siddiqa");
                c1.setCreditHours("3.0");
                c1.setSemester("Fall 2026");
                c1.setSchedule("Sun/Tue 10:00 AM");
                c1.setStatus("Active");
                courseRepository.save(c1);

                Course c2 = new Course();
                c2.setCode("CSE-305");
                c2.setName("Database Management Systems");
                c2.setDepartment("Computer Science");
                c2.setTeacherName("Prof. Kamal Hossain");
                c2.setCreditHours("3.0");
                c2.setSemester("Fall 2026");
                c2.setSchedule("Mon/Wed 11:30 AM");
                c2.setStatus("Active");
                courseRepository.save(c2);
            }

            // Sample Job
            if (jobRepository.count() == 0) {
                Job j1 = new Job();
                j1.setTitle("Junior Java Developer");
                j1.setCompany("Brain Station 23");
                j1.setLocation("Dhaka, Bangladesh");
                j1.setType("Full-time");
                j1.setSalary("35,000 - 45,000 BDT");
                j1.setDeadline("2026-12-30");
                j1.setStatus("Open");
                j1.setDescription("Seeking a motivated Junior Java Developer with Spring Boot and SQL skills.");
                jobRepository.save(j1);

                Job j2 = new Job();
                j2.setTitle("Campus IT Support Intern");
                j2.setCompany("Smart Campus IT Center");
                j2.setLocation("On-Campus");
                j2.setType("Internship");
                j2.setSalary("15,000 BDT");
                j2.setDeadline("2026-12-15");
                j2.setStatus("Open");
                j2.setDescription("Hands-on internship assisting network and workstation maintenance.");
                jobRepository.save(j2);
            }
        };
    }
}
