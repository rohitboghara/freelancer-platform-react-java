package com.ntra.progigs.Repository;

import com.ntra.progigs.Entity.Certificates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificateRepo extends JpaRepository<Certificates, Integer> {
}
