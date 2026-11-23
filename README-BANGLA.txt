SMART CAMPUS MANAGEMENT SYSTEM — SETUP & USER GUIDE
==================================================

এই প্রজেক্টটি একটি ১০০% পিওর Full-Stack Java (Spring Boot 3 + Spring Data JPA + MariaDB) অ্যাপ্লিকেশন।
এটি বিশ্ববিদ্যালয়ের একাডেমিক Java Course-এর চূড়ান্ত প্রজেক্টের জন্য সম্পূর্ণ উপযুক্ত এবং স্ট্যান্ডার্ড আর্কিটেকচার (MVC) মেনে তৈরি।

--------------------------------------------------
নতুন যুক্ত হওয়া ফিচার (Authentication & RBAC):
--------------------------------------------------
১. Login & Registration Authentication (Java Backend - AuthController.java):
   - যে কেউ সরাসরি ওয়েবসাইট ব্যবহার করতে পারবে না; সবার আগে লগইন করতে হবে।
   - নতুন ছাত্র-ছাত্রী বা শিক্ষক নিজের নামে একাউন্ট রেজিস্টার করতে পারবে।

২. Role-Based Dashboard & Control Panel:
   - Admin Login করলে:
     * "ADMINISTRATOR CONTROL PANEL" দেখতে পাবে।
     * সব টেবিলে সম্পূর্ণ CRUD (Add, Edit, Delete) এক্সেস থাকবে।
     * "User Accounts" মেনু থেকে নিবন্ধিত সব ইউজার দেখতে ও ম্যানেজ করতে পারবে।
   - Student Login করলে:
     * "STUDENT PORTAL" দেখতে পাবে।
     * ছাত্র-ছাত্রীদের জন্য আলাদা কাস্টমাইজড ভিউ থাকবে।
     * ডিলিট বা এডিট বাটন হাইড থাকবে যাতে ডেটাবেজের কোনো ক্ষতি না হয়।
     * ছাত্র-ছাত্রীরা কোর্স দেখতে পাবে, লাইব্রেরি বই রিজার্ভ করতে পারবে এবং সরাসরি জবে "Apply Now" করতে পারবে।

৩. ডিফল্ট একাউন্টসমূহ (Default Login Credentials):
   - Admin Login:
     * Username: admin
     * Password: admin123
   - Student Login:
     * Username: student
     * Password: student123
   - Teacher Login:
     * Username: teacher
     * Password: teacher123

--------------------------------------------------
সকল কার্যকর মডিউলসমূহ:
--------------------------------------------------
১. Authentication & Users (/api/auth)
২. Students (/api/students)
৩. Teachers (/api/teachers)
৪. Courses (/api/courses)
৫. Attendance (/api/attendance)
৬. Exams & Results (/api/exams)
৭. Fees (/api/fees)
৮. Library (/api/library)
৯. Jobs (/api/jobs)

--------------------------------------------------
চালু করার সহজ নিয়ম:
--------------------------------------------------
১. XAMPP Control Panel খুলে "MySQL" Start করুন।
২. ব্রাউজারে http://localhost/phpmyadmin ওপেন করে ডাটাবেজ তৈরি করুন:
   CREATE DATABASE IF NOT EXISTS smart_campus_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
৩. smart-campus ফোল্ডারে থাকা RUN-SMART-CAMPUS.bat ফাইলে ডাবল ক্লিক করুন।
৪. ব্রাউজারে ওপেন করুন: http://localhost:8080
৫. ডিফল্ট একাউন্ট দিয়ে লগইন করুন অথবা Create Account দিয়ে নতুন একাউন্ট খুলে ব্যবহার করুন।
