package com.bankingSystem.prediction.dto;

public class MLLoanResponseDTO {

    private int prediction;
    private double probability_of_default;

    public int getPrediction() { return prediction; }
    public void setPrediction(int prediction) { this.prediction = prediction; }

    public double getProbability_of_default() { return probability_of_default; }
    public void setProbability_of_default(double probability_of_default) { this.probability_of_default = probability_of_default; }
}

