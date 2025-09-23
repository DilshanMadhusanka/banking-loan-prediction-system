package com.bankingSystem.prediction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MLLoanRequestDTO {

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
    public void setDUE_FREQUENCY(String dUE_FREQUENCY) { DUE_FREQUENCY = dUE_FREQUENCY; }

    public double getNET_RENTAL() { return NET_RENTAL; }
    public void setNET_RENTAL(double nET_RENTAL) { NET_RENTAL = nET_RENTAL; }

    public int getNO_OF_RENTAL() { return NO_OF_RENTAL; }
    public void setNO_OF_RENTAL(int nO_OF_RENTAL) { NO_OF_RENTAL = nO_OF_RENTAL; }

    public double getFINANCE_AMOUNT() { return FINANCE_AMOUNT; }
    public void setFINANCE_AMOUNT(double fINANCE_AMOUNT) { FINANCE_AMOUNT = fINANCE_AMOUNT; }

    public double getCUSTOMER_VALUATION() { return CUSTOMER_VALUATION; }
    public void setCUSTOMER_VALUATION(double cUSTOMER_VALUATION) { CUSTOMER_VALUATION = cUSTOMER_VALUATION; }

    public double getEFFECTIVE_RATE() { return EFFECTIVE_RATE; }
    public void setEFFECTIVE_RATE(double eFFECTIVE_RATE) { EFFECTIVE_RATE = eFFECTIVE_RATE; }

    public int getAGE() { return AGE; }
    public void setAGE(int aGE) { AGE = aGE; }

    public double getINCOME() { return INCOME; }
    public void setINCOME(double iNCOME) { INCOME = iNCOME; }

    public String getMARITAL_STATUS() { return MARITAL_STATUS; }
    public void setMARITAL_STATUS(String mARITAL_STATUS) { MARITAL_STATUS = mARITAL_STATUS; }
}
