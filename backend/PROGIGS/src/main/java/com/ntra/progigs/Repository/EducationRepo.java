package com.ntra.progigs.Repository;

import com.ntra.progigs.Entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepo extends JpaRepository<Education, Integer> {
}
