// MLLoanResponseDTO.java
package com.bankingSystem.prediction.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MLLoanResponseDTO {

    @JsonProperty("ml_result")
    private MLResultDTO ml_result;

    @JsonProperty("llm_result")
    private LLMResultDTO llm_result;

    public MLResultDTO getMl_result() { return ml_result; }
    public void setMl_result(MLResultDTO ml_result) { this.ml_result = ml_result; }

    public LLMResultDTO getLlm_result() { return llm_result; }
    public void setLlm_result(LLMResultDTO llm_result) { this.llm_result = llm_result; }
}
