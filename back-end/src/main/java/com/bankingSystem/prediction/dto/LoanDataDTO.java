// LoanDataDTO.java
package com.bankingSystem.prediction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoanDataDTO {

    @JsonProperty("DUE_FREQUENCY")
    private String DUE_FREQUENCY;

    @JsonProperty("NET_RENTAL")
    private double NET_RENTAL;

    @JsonProperty("NO_OF_RENTAL")
    private int NO_OF_RENTAL;

    @JsonProperty("FINANCE_AMOUNT")
    private double FINANCE_AMOUNT;

    @JsonProperty("CUSTOMER_VALUATION")
    private double CUSTOMER_VALUATION;

    @JsonProperty("EFFECTIVE_RATE")
    private double EFFECTIVE_RATE;

    @JsonProperty("AGE")
    private int AGE;

    @JsonProperty("INCOME")
    private double INCOME;

    @JsonProperty("MARITAL_STATUS")
    private String MARITAL_STATUS;

    // Getters and Setters
    public String getDUE_FREQUENCY() { return DUE_FREQUENCY; }
    public void setDUE_FREQUENCY(String DUE_FREQUENCY) { this.DUE_FREQUENCY = DUE_FREQUENCY; }

    public double getNET_RENTAL() { return NET_RENTAL; }
    public void setNET_RENTAL(double NET_RENTAL) { this.NET_RENTAL = NET_RENTAL; }

    public int getNO_OF_RENTAL() { return NO_OF_RENTAL; }
    public void setNO_OF_RENTAL(int NO_OF_RENTAL) { this.NO_OF_RENTAL = NO_OF_RENTAL; }

    public double getFINANCE_AMOUNT() { return FINANCE_AMOUNT; }
    public void setFINANCE_AMOUNT(double FINANCE_AMOUNT) { this.FINANCE_AMOUNT = FINANCE_AMOUNT; }

    public double getCUSTOMER_VALUATION() { return CUSTOMER_VALUATION; }
    public void setCUSTOMER_VALUATION(double CUSTOMER_VALUATION) { this.CUSTOMER_VALUATION = CUSTOMER_VALUATION; }

    public double getEFFECTIVE_RATE() { return EFFECTIVE_RATE; }
    public void setEFFECTIVE_RATE(double EFFECTIVE_RATE) { this.EFFECTIVE_RATE = EFFECTIVE_RATE; }

    public int getAGE() { return AGE; }
    public void setAGE(int AGE) { this.AGE = AGE; }

    public double getINCOME() { return INCOME; }
    public void setINCOME(double INCOME) { this.INCOME = INCOME; }

    public String getMARITAL_STATUS() { return MARITAL_STATUS; }
    public void setMARITAL_STATUS(String MARITAL_STATUS) { this.MARITAL_STATUS = MARITAL_STATUS; }
}
