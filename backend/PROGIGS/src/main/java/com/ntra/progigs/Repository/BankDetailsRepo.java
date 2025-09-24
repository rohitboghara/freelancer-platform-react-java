package com.ntra.progigs.Repository;

import com.ntra.progigs.Entity.BankDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankDetailsRepo extends JpaRepository<BankDetails, Integer> {
}
