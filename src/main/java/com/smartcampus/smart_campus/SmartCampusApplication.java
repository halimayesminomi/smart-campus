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
            // Master Admin account requested by user: omi / Omi@2026
            userRepository.findByUsername("omi").ifPresentOrElse(admin -> {
                admin.setPassword("Omi@2026");
                admin.setRole("ADMIN");
                admin.setUniversity("Metropolitan University");
                userRepository.save(admin);
            }, () -> {
                User admin = new User("omi", "Omi@2026", "Omi (Master Administrator)", "halimaomi2002@gmail.com", "ADMIN", "Administration", "ADM-OMI-01", "Metropolitan University");
                userRepository.save(admin);
            });

            // Backward compatible alias
            if (!userRepository.existsByUsername("admin")) {
                User admin2 = new User("admin", "Omi@2026", "Omi (Administrator)", "admin@smartcampus.edu", "ADMIN", "Administration", "ADM-001", "Metropolitan University");
                userRepository.save(admin2);
            }

            // Seed sample Student account for Metropolitan University
            if (!userRepository.existsByUsername("student")) {
                User student = new User("student", "student123", "Tanvir Ahmed", "tanvir.student@gmail.com", "STUDENT", "Computer Science & Engineering", "MU-2024-001", "Metropolitan University");
                userRepository.save(student);
            }

            // Seed sample Teacher account for Metropolitan University
            if (!userRepository.existsByUsername("teacher")) {
                User teacher = new User("teacher", "teacher123", "Dr. Ayesha Siddiqa", "ayesha.teacher@gmail.com", "TEACHER", "Computer Science & Engineering", "FAC-MU-005", "Metropolitan University");
                userRepository.save(teacher);
            }

            // Seed sample Staff account
            if (!userRepository.existsByUsername("staff")) {
                User staff = new User("staff", "staff123", "Md. Karim Uddin", "karim.staff@gmail.com", "STAFF", "Campus Operations", "STF-MU-102", "Metropolitan University");
                userRepository.save(staff);
            }

            // Sample Course for Metropolitan University
            if (courseRepository.count() == 0) {
                Course c1 = new Course();
                c1.setCode("CSE-301");
                c1.setName("Object Oriented Programming with Java");
                c1.setDepartment("Computer Science & Engineering");
                c1.setTeacherName("Dr. Ayesha Siddiqa");
                c1.setCreditHours("3.0");
                c1.setSemester("Fall 2026");
                c1.setSchedule("Sun/Tue 10:00 AM (Room 402, MU Academic Bldg)");
                c1.setStatus("Active");
                courseRepository.save(c1);

                Course c2 = new Course();
                c2.setCode("CSE-305");
                c2.setName("Database Management Systems");
                c2.setDepartment("Computer Science & Engineering");
                c2.setTeacherName("Prof. Kamal Hossain");
                c2.setCreditHours("3.0");
                c2.setSemester("Fall 2026");
                c2.setSchedule("Mon/Wed 11:30 AM (Lab 2, MU)");
                c2.setStatus("Active");
                courseRepository.save(c2);
            }

            // Sample Jobs at Metropolitan University
            if (jobRepository.count() == 0) {
                Job j1 = new Job();
                j1.setTitle("Junior Java & Spring Boot Developer");
                j1.setCompany("Brain Station 23 (Campus Recruitment)");
                j1.setLocation("Sylhet / Dhaka, Bangladesh");
                j1.setType("Full-time");
                j1.setSalary("35,000 - 45,000 BDT");
                j1.setDeadline("2026-12-30");
                j1.setStatus("Open");
                j1.setDescription("Campus placement hiring for Metropolitan University graduating students with Java skills.");
                jobRepository.save(j1);

                Job j2 = new Job();
                j2.setTitle("Metropolitan University IT Lab Assistant");
                j2.setCompany("Metropolitan University IT Center");
                j2.setLocation("Metropolitan University, Sylhet");
                j2.setType("Internship");
                j2.setSalary("15,000 BDT / month");
                j2.setDeadline("2026-12-15");
                j2.setStatus("Open");
                j2.setDescription("Student assistant for Metropolitan University computer labs and network maintenance.");
                jobRepository.save(j2);
            }
        };
    }
}
