package com.ntra.progigs.Repository;

import com.ntra.progigs.Entity.Review;
import com.ntra.progigs.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Integer> {


    List<Review> findByUser(User user);
}
