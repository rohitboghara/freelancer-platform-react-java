package com.ntra.progigs.Mapper;

import com.ntra.progigs.DTOs.ContractDto;
import com.ntra.progigs.Entity.Contract;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ContractMapper {
    @Autowired
    private ModelMapper modelMapper;

    public ContractDto MapToDto(Contract contract){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        ContractDto contractDto = new ContractDto();
        contractDto = new ModelMapper().map(contract,ContractDto.class);
        return contractDto;
    }
    public ContractDto MapToDto1(Contract contract){
        ContractDto contractDto = new ContractDto();
        contractDto.setFreelancerName(contract.getFreelancer().getUsername());
        contractDto.setClientName(contract.getClient().getUsername());
        contractDto.setStatus(contract.getStatus());
        contractDto.setId(contract.getId());
        contractDto.setAmount(contract.getAmount());
        contractDto.setStartDate(contract.getStartDate());
        contractDto.setFreelancerId(contract.getFreelancer().getId());
        contractDto.setEndDate(contract.getEndDate());
        contractDto.setJobsDescription(contract.getJobs().getDescription());
        contractDto.setJobsTitle(contract.getJobs().getTitle());
        return contractDto;
    }

    public Contract MapToContract(ContractDto contractDto){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        Contract contract = new Contract();
        contract = new ModelMapper().map(contractDto,Contract.class);
        return contract;
    }
}
