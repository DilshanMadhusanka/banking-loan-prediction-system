package com.bankingSystem.prediction.Repository;

import com.bankingSystem.prediction.Entity.LoanDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanDataRepository extends JpaRepository<LoanDataEntity, Integer> {

}
