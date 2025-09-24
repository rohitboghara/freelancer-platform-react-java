package com.ntra.progigs.Service;

import com.ntra.progigs.DTOs.PortfolioDto;
import org.springframework.web.multipart.MultipartFile;

public interface PortfolioService {
    public PortfolioDto addPortfolio(MultipartFile file, PortfolioDto portfolio);



    public void deletePortfolio(int id);




}
