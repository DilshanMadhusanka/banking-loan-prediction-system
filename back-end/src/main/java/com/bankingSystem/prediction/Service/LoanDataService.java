package com.bankingSystem.prediction.Service;

import com.bankingSystem.prediction.Entity.LoanDataEntity;
import com.bankingSystem.prediction.Repository.LoanDataRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.poi.util.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.LinkedList;
import java.util.List;

@Service
public class LoanDataService {

    @Autowired
    private LoanDataRepository loanDataRepository;

    public void saveFileData(InputStream file) throws IOException {

        IOUtils.setByteArrayMaxOverride(200_000_000);

        List<LoanDataEntity> loanDataList = new LinkedList<>();
        Workbook workbook = WorkbookFactory.create(file);
        Sheet sheet = workbook.getSheetAt(0);

        for (Row row : sheet) {
            if (row.getRowNum() == 0) continue; // skip header

            boolean hasEmptyCell = false;
            for (int i = 0; i <= 31; i++) { // 32 columns in entity
                Cell cell = row.getCell(i);
                if (cell == null || getCellValueAsString(cell).isEmpty()) {
                    hasEmptyCell = true;
                    break;
                }
            }
            if (hasEmptyCell) continue; // skip row if any cell is empty

            LoanDataEntity loanData = new LoanDataEntity();
            loanData.setContractStatus(getCellValueAsString(row.getCell(4)));
            loanData.setDueFrequency(getCellValueAsString(row.getCell(10)));
            loanData.setNetRental(getCellValueAsDouble(row.getCell(11)));
            loanData.setNoOfRental(getCellValueAsInteger(row.getCell(12)));
            loanData.setFinanceAmount(getCellValueAsDouble(row.getCell(25)));
            loanData.setCustomerValuation(getCellValueAsDouble(row.getCell(26)));
            loanData.setEffectiveRate(getCellValueAsDouble(row.getCell(27)));
            loanData.setAge(getCellValueAsInteger(row.getCell(28)));
            loanData.setMaritalStatus(getCellValueAsString(row.getCell(29)));
            loanData.setIncome(getCellValueAsDouble(row.getCell(30)));


            loanDataList.add(loanData);
        }

        loanDataRepository.saveAll(loanDataList);
        workbook.close();
    }

    public List<LoanDataEntity> findAll() {
        return loanDataRepository.findAll();
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null) return "";
        switch (cell.getCellType()) {
            case STRING: return cell.getStringCellValue().trim();
            case NUMERIC: return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN: return String.valueOf(cell.getBooleanCellValue());
            default: return "";
        }
    }

    private Double getCellValueAsDouble(Cell cell) {
        if (cell == null) return null;
        switch (cell.getCellType()) {
            case NUMERIC: return cell.getNumericCellValue();
            case STRING:
                try { return Double.parseDouble(cell.getStringCellValue().trim()); }
                catch (NumberFormatException e) { return null; }
            default: return null;
        }
    }

    private Integer getCellValueAsInteger(Cell cell) {
        Double value = getCellValueAsDouble(cell);
        return value != null ? value.intValue() : null;
    }
}
