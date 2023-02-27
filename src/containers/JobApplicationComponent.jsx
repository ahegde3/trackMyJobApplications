import React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './index.css';

export default function JobApplicationComponent(props) {
  const { position, company, site } = props;
  const [positionState, setPosition] = useState(position || '');
  const [companyState, setCompany] = useState(company || '');
  const [siteState, setSite] = useState(site || '');

  useEffect(() => {
    setPosition(position);
    setCompany(company);
    setSite(site);
  }, [props]);

  return (
    <div className="job-application-container">
      <TextField
        required
        value={positionState}
        id="outlined-required"
        label="Position"
        sx={{ width: '50%', marginBottom: '5px' }}
        onChange={(e) => setPosition(e.target.value)}
      />
      <TextField
        required
        value={companyState}
        id="outlined-required"
        label="Company"
        sx={{ width: '50%', marginBottom: '5px' }}
        onChange={(e) => setCompany(e.target.value)}
      />
      <TextField
        required
        value={siteState}
        id="outlined-required"
        label="Site"
        sx={{ width: '50%', marginBottom: '5px' }}
        onChange={(e) => setSite(e.target.value)}
      />
      <Button variant="contained" sx={{ width: '50%' }}>
        Add to Tracker
      </Button>
    </div>
  );
}
