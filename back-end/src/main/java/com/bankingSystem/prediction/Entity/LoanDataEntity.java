package com.bankingSystem.prediction.Entity;


import jakarta.persistence.*;

@Entity
@Table(name = "loan-data")
public class LoanDataEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productCode;
    private String productName;
    private String productCategory;
    private String contractNo;
    private String contractStatus;
    private String contractDate;
    private String recoveryStatus;
    private String lastPaymentDate;
    private String reProcessDate;
    private String reschedule;
    private String dueFrequency;
    private Double netRental;
    private Integer noOfRental;
    private Integer paidRentals;
    private Integer cbArrearsAge;
    private String assetTypeName;
    private Integer yom;
    private String make;
    private String modelName;
    private String registration;
    private String registrationNo;
    private String gender;
    private String city;
    private String districtName;
    private String provinceName;
    private Double financeAmount;
    private Double customerValuation;
    private Double effectiveRate;
    private Integer age;
    private String maritalStatus;
    private Double income;
    private Double expense;

    // getters and setters

    public LoanDataEntity() {
        // default constructor required for JPA and for your ExcelService
    }

    public LoanDataEntity(Long id, String productCode, String productName, String productCategory, String contractNo, String contractStatus, String contractDate, String recoveryStatus, String lastPaymentDate, String reProcessDate, String reschedule, String dueFrequency, Double netRental, Integer noOfRental, Integer paidRentals, Integer cbArrearsAge, String assetTypeName, Integer yom, String make, String modelName, String registration, String registrationNo, String gender, String city, String districtName, String provinceName, Double financeAmount, Double customerValuation, Double effectiveRate, Integer age, String maritalStatus, Double income, Double expense) {
        this.id = id;
        this.productCode = productCode;
        this.productName = productName;
        this.productCategory = productCategory;
        this.contractNo = contractNo;
        this.contractStatus = contractStatus;
        this.contractDate = contractDate;
        this.recoveryStatus = recoveryStatus;
        this.lastPaymentDate = lastPaymentDate;
        this.reProcessDate = reProcessDate;
        this.reschedule = reschedule;
        this.dueFrequency = dueFrequency;
        this.netRental = netRental;
        this.noOfRental = noOfRental;
        this.paidRentals = paidRentals;
        this.cbArrearsAge = cbArrearsAge;
        this.assetTypeName = assetTypeName;
        this.yom = yom;
        this.make = make;
        this.modelName = modelName;
        this.registration = registration;
        this.registrationNo = registrationNo;
        this.gender = gender;
        this.city = city;
        this.districtName = districtName;
        this.provinceName = provinceName;
        this.financeAmount = financeAmount;
        this.customerValuation = customerValuation;
        this.effectiveRate = effectiveRate;
        this.age = age;
        this.maritalStatus = maritalStatus;
        this.income = income;
        this.expense = expense;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }

    public String getContractNo() {
        return contractNo;
    }

    public void setContractNo(String contractNo) {
        this.contractNo = contractNo;
    }

    public String getContractStatus() {
        return contractStatus;
    }

    public void setContractStatus(String contractStatus) {
        this.contractStatus = contractStatus;
    }

    public String getContractDate() {
        return contractDate;
    }

    public void setContractDate(String contractDate) {
        this.contractDate = contractDate;
    }

    public String getRecoveryStatus() {
        return recoveryStatus;
    }

    public void setRecoveryStatus(String recoveryStatus) {
        this.recoveryStatus = recoveryStatus;
    }

    public String getLastPaymentDate() {
        return lastPaymentDate;
    }

    public void setLastPaymentDate(String lastPaymentDate) {
        this.lastPaymentDate = lastPaymentDate;
    }

    public String getReProcessDate() {
        return reProcessDate;
    }

    public void setReProcessDate(String reProcessDate) {
        this.reProcessDate = reProcessDate;
    }

    public String getReschedule() {
        return reschedule;
    }

    public void setReschedule(String reschedule) {
        this.reschedule = reschedule;
    }

    public String getDueFrequency() {
        return dueFrequency;
    }

    public void setDueFrequency(String dueFrequency) {
        this.dueFrequency = dueFrequency;
    }

    public Double getNetRental() {
        return netRental;
    }

    public void setNetRental(Double netRental) {
        this.netRental = netRental;
    }

    public Integer getNoOfRental() {
        return noOfRental;
    }

    public void setNoOfRental(Integer noOfRental) {
        this.noOfRental = noOfRental;
    }

    public Integer getPaidRentals() {
        return paidRentals;
    }

    public void setPaidRentals(Integer paidRentals) {
        this.paidRentals = paidRentals;
    }

    public Integer getCbArrearsAge() {
        return cbArrearsAge;
    }

    public void setCbArrearsAge(Integer cbArrearsAge) {
        this.cbArrearsAge = cbArrearsAge;
    }

    public String getAssetTypeName() {
        return assetTypeName;
    }

    public void setAssetTypeName(String assetTypeName) {
        this.assetTypeName = assetTypeName;
    }

    public Integer getYom() {
        return yom;
    }

    public void setYom(Integer yom) {
        this.yom = yom;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getRegistration() {
        return registration;
    }

    public void setRegistration(String registration) {
        this.registration = registration;
    }

    public String getRegistrationNo() {
        return registrationNo;
    }

    public void setRegistrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrictName() {
        return districtName;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public Double getFinanceAmount() {
        return financeAmount;
    }

    public void setFinanceAmount(Double financeAmount) {
        this.financeAmount = financeAmount;
    }

    public Double getCustomerValuation() {
        return customerValuation;
    }

    public void setCustomerValuation(Double customerValuation) {
        this.customerValuation = customerValuation;
    }

    public Double getEffectiveRate() {
        return effectiveRate;
    }

    public void setEffectiveRate(Double effectiveRate) {
        this.effectiveRate = effectiveRate;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(String maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public Double getExpense() {
        return expense;
    }

    public void setExpense(Double expense) {
        this.expense = expense;
    }
}

