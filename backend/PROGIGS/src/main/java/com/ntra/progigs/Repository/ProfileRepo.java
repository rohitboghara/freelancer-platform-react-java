package com.ntra.progigs.Repository;

import com.ntra.progigs.Entity.Profile;
import com.ntra.progigs.Entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileRepo extends JpaRepository<Profile, Integer> {
    Optional<Profile> findByUser(User user);

    @Query("SELECT p FROM Profile p WHERE LOWER(p.Location) LIKE LOWER(CONCAT('%', :country, '%'))")
    List<Profile> findByCountry(String country);

    Profile findByEmail(String email);

    boolean existsByEmail(String email);






//    List<Profile> findAllByLocation(String location);
}
