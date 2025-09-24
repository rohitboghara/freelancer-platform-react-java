package com.ntra.progigs.Controller;

import com.ntra.progigs.DTOs.ReviewDto;
import com.ntra.progigs.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ReviewDto saveReview(@RequestBody ReviewDto review) {
        return reviewService.saveReview(review);
    }
}
