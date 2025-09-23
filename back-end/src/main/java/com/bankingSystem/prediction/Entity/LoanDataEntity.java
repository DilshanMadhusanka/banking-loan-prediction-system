package com.bankingSystem.prediction.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "bank_data")
public class LoanDataEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
    @Column(length = 255)
    private String contractStatus;
    @Column(length = 50)
    private String dueFrequency;
    private Double netRental;
    private Integer noOfRental;
    private Double financeAmount;
    private Double customerValuation;
    private Double effectiveRate;
    private Integer age;
    @Column(length = 50)
    private String maritalStatus;
    private Double income;

    // Default constructor
    public LoanDataEntity() {
    }


    public LoanDataEntity(String contractStatus, String dueFrequency, Double netRental, Integer noOfRental, Double financeAmount, Double customerValuation, Double effectiveRate, Integer age, String maritalStatus, Double income) {
        this.contractStatus = contractStatus;
        this.dueFrequency = dueFrequency;
        this.netRental = netRental;
        this.noOfRental = noOfRental;
        this.financeAmount = financeAmount;
        this.customerValuation = customerValuation;
        this.effectiveRate = effectiveRate;
        this.age = age;
        this.maritalStatus = maritalStatus;
        this.income = income;
    }

    public String getContractStatus() {
        return contractStatus;
    }

    public void setContractStatus(String contractStatus) {
        this.contractStatus = contractStatus;
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

}