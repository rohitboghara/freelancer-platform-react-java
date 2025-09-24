package com.ntra.progigs.Service;

import com.ntra.progigs.DTOs.BankDetailsDTO;

public interface BankDetailService {

    BankDetailsDTO saveBankDetail(BankDetailsDTO bankDetailsDTO);

    BankDetailsDTO editBankDetail(BankDetailsDTO bankDetails, int id);

    void deleteBankDetail(int id);
}
