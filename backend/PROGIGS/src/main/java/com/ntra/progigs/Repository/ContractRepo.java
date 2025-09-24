package com.ntra.progigs.Repository;

import com.ntra.progigs.Entity.Contract;
import com.ntra.progigs.Entity.ContractStatus;
import com.ntra.progigs.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepo extends JpaRepository<Contract,Integer> {

    List<Contract> findAllByFreelancer(User user);

    List<Contract> findAllByClient(User user);
    List<Contract> findAllByClientAndStatus(@Param("user") User user, @Param("status") ContractStatus status);
    List<Contract> findAllByFreelancerAndStatus(@Param("user") User user, @Param("status") ContractStatus status);
}
