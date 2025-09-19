package com.bankingSystem.prediction.Controller;

import com.bankingSystem.prediction.Entity.LoanDataEntity;
import com.bankingSystem.prediction.Service.LoanDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/v1/data")
public class LoanDataController {

    @Autowired
    private LoanDataService loanDataService;

    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> saveFileData(@RequestParam("file") MultipartFile file) throws IOException {
        loanDataService.saveFileData(file.getInputStream());
        return ResponseEntity.ok("Excel File Data Saved into Database");
    }

    @GetMapping("/read-data")
    public ResponseEntity<List<LoanDataEntity>> findAll(){
        return ResponseEntity.ok(loanDataService.findAll());
    }
}
