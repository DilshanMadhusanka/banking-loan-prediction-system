package com.bankingSystem.prediction.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "predictions-results")
public class PredictionResultEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String mobile;
    private String district;

    private String dueFrequency;
    private Double netRental;
    private Integer noOfRental;
    private Integer age;
    private String maritalStatus;
    private Double income;
    private Double financeAmount;
    private Double customerValuation;
    private Double effectiveRate;
    private String customerBehavior;

    private String category;
    private Double riskScore;
    private Double confidence;
    @Column(length = 1000)
    private String recommendation;

    @ElementCollection
    @CollectionTable(name = "prediction_factors", joinColumns = @JoinColumn(name = "prediction_id"))
    @Column(name = "factor")
    private List<String> factors;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getDueFrequency() {
        return dueFrequency;
    }

    public void setDueFrequency(String dueFrequency) {
        this.dueFrequency = dueFrequency;
    }

    public Double getNetRental() {
        return netRental;
    }

    public void setNetRental(Double netRental) {
        this.netRental = netRental;
    }

    public Integer getNoOfRental() {
        return noOfRental;
    }

    public void setNoOfRental(Integer noOfRental) {
        this.noOfRental = noOfRental;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public Double getFinanceAmount() {
        return financeAmount;
    }

    public void setFinanceAmount(Double financeAmount) {
        this.financeAmount = financeAmount;
    }

    public Double getCustomerValuation() {
        return customerValuation;
    }

    public void setCustomerValuation(Double customerValuation) {
        this.customerValuation = customerValuation;
    }

    public Double getEffectiveRate() {
        return effectiveRate;
    }

    public void setEffectiveRate(Double effectiveRate) {
        this.effectiveRate = effectiveRate;
    }

    public String getCustomerBehavior() {
        return customerBehavior;
    }

    public void setCustomerBehavior(String customerBehavior) {
        this.customerBehavior = customerBehavior;
    }

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

    // Getters and Setters
    // ... (you can generate using Lombok or IDE)
}
