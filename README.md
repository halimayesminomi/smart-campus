# 🎓 Smart Campus Management System

A full-stack **Java Spring Boot** campus management web application with a modern dark-themed UI.

## ✨ Features

| Module | Description |
|---|---|
| 👨‍🎓 **Students** | Add, edit, delete student records with search & filter |
| 👨‍🏫 **Teachers** | Manage faculty with designation and department |
| 📚 **Courses** | Track courses, credit hours, schedules |
| ⏰ **Attendance** | Log student attendance (Present/Absent/Late) |
| 📝 **Exams & Results** | Record exam results and grades |
| 💰 **Fees** | Track fee payments (Paid/Unpaid/Partial) |
| 📖 **Library** | Manage book inventory |
| 💼 **Jobs** | Post job listings for students |

## 🛠 Tech Stack

- **Backend**: Spring Boot 3.3, Spring Data JPA, REST APIs
- **Database**: MariaDB (via XAMPP)
- **Frontend**: Vanilla HTML, CSS, JavaScript (no framework needed)
- **Build**: Maven

## 🚀 Setup & Run

### Prerequisites
- Java 21+
- XAMPP (MariaDB running on port 3306)
- Maven

### Steps

1. **Start XAMPP** → Start MariaDB/MySQL

2. **Create database**:
   ```sql
   CREATE DATABASE smart_campus_db;
   ```

3. **Run the app**:
   ```bash
   cd "new jv cd/smart-campus"
   ./mvnw spring-boot:run
   ```

4. **Open browser**: [http://localhost:8080](http://localhost:8080)

## 📡 API Endpoints

| Resource | Base URL |
|---|---|
| Students | `/api/students` |
| Teachers | `/api/teachers` |
| Courses | `/api/courses` |
| Attendance | `/api/attendance` |
| Exams | `/api/exams` |
| Fees | `/api/fees` |
| Library | `/api/library` |
| Jobs | `/api/jobs` |

All endpoints support `GET`, `POST`, `PUT/{id}`, `DELETE/{id}`.

## 📸 Screenshots

The app features a beautiful dark-themed sidebar layout with:
- Dashboard with live stats across all modules
- Full CRUD modals for every entity
- Real-time search and filtering
- Responsive mobile layout

---
Built with ❤️ using Spring Boot + MariaDB
