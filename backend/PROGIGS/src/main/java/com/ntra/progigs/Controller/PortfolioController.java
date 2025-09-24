package com.ntra.progigs.Controller;

import com.ntra.progigs.DTOs.PortfolioDto;
import com.ntra.progigs.Service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile/portfolio")
@RequiredArgsConstructor
public class PortfolioController {
    @Autowired
    private final PortfolioService portfolioService;

//    @PostMapping
//    public PortfolioDto addPortfolio(@RequestBody PortfolioDto portfolio) {
//        return portfolioService.addPortfolio(portfolio);
//    }
@PostMapping
public PortfolioDto addPortfolio(
        @RequestPart(value = "file", required = false) MultipartFile file,
        @RequestPart("portfolio") PortfolioDto portfolioDto) {

    PortfolioDto savedPortfolio = portfolioService.addPortfolio(file, portfolioDto);
    return savedPortfolio;
}


    @DeleteMapping("/{id}")
    public void deletePortfolio(@PathVariable int id){
        portfolioService.deletePortfolio(id);
    }

}
