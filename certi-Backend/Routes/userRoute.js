import { Router } from 'express';
import { authenticate } from '../Middleware/auth.js';
import { certificate } from './adminRoute.js'; 

const user = Router();


user.get('/searchCertificate', authenticate, (req, res) => {
  try {
    const certId = req.query.certificateId;
    console.log("User searched Certificate ID:", certId);

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

export { user };
