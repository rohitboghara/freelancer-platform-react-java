package com.ntra.progigs.Mapper;

import com.ntra.progigs.DTOs.PortfolioDto;
import com.ntra.progigs.Entity.Portfolio;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PortfolioMapper {
    @Autowired
    private ModelMapper modelMapper;

    public PortfolioDto MaptoPortfolioDto(Portfolio portfolio) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        PortfolioDto portfolioDto = new PortfolioDto();
        portfolioDto = new ModelMapper().map(portfolio, PortfolioDto.class);
        return portfolioDto;
    }
    public Portfolio MaptoPortfolio(PortfolioDto portfolioDto) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        Portfolio portfolio = new Portfolio();
        portfolio = new ModelMapper().map(portfolioDto, Portfolio.class);
        return portfolio;
    }
}
