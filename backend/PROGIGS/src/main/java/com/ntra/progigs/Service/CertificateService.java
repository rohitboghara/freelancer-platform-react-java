package com.ntra.progigs.Service;

import com.ntra.progigs.DTOs.CertificateDto;

public interface CertificateService {
    public CertificateDto editCertificate(CertificateDto certificate,int id);
    public CertificateDto addCertificate(CertificateDto certificate);
    public void removeCertificate(int id);
}
