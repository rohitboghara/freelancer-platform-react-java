package com.ntra.progigs.Service.ServiceImpl;

import com.ntra.progigs.DTOs.CertificateDto;
import com.ntra.progigs.Entity.Certificates;
import com.ntra.progigs.Entity.Profile;
import com.ntra.progigs.Entity.User;
import com.ntra.progigs.Filter.GetAuthenticatedUser;
import com.ntra.progigs.Mapper.CertificateMapper;
import com.ntra.progigs.Repository.CertificateRepo;
import com.ntra.progigs.Repository.ProfileRepo;
import com.ntra.progigs.Service.CertificateService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CertificateServiceImpl implements CertificateService {
    @Autowired
    private ProfileRepo profileRepo;
    @Autowired
    private CertificateRepo certificateRepo;
    @Autowired
    private CertificateMapper certificateMapper;

    @Autowired
    private GetAuthenticatedUser getAuthenticatedUser;


    @Override
    public CertificateDto editCertificate(CertificateDto certificate, int id) {
        Certificates certificates=certificateRepo.findById(id).orElseThrow(()->new RuntimeException("Certificate not found"));
        certificates.setCertificateIssuer(certificate.getCertificateIssuer());
        certificates.setCertificateName(certificate.getCertificateName());
        certificates.setIssuedDate(certificate.getIssuedDate());
        certificateRepo.save(certificateMapper.MapToCertificates(certificate));
        return certificate;
    }

    @Override
    public CertificateDto addCertificate(CertificateDto certificate) {
        User user = getAuthenticatedUser.getAuthenticatedUser();
        int id = user.getProfile().getId();
        Profile profile = this.profileRepo.findById(id).get();
        certificate.setProfile(profile);
        certificateRepo.save(certificateMapper.MapToCertificates(certificate));
        return certificate;
    }

    @Override
    public void removeCertificate(int id) {
        certificateRepo.deleteById(id);
    }


}
