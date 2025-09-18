package com.bankingSystem.prediction.Controller;

import com.bankingSystem.prediction.Service.ExcelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/data")
@CrossOrigin
public class DataController {

    private final ExcelService excelService;

    public DataController(ExcelService excelService) {
        this.excelService = excelService;
    }

    @PostMapping("/upload-file")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please upload a valid Excel file.");
        }
        try {
            excelService.saveExcelData(file);
            return ResponseEntity.ok("File uploaded and data saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}

