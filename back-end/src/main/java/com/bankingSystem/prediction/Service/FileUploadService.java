package com.bankingSystem.prediction.Service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileUploadService {


    // Path to your shared_data/uploads folder
    private final Path fileStorageLocation = Paths.get("../ml-service/shared_data/uploads")
            .toAbsolutePath().normalize();

    public FileUploadService() {
        try {
            Files.createDirectories(fileStorageLocation); // create folder if not exists
        } catch (Exception ex) {
            throw new RuntimeException("Could not create upload directory!", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        // Clean the file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check for invalid characters
            if(fileName.contains("..")) {
                throw new RuntimeException("Invalid file path sequence " + fileName);
            }

            // Copy file to the target location (overwrites existing)
            Path targetLocation = fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation);

            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }
}



