package com.bankingSystem.prediction.Service;

import com.bankingSystem.prediction.dto.MLLoanRequestDTO;
import com.bankingSystem.prediction.dto.MLLoanResponseDTO;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MLLoanService {

    private static final String FASTAPI_URL = "http://127.0.0.1:8000/final-predict";

    public MLLoanResponseDTO predictLoan(MLLoanRequestDTO request) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<MLLoanRequestDTO> entity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<MLLoanResponseDTO> response = restTemplate.postForEntity(
                    FASTAPI_URL, entity, MLLoanResponseDTO.class);
            return response.getBody();
        } catch (Exception e) {
            System.err.println("Error calling FastAPI: " + e.getMessage());
            return null;
        }
    }
}
