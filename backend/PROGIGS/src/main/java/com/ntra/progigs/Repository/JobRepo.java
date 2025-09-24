package com.ntra.progigs.Repository;

import com.ntra.progigs.Entity.Jobs;
import com.ntra.progigs.Entity.Proposals;
import com.ntra.progigs.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<Jobs, Integer> {

    Jobs findById(int id);

    List<Jobs> findBySkillsRequired(String skills);

    List<Jobs> findBySkillsRequiredIn(List<String> skills);

    Jobs findByProposals(Proposals proposal);

    List<Jobs> findByUser(User user);
    @Query("SELECT j FROM Jobs j JOIN j.user u JOIN u.profile pp WHERE LOWER(pp.Location) LIKE LOWER(CONCAT('%', :country, '%'))")
    List<Jobs> findByLocation(@Param("country") String country);

    @Query("SELECT DISTINCT j FROM Jobs j " +
            "JOIN j.user u " +
            "JOIN u.profile p " +
            "LEFT JOIN j.skillsRequired s " +
            "WHERE LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(p.Location) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(s) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Jobs> searchJobs(@Param("keyword") String keyword);

}
