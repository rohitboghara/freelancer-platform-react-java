package com.ntra.progigs.Service;

import com.ntra.progigs.DTOs.ContractDto;
import com.ntra.progigs.DTOs.JobDtoForCard;

import java.util.List;

public interface ContractService {
    public ContractDto saveContract(ContractDto contract,int jobid);
    public ContractDto getContractById(int contractid);

    void editeContractStatus(int contractid);

    public List<JobDtoForCard> activeContract();


    List<ContractDto> getContract();

    ContractDto closeContract(int contractId);
}
