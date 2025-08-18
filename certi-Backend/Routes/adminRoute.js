import { Router } from 'express';
import { authenticate } from '../Middleware/auth.js';
import admincheck from '../Middleware/admin.js';


const admin = Router();
const certificate = new Map();
     

admin.post('/addCertificate', authenticate, admincheck, (req, res) => {
  try {
    const { CertificateId, Course, CandidateName, Grade, IssueDate } = req.body;

    if (certificate.get(CertificateId)) {
      res.status(400).json({ msg: 'Certificate already exists' });
    } else {
      try {
        certificate.set(CertificateId, { Course, CandidateName, Grade, IssueDate });
        res.status(201).json({ msg: 'Certificate successfully added' });
      } catch {
        res.status(400).json({ msg: 'Something went wrong while adding the certificate' });
      }
    }
  } catch {
    res.status(500).json({ msg: 'Internal server error' });
  }
});


admin.put('/updateCertificate', authenticate, admincheck, (req, res) => {
  try {
    const { CertificateId, Course, CandidateName, Grade, IssueDate } = req.body;

    if (certificate.get(CertificateId)) {
      certificate.set(CertificateId, { Course, CandidateName, Grade, IssueDate });
      res.status(200).json({ msg: 'Certificate updated successfully' });
    } else {
      res.status(404).json({ msg: 'Certificate not found' });
    }
  } catch {
    res.status(500).json({ msg: 'Internal server error' });
  }
});


admin.get('/getCertificate', authenticate, admincheck, (req, res) => {
  try {
    const certId = req.query.certificateId;
    console.log("Certificate ID:", certId);

    const result = certificate.get(certId);

    if (result) {
      res.status(200).json({ result });
    } else {
      res.status(404).json({ msg: 'Certificate not found' });
    }
  } catch (error) {
    console.error("Error certificate:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { admin, certificate };
    
