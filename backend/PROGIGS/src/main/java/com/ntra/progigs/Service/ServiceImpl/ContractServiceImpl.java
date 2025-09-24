package com.ntra.progigs.Service.ServiceImpl;

import com.ntra.progigs.DTOs.ContractDto;
import com.ntra.progigs.DTOs.JobDtoForCard;
import com.ntra.progigs.Entity.*;
import com.ntra.progigs.Filter.GetAuthenticatedUser;
import com.ntra.progigs.Mapper.ContractMapper;
import com.ntra.progigs.Mapper.JobMapper;
import com.ntra.progigs.Repository.ContractRepo;
import com.ntra.progigs.Repository.JobRepo;
import com.ntra.progigs.Repository.ProposalsRepo;
import com.ntra.progigs.Repository.UserRepo;
import com.ntra.progigs.Service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContractServiceImpl implements ContractService {
    @Autowired
    private ContractRepo contractRepo;
    @Autowired
    private JobRepo jobRepo;
//    @Autowired
//    private WebSocketNotificationServiceImpl webSocketNotificationService;
    @Autowired
    private JobMapper jobMapper;

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ContractMapper contractMapper;
    @Autowired
    private ProposalsRepo proposalsRepo;
    @Autowired
    private GetAuthenticatedUser getAuthenticatedUser;

    @Override
    public ContractDto saveContract(ContractDto contract,int proposalid) {
        Optional<Proposals> proposals=proposalsRepo.findById(proposalid);

        User user = getAuthenticatedUser.getAuthenticatedUser();
        contract.setClient(user);
        Jobs jobs=jobRepo.findById(proposals.get().getJobs().getId());
        contract.setJobs(jobs);
        contract.setStatus(ContractStatus.ACTIVE);
        proposals.get().setStatus(PropsalStatus.HIRED);
        proposalsRepo.save(proposals.get());
        contract.setFreelancer(proposals.get().getUser());
        contractRepo.save(contractMapper.MapToContract(contract));
        return contract;
    }

    @Override
    public ContractDto getContractById(int contractid) {
        return contractMapper.MapToDto(contractRepo.findById(contractid).orElseThrow(()->new RuntimeException("Contract not found")));
    }

    @Override
    public void editeContractStatus(int contractid) {
        Contract contract1 = contractRepo.findById(contractid).orElseThrow(()->new RuntimeException("Contract not found"));
        contract1.setStatus(ContractStatus.CLOSED);
//        webSocketNotificationService.sendContractClosedNotification(contract1.getFreelancer().getId(), contract1.getJobs().getId());
        contractRepo.save(contract1);

    }

    @Override
    public List<JobDtoForCard> activeContract() {
        User user = getAuthenticatedUser.getAuthenticatedUser();
        List<Contract> activeContract = new ArrayList<>();
        if ("CLIENT".equals(user.getRole().toString())) {
           activeContract  = contractRepo.findAllByClientAndStatus(user, ContractStatus.ACTIVE);
        } else if ("FREELANCER".equals(user.getRole().toString())) {
            activeContract  = contractRepo.findAllByFreelancerAndStatus(user, ContractStatus.ACTIVE);
        }else {
            throw new RuntimeException("You are not a client or freelancer");
        }

        List<JobDtoForCard> activeJobs = new java.util.ArrayList<>();
        for (Contract contract : activeContract) {
            Jobs job = contract.getJobs();
            activeJobs.add(jobMapper.MapToJobDtoforCard(job));
        }
        
        return activeJobs;
    }

    @Override
    public List<ContractDto> getContract() {
        User user = getAuthenticatedUser.getAuthenticatedUser();
        List<Contract> contracts = new ArrayList<>();
        if ("CLIENT".equals(user.getRole().toString())) {
            contracts = contractRepo.findAllByClient(user);
        } else if ("FREELANCER".equals(user.getRole().toString())) {
            contracts = contractRepo.findAllByFreelancer(user);
        } else {
            throw new RuntimeException("You are not a client or freelancer");
        }
        List<ContractDto> contractDtos = new ArrayList<>();
        for (Contract contract : contracts) {
            contractDtos.add(contractMapper.MapToDto1(contract));
        }
        return contractDtos;
    }

    @Override
    public ContractDto closeContract(int contractId) {
        Contract contract = contractRepo.findById(contractId).orElseThrow(()->new RuntimeException("Contract not found"));
        contract.setStatus(ContractStatus.CLOSED);
        contractRepo.save(contract);
        return contractMapper.MapToDto1(contract);
    }




}
