package com.bankingSystem.prediction.dto;

import java.util.List;

public class LLMResultDTO {

    private String risk_category;
    private double confidence;
    private String recommendation;
    private List<String> factors;

    public String getRisk_category() { return risk_category; }
    public void setRisk_category(String risk_category) { this.risk_category = risk_category; }

    public double getConfidence() { return confidence; }
    public void setConfidence(double confidence) { this.confidence = confidence; }

    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation; }

    public List<String> getFactors() { return factors; }
    public void setFactors(List<String> factors) { this.factors = factors; }
}