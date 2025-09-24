package com.ntra.progigs.Repository;

import com.ntra.progigs.Entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestoneRepo extends JpaRepository<Module, Integer> {
}
