package com.bankingSystem.prediction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class PredictionResultDTO {

    private String name;
    private String mobile;
    private String district;

    private PredictionDetails prediction;
    private InputData inputData;

    public static class PredictionDetails {
        private String category;
        private Double riskScore;
        private Double confidence;
        private String recommendation;
        private List<String> factors;
        // Getters & Setters

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public Double getRiskScore() {
            return riskScore;
        }

        public void setRiskScore(Double riskScore) {
            this.riskScore = riskScore;
        }

        public Double getConfidence() {
            return confidence;
        }

        public void setConfidence(Double confidence) {
            this.confidence = confidence;
        }

        public String getRecommendation() {
            return recommendation;
        }

        public void setRecommendation(String recommendation) {
            this.recommendation = recommendation;
        }

        public List<String> getFactors() {
            return factors;
        }

        public void setFactors(List<String> factors) {
            this.factors = factors;
        }
    }



    public static class InputData {
        @JsonProperty("DUE_FREQUENCY")
        private String DUE_FREQUENCY;

        @JsonProperty("NET_RENTAL")
        private Double NET_RENTAL;

        @JsonProperty("NO_OF_RENTAL")
        private Integer NO_OF_RENTAL;

        @JsonProperty("AGE")
        private Integer AGE;

        @JsonProperty("MARITAL_STATUS")
        private String MARITAL_STATUS;

        @JsonProperty("INCOME")
        private Double INCOME;

        @JsonProperty("FINANCE_AMOUNT")
        private Double FINANCE_AMOUNT;

        @JsonProperty("CUSTOMER_VALUATION")
        private Double CUSTOMER_VALUATION;

        @JsonProperty("EFFECTIVE_RATE")
        private Double EFFECTIVE_RATE;

        @JsonProperty("customer_behavior")
        private String customer_behavior;

        public String getDUE_FREQUENCY() {
            return DUE_FREQUENCY;
        }

        public void setDUE_FREQUENCY(String DUE_FREQUENCY) {
            this.DUE_FREQUENCY = DUE_FREQUENCY;
        }

        public Double getNET_RENTAL() {
            return NET_RENTAL;
        }

        public void setNET_RENTAL(Double NET_RENTAL) {
            this.NET_RENTAL = NET_RENTAL;
        }

        public Integer getNO_OF_RENTAL() {
            return NO_OF_RENTAL;
        }

        public void setNO_OF_RENTAL(Integer NO_OF_RENTAL) {
            this.NO_OF_RENTAL = NO_OF_RENTAL;
        }

        public Integer getAGE() {
            return AGE;
        }

        public void setAGE(Integer AGE) {
            this.AGE = AGE;
        }

        public String getMARITAL_STATUS() {
            return MARITAL_STATUS;
        }

        public void setMARITAL_STATUS(String MARITAL_STATUS) {
            this.MARITAL_STATUS = MARITAL_STATUS;
        }

        public Double getINCOME() {
            return INCOME;
        }

        public void setINCOME(Double INCOME) {
            this.INCOME = INCOME;
        }

        public Double getFINANCE_AMOUNT() {
            return FINANCE_AMOUNT;
        }

        public void setFINANCE_AMOUNT(Double FINANCE_AMOUNT) {
            this.FINANCE_AMOUNT = FINANCE_AMOUNT;
        }

        public Double getCUSTOMER_VALUATION() {
            return CUSTOMER_VALUATION;
        }

        public void setCUSTOMER_VALUATION(Double CUSTOMER_VALUATION) {
            this.CUSTOMER_VALUATION = CUSTOMER_VALUATION;
        }

        public Double getEFFECTIVE_RATE() {
            return EFFECTIVE_RATE;
        }

        public void setEFFECTIVE_RATE(Double EFFECTIVE_RATE) {
            this.EFFECTIVE_RATE = EFFECTIVE_RATE;
        }

        public String getCustomer_behavior() {
            return customer_behavior;
        }

        public void setCustomer_behavior(String customer_behavior) {
            this.customer_behavior = customer_behavior;
        }
    }


    // Getters & Setters for PredictionDto

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public PredictionDetails getPrediction() {
        return prediction;
    }

    public void setPrediction(PredictionDetails prediction) {
        this.prediction = prediction;
    }

    public InputData getInputData() {
        return inputData;
    }

    public void setInputData(InputData inputData) {
        this.inputData = inputData;
    }
}

