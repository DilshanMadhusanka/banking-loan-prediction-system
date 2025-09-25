package com.bankingSystem.prediction.Repository;


import com.bankingSystem.prediction.Entity.PredictionResultEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface PredictionResultRepository extends JpaRepository<PredictionResultEntity, Long> {

}


