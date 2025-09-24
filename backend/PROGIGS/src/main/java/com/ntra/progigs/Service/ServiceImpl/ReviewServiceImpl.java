package com.ntra.progigs.Service.ServiceImpl;

import com.ntra.progigs.DTOs.ReviewDto;
import com.ntra.progigs.Entity.Contract;
import com.ntra.progigs.Entity.Review;
import com.ntra.progigs.Entity.User;
import com.ntra.progigs.Filter.GetAuthenticatedUser;
import com.ntra.progigs.Mapper.ReviewMapper;
import com.ntra.progigs.Repository.ContractRepo;
import com.ntra.progigs.Repository.ReviewRepo;
import com.ntra.progigs.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private ContractRepo contractRepo;

    @Autowired
    private GetAuthenticatedUser getAuthenticatedUser;

    @Autowired
    private ReviewMapper reviewMapper;


    @Override
    public ReviewDto saveReview(ReviewDto reviewDto) {
            User user = getAuthenticatedUser.getAuthenticatedUser();
            Contract contract = contractRepo.findById(reviewDto.getContractId()).orElseThrow(() -> new RuntimeException("Contract not found"));
            Review review = reviewMapper.MapptoReview(reviewDto);
            review.setJobs(contract.getJobs());
            if (user.getRole().toString().equals("CLIENT")) {
                review.setUser(contract.getFreelancer());
            } else if (user.getRole().toString().equals("FREELANCER")) {
                review.setUser(contract.getClient());
            }
            review.setReviewerName(user.getUsername());
            reviewRepo.save(review);
            return reviewMapper.MapptoReviewDto(review);


    }
}
