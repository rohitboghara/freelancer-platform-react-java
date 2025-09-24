package com.ntra.progigs.Service.ServiceImpl;

import com.ntra.progigs.DTOs.ProposalsDto;
import com.ntra.progigs.DTOs.ProposalsDtoForGet;
import com.ntra.progigs.Entity.Jobs;
import com.ntra.progigs.Entity.Profile;
import com.ntra.progigs.Entity.Proposals;
import com.ntra.progigs.Entity.User;
import com.ntra.progigs.Mapper.ProposalMapper;
import com.ntra.progigs.Repository.JobRepo;
import com.ntra.progigs.Repository.ProfileRepo;
import com.ntra.progigs.Repository.ProposalsRepo;
import com.ntra.progigs.Repository.UserRepo;
import com.ntra.progigs.Service.ProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProposalServiceImpl implements ProposalService {
    @Autowired
    private ProposalsRepo proposalsRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ProfileRepo profileRepo;
    @Autowired
    private JobRepo jobRepo;
    @Autowired
    private ProposalMapper proposalsMapper;
    @Override
    public Proposals saveProposal(ProposalsDto proposals,int jobid) {
        User user = getAuthenticatedUser();
        if(!"FREELANCER".equalsIgnoreCase(user.getRole().toString())){
            throw new RuntimeException("You are not a freelancer");
        }
        Profile profile=user.getProfile();
        proposals.setUser(user);
        proposals.setFreelancerName(user.getUsername());
        proposals.setFreelancerEmail(profile.getEmail());
//        Jobs jobs = jobRepo.findById(jobid);
//        proposals.setJobs(jobs);
        try {
            Jobs jobs = jobRepo.findById(jobid);
            proposals.setJobTitle(jobs.getTitle());
            proposals.setJobs(jobs);
            User user1 = jobs.getUser();
            proposals.setClientName(user1.getUsername());
            return proposalsRepo.save(proposalsMapper.MapToProposal(proposals));
        }catch (Exception e){
            throw new RuntimeException ("Job dont exist!!");
        }

    }

    @Override
    public List<ProposalsDtoForGet> getProposalFromJob(int jobid) {
       List<Proposals> proposals= proposalsRepo.findAllProposalsByJobs(jobid);
       List<ProposalsDtoForGet> proposalsDtos= proposals.stream().map(proposalsMapper::MapptoProposalDto).toList();
        return proposalsDtos;
    }



    private User getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            return userRepo.findByUsername(username);
        }
        throw new RuntimeException("User is not authenticated");
    }
}
