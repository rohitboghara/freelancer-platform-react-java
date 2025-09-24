package com.ntra.progigs.Service;

import com.ntra.progigs.DTOs.ProposalsDto;
import com.ntra.progigs.DTOs.ProposalsDtoForGet;
import com.ntra.progigs.Entity.Proposals;

import java.util.List;

public interface ProposalService {
    public Proposals saveProposal(ProposalsDto proposals,int jobid);
    public List<ProposalsDtoForGet> getProposalFromJob(int jobid);




}
