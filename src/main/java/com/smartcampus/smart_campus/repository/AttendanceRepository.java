package com.smartcampus.smart_campus.repository;

import com.smartcampus.smart_campus.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {}
