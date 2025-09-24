package com.ntra.progigs.Mapper;

import com.ntra.progigs.DTOs.ProposalsDto;
import com.ntra.progigs.DTOs.ProposalsDtoForGet;
import com.ntra.progigs.Entity.*;
import com.ntra.progigs.Repository.ReviewRepo;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProposalMapper {

    @Autowired
    public ModelMapper modelMapper;
    @Autowired
    private ReviewRepo reviewRepo;

    public ProposalsDto MapToDto(Proposals proposals){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        ProposalsDto proposalDto = new ProposalsDto();
        proposalDto = new ModelMapper().map(proposals, ProposalsDto.class);
        return proposalDto;
    }

    public ProposalsDtoForGet MapptoProposalDto(Proposals proposals) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        ProposalsDtoForGet proposalsDtoForGet = new ProposalsDtoForGet();
        User user = proposals.getUser();
        int totalJobs = user.getJobs().size();
        long completedJobs = user.getJobs().stream()
                .filter(job -> "COMPLETED".equalsIgnoreCase(job.getStatus().name())) // Use .name() for enums
                .count();

        List<Review> reviews = reviewRepo.findByUser(user);
        double totalRating = reviews.stream().mapToDouble(Review::getRating).sum();
        int totalReviews = reviews.size();

        if (reviews.isEmpty()) {
            totalRating=0.0;
            totalReviews= 0;
        }
        proposalsDtoForGet.setId(proposals.getId());
        proposalsDtoForGet.setName(user.getProfile().getFirstName() + " " + user.getProfile().getLastName());
        proposalsDtoForGet.setUsername(user.getUsername());
        proposalsDtoForGet.setRating((totalRating / totalReviews));
        proposalsDtoForGet.setReviews(totalReviews);
        proposalsDtoForGet.setStatus(proposals.getStatus());
        proposalsDtoForGet.setSuccessRate((totalJobs == 0) ? 0 : ((double) completedJobs / totalJobs) * 100);
        proposalsDtoForGet.setExpertise(user.getProfile().getSkills());
        proposalsDtoForGet.setDescription(proposals.getDescription());
        proposalsDtoForGet.setCountry(user.getProfile().getLocation());
        proposalsDtoForGet.setBid(proposals.getBid());
        proposalsDtoForGet.setFinishingTime(proposals.getFinishingTime());
        proposalsDtoForGet.setImage(user.getProfile().getImageUrl());
        return proposalsDtoForGet;
    }

    public Proposals MapToProposal(ProposalsDto proposalsDto){
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        Proposals proposals = new Proposals();
        proposals = new ModelMapper().map(proposalsDto,Proposals.class);
        return proposals;
    }
}
