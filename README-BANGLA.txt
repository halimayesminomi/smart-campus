SMART CAMPUS MANAGEMENT SYSTEM — SETUP & USER GUIDE
==================================================

এই প্রজেক্টটি একটি ১০০% পিওর Full-Stack Java (Spring Boot 3 + MariaDB) অ্যাপ্লিকেশন।
সকল ফিচার এখন পুরোপুরি সচল ও ডেটাবেজ-সংযুক্ত (Full CRUD Functional):

১. Students (ছাত্র-ছাত্রীদের তথ্য যোগ, এডিট, ডিলিট, সার্চ, ফিল্টার)
২. Teachers (শিক্ষক ও ফ্যাকাল্টি ম্যানেজমেন্ট)
৩. Courses (কোর্স, ক্রেডিট ও শিডিউল)
৪. Attendance (উপস্থিতি ট্র্যাকিং - Present, Absent, Late)
৫. Exams & Results (পরীক্ষার ফলাফল, মার্কস ও গ্রেড)
৬. Fees (ফি আদায় ও ট্র্যাকিং - Paid, Unpaid, Partial)
৭. Library (বইয়ের স্টক ও কপি ট্র্যাকিং)
৮. Jobs (ক্যাম্পাস ক্যারিয়ার পোর্টাল ও জব পোস্টিং)

--------------------------------------------------
প্রয়োজনীয় সফটওয়্যার:
--------------------------------------------------
- Java JDK 21 (অথবা ১৭+)
- XAMPP (MySQL / MariaDB)
- VS Code অথবা IntelliJ IDEA

--------------------------------------------------
চালু করার সহজ নিয়ম:
--------------------------------------------------
১. XAMPP Control Panel খুলে "MySQL" Start করুন।
২. ব্রাউজারে http://localhost/phpmyadmin ওপেন করুন।
৩. "SQL" ট্যাবে গিয়ে নিচের কোডটি রান করুন:
   CREATE DATABASE IF NOT EXISTS smart_campus_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
৪. smart-campus ফোল্ডারে টার্মিনাল ওপেন করে রান করুন:
   .\mvnw.cmd spring-boot:run
   (অথবা ডাবল ক্লিক করুন: RUN-SMART-CAMPUS.bat)
৫. টার্মিনালে "Started SmartCampusApplication" দেখালে ব্রাউজারে ওপেন করুন:
   http://localhost:8080

--------------------------------------------------
API Endpoints (Java Spring Boot Controllers):
--------------------------------------------------
- /api/students
- /api/teachers
- /api/courses
- /api/attendance
- /api/exams
- /api/fees
- /api/library
- /api/jobs
