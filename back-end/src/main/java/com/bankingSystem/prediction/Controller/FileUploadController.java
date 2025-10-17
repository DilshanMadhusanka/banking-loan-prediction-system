package com.bankingSystem.prediction.Controller;

import com.bankingSystem.prediction.Service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/v1/files")
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    @PostMapping("/uploads")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileUploadService.storeFile(file);

        Map<String, String> response = new HashMap<>();
        response.put("message", "File saved as: " + fileName);
        response.put("fileName", fileName);

        return ResponseEntity.ok(response); // Spring converts Map -> JSON automatically
    }

}

