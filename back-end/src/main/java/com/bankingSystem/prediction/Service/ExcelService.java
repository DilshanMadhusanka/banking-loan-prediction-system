package com.bankingSystem.prediction.Service;

import com.bankingSystem.prediction.Entity.LoanDataEntity;
import com.bankingSystem.prediction.Repository.LoanDataRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelService {

    private final LoanDataRepository loanDataRepository;

    public ExcelService(LoanDataRepository loanDataRepository) {
        this.loanDataRepository = loanDataRepository;
    }

    public void saveExcelData(MultipartFile file) throws IOException {
        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);
            List<LoanDataEntity> batch = new ArrayList<>();
            int batchSize = 1000; // insert in batches

            for (int i = 1; i <= sheet.getLastRowNum(); i++) { // skip header
                Row row = sheet.getRow(i);
                if (row == null) continue;

                LoanDataEntity excelData = new LoanDataEntity();

                excelData.setProductCode(getString(row.getCell(0)));
                excelData.setProductName(getString(row.getCell(1)));
                excelData.setProductCategory(getString(row.getCell(2)));
                excelData.setContractNo(getString(row.getCell(3)));
                excelData.setContractStatus(getString(row.getCell(4)));
                excelData.setContractDate(getString(row.getCell(5)));
                excelData.setRecoveryStatus(getString(row.getCell(6)));
                excelData.setLastPaymentDate(getString(row.getCell(7)));
                excelData.setReProcessDate(getString(row.getCell(8)));
                excelData.setReschedule(getString(row.getCell(9)));
                excelData.setDueFrequency(getString(row.getCell(10)));

                excelData.setNetRental(getNumeric(row.getCell(11)));
                excelData.setNoOfRental(getNumeric(row.getCell(12)).intValue());
                excelData.setPaidRentals(getNumeric(row.getCell(13)).intValue());
                excelData.setCbArrearsAge(getNumeric(row.getCell(14)).intValue());

                excelData.setAssetTypeName(getString(row.getCell(15)));
                excelData.setYom(getNumeric(row.getCell(16)).intValue());
                excelData.setMake(getString(row.getCell(17)));
                excelData.setModelName(getString(row.getCell(18)));
                excelData.setRegistration(getString(row.getCell(19)));
                excelData.setRegistrationNo(getString(row.getCell(20)));
                excelData.setGender(getString(row.getCell(21)));
                excelData.setCity(getString(row.getCell(22)));
                excelData.setDistrictName(getString(row.getCell(23)));
                excelData.setProvinceName(getString(row.getCell(24)));

                excelData.setFinanceAmount(getNumeric(row.getCell(25)));
                excelData.setCustomerValuation(getNumeric(row.getCell(26)));
                excelData.setEffectiveRate(getNumeric(row.getCell(27)));
                excelData.setAge(getNumeric(row.getCell(28)).intValue());

                excelData.setMaritalStatus(getString(row.getCell(29)));
                excelData.setIncome(getNumeric(row.getCell(30)));
                excelData.setExpense(getNumeric(row.getCell(31)));

                batch.add(excelData);

                // save batch
                if (batch.size() == batchSize) {
                    loanDataRepository.saveAll(batch);
                    batch.clear();
                }
            }

            // save remaining
            if (!batch.isEmpty()) {
                loanDataRepository.saveAll(batch);
            }
        }
    }

    // Helper method to safely get numeric value
    private Double getNumeric(Cell cell) {
        if (cell == null) return 0.0;
        if (cell.getCellType() == CellType.NUMERIC) return cell.getNumericCellValue();
        if (cell.getCellType() == CellType.STRING) {
            try {
                return Double.parseDouble(cell.getStringCellValue());
            } catch (NumberFormatException e) {
                return 0.0;
            }
        }
        return 0.0;
    }

    // Helper method to safely get string value
    private String getString(Cell cell) {
        if (cell == null) return "";
        if (cell.getCellType() == CellType.STRING) return cell.getStringCellValue();
        if (cell.getCellType() == CellType.NUMERIC) return String.valueOf(cell.getNumericCellValue());
        return "";
    }
}
