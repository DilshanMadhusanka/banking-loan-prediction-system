package com.bankingSystem.prediction.Controller;

import com.bankingSystem.prediction.Service.MLLoanService;
import com.bankingSystem.prediction.dto.MLLoanRequestDTO;
import com.bankingSystem.prediction.dto.MLLoanResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ml")

public class MLLoanController {

    @Autowired
    private MLLoanService mlLoanService;

    @PostMapping("/predict")
    public MLLoanResponseDTO predictLoan(@RequestBody MLLoanRequestDTO request) {
        return mlLoanService.predictLoan(request);
    }
}

