package com.bankingSystem.prediction.Repository;

import com.bankingSystem.prediction.Entity.LoanDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanDataRepository  extends JpaRepository<LoanDataEntity, Long> {

}
