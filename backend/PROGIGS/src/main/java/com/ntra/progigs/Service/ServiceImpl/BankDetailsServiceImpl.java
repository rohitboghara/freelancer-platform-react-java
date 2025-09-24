package com.ntra.progigs.Service.ServiceImpl;

import com.ntra.progigs.DTOs.BankDetailsDTO;
import com.ntra.progigs.Entity.BankDetails;
import com.ntra.progigs.Entity.Profile;
import com.ntra.progigs.Entity.User;
import com.ntra.progigs.Filter.GetAuthenticatedUser;
import com.ntra.progigs.Mapper.BankDetailsMapper;
import com.ntra.progigs.Repository.BankDetailsRepo;
import com.ntra.progigs.Service.BankDetailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BankDetailsServiceImpl implements BankDetailService {
    @Autowired
    private BankDetailsRepo bankDetailsRepo;
    @Autowired
    private BankDetailsMapper bankDetailsMapper;
    @Autowired
    private GetAuthenticatedUser getAuthenticatedUser;
    @Override
    public BankDetailsDTO saveBankDetail(BankDetailsDTO bankDetailsDTO) {
        User user = getAuthenticatedUser.getAuthenticatedUser();
        Profile profile = user.getProfile();
        bankDetailsRepo.save(bankDetailsMapper.DTOToBankDetails(bankDetailsDTO));
        profile.setBank(bankDetailsMapper.DTOToBankDetails(bankDetailsDTO));
        return bankDetailsDTO;
    }


    @Override
    public BankDetailsDTO editBankDetail(BankDetailsDTO bankDetails,int id) {
        Profile profile = getAuthenticatedUser.getAuthenticatedUser().getProfile();
        BankDetails bankDetails1= bankDetailsRepo.findById(id).get();
        BankDetailsDTO bankDetailsDTO=bankDetailsMapper.bankDetailsToDTO(bankDetails1);
        bankDetailsDTO.setBankName(bankDetails.getBankName());
        bankDetailsDTO.setAccountHolderName(bankDetails.getAccountHolderName());
        bankDetailsDTO.setAccountNumber(bankDetails.getAccountNumber());
        bankDetailsDTO.setIfscCode(bankDetails.getIfscCode());
        bankDetailsDTO.setBranch(bankDetails.getBranch());
        bankDetailsDTO.setProfile(profile);
        bankDetailsRepo.save(bankDetailsMapper.DTOToBankDetails(bankDetailsDTO));
        return bankDetailsDTO;

    }

//    @Override
//    public BankDetailsDTO editBankDetail(BankDetailsDTO bankDetails,int id) {;
//        BankDetails bankDetails1= bankDetailsRepo.findById(id).get();
//        BankDetailsDTO bankDetailsDTO=bankDetailsMapper.bankDetailsToDTO(bankDetails1);
//        bankDetailsDTO.setBankName(bankDetails.getBankName());
//        bankDetailsDTO.setAccountHolderName(bankDetails.getAccountHolderName());
//        bankDetailsDTO.setAccountNumber(bankDetails.getAccountNumber());
//        bankDetailsDTO.setIfscCode(bankDetails.getIfscCode());
//        bankDetailsDTO.setBranch(bankDetails.getBranch());
//        bankDetailsRepo.save(bankDetailsMapper.DTOToBankDetails(bankDetailsDTO));
//        return bankDetailsDTO;
//
//    }
    @Override
    public void deleteBankDetail(int id) {
        bankDetailsRepo.deleteById(id);
    }
}
