// MLLoanRequestDTO.java
package com.bankingSystem.prediction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MLLoanRequestDTO {

    @JsonProperty("loan_data")
    private LoanDataDTO loan_data;

    @JsonProperty("customer_behavior")
    private String customer_behavior;

    // Getters and Setters
    public LoanDataDTO getLoan_data() { return loan_data; }
    public void setLoan_data(LoanDataDTO loan_data) { this.loan_data = loan_data; }

    public String getCustomer_behavior() { return customer_behavior; }
    public void setCustomer_behavior(String customer_behavior) { this.customer_behavior = customer_behavior; }
}
