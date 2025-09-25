package com.bankingSystem.prediction.Controller;

import com.bankingSystem.prediction.Entity.PredictionResultEntity;
import com.bankingSystem.prediction.Service.MLLoanService;
import com.bankingSystem.prediction.Service.PredictionResultService;
import com.bankingSystem.prediction.dto.MLLoanRequestDTO;
import com.bankingSystem.prediction.dto.MLLoanResponseDTO;
import com.bankingSystem.prediction.dto.PredictionResultDTO;
import com.bankingSystem.prediction.dto.PredictionResultViewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ml")
@CrossOrigin
public class MLLoanController {

    @Autowired
    private MLLoanService mlLoanService;
    @Autowired
    private PredictionResultService predictionResultService;

    // send prediction for ml model
    @PostMapping("/predict")
    public MLLoanResponseDTO predictLoan(@RequestBody MLLoanRequestDTO request) {
        return mlLoanService.predictLoan(request);
    }


    // save the prediction
    @PostMapping("/save-prediction")
    public ResponseEntity<Map<String, Object>> savePrediction(@RequestBody PredictionResultDTO dto) {
        PredictionResultEntity saved = predictionResultService.predictionSave(dto);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("predictionId", saved.getId());
        response.put("message", "Prediction saved successfully");

        return ResponseEntity.ok(response);
    }

    // get all the prediction
    @GetMapping("/all-prediction")
    public List<PredictionResultViewDTO> getAllPredictions() {
        return predictionResultService.getAllPredictions();

    }
}

