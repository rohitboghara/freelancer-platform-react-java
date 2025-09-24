package com.ntra.progigs.Controller;

import com.ntra.progigs.DTOs.ContractDto;
import com.ntra.progigs.DTOs.JobDtoForCard;
import com.ntra.progigs.Service.ContractService;
import com.ntra.progigs.Service.ServiceImpl.NotificationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contract")
@RequiredArgsConstructor
public class ContractController {
    @Autowired
    private ContractService contractService;

    @Autowired
    private NotificationServiceImpl notificationService;
    @PostMapping("/{proposalid}")
    public ResponseEntity<ContractDto> saveContract(@RequestBody ContractDto contract, @PathVariable int proposalid){
        return ResponseEntity.ok(contractService.saveContract(contract,proposalid));
    }
    @GetMapping("/{contractid}")
    public ResponseEntity<ContractDto> getContractById(@PathVariable int contractid){
        return ResponseEntity.ok(contractService.getContractById(contractid));
    }
    @PutMapping("/{contractid}")
    public ResponseEntity<String> editeContractStatus(@PathVariable int contractid){
        contractService.editeContractStatus(contractid);
        return ResponseEntity.ok("Contract Closed Successfully");
    }
    @GetMapping("/activeJobs")
    public ResponseEntity<List<JobDtoForCard>> activeJobsByContract(){
        return ResponseEntity.ok(contractService.activeContract());
    }
    @GetMapping("/myContract")
    public ResponseEntity<List<ContractDto>> getContract(){
        return ResponseEntity.ok(contractService.getContract());
    }

    @PutMapping("/close/{contractId}")
    public ContractDto closeContract(@PathVariable int contractId) {
        // Your DB logic to close contract here...
        ContractDto contractDto = contractService.closeContract(contractId);
        notificationService.notifyFreelancer(contractId);
        return contractDto;
    }

}
