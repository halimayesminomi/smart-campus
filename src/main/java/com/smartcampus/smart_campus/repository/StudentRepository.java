
package com.smartcampus.smart_campus.repository;

import com.smartcampus.smart_campus.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
