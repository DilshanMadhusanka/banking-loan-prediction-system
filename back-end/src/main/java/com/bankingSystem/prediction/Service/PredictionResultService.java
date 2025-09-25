package com.bankingSystem.prediction.Service;


import com.bankingSystem.prediction.Entity.PredictionResultEntity;
import com.bankingSystem.prediction.Repository.PredictionResultRepository;
import com.bankingSystem.prediction.dto.PredictionResultDTO;
import com.bankingSystem.prediction.dto.PredictionResultViewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class PredictionResultService {

    @Autowired
    private PredictionResultRepository predictionResultRepository;


    public PredictionResultEntity predictionSave(PredictionResultDTO dto) {
        PredictionResultEntity prediction = new PredictionResultEntity();

        prediction.setName(dto.getName());
        prediction.setMobile(dto.getMobile());
        prediction.setDistrict(dto.getDistrict());

        // Prediction details
        PredictionResultDTO.PredictionDetails pd = dto.getPrediction();
        if (pd != null) {
            prediction.setCategory(pd.getCategory());
            prediction.setRiskScore(pd.getRiskScore());
            prediction.setConfidence(pd.getConfidence());
            prediction.setRecommendation(pd.getRecommendation());
            prediction.setFactors(pd.getFactors());
        }

        // Input data
        PredictionResultDTO.InputData input = dto.getInputData();
        if (input != null) {
            prediction.setDueFrequency(input.getDUE_FREQUENCY());
            prediction.setNetRental(input.getNET_RENTAL());
            prediction.setNoOfRental(input.getNO_OF_RENTAL());
            prediction.setAge(input.getAGE());
            prediction.setMaritalStatus(input.getMARITAL_STATUS());
            prediction.setIncome(input.getINCOME());
            prediction.setFinanceAmount(input.getFINANCE_AMOUNT());
            prediction.setCustomerValuation(input.getCUSTOMER_VALUATION());
            prediction.setEffectiveRate(input.getEFFECTIVE_RATE());
            prediction.setCustomerBehavior(input.getCustomer_behavior());
        }

        return predictionResultRepository.save(prediction);
    }

    public List<PredictionResultViewDTO> getAllPredictions() {
        return predictionResultRepository.findAll().stream().map(entity -> {
            PredictionResultViewDTO dto = new PredictionResultViewDTO();
            dto.setName(entity.getName());
            dto.setMobile(entity.getMobile());
            dto.setDistrict(entity.getDistrict());
            dto.setDueFrequency(entity.getDueFrequency());
            dto.setNetRental(entity.getNetRental());
            dto.setNoOfRental(entity.getNoOfRental());
            dto.setAge(entity.getAge());
            dto.setMaritalStatus(entity.getMaritalStatus());
            dto.setIncome(entity.getIncome());
            dto.setFinanceAmount(entity.getFinanceAmount());
            dto.setCustomerValuation(entity.getCustomerValuation());
            dto.setEffectiveRate(entity.getEffectiveRate());
            dto.setCustomerBehavior(entity.getCustomerBehavior());
            dto.setCategory(entity.getCategory());
            dto.setRiskScore(entity.getRiskScore());
            dto.setConfidence(entity.getConfidence());
            dto.setRecommendation(entity.getRecommendation());
            dto.setFactors(entity.getFactors());
            return dto;
        }).collect(Collectors.toList());
    }


}
