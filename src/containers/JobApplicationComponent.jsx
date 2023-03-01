import React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './index.css';
import {
  addToGSheet,
  setJobProfile,
  setPosition,
  setCompany,
  setSource,
} from '../slices/jobSlice';

function JobApplicationComponent(props) {
  const {
    position,
    company,
    source,
    uid,
    addToGSheet,
    setJobProfile,
    setPosition,
    setCompany,
    setSource,
  } = props;

  // useEffect(() => {
  //   setPosition(position);
  //   setCompany(company);
  //   setSite(site);
  // }, [props]);

  const addToSheet = async () => {
    console.log('addToSheet');
    console.log(position, company, source);
    if (position && company && source)
      await addToGSheet({ uid, position, company, source });
  };

  return (
    <div className="job-application-container">
      {console.log(props)}
      <TextField
        required
        value={position || ''}
        id="outlined-required"
        label="Position"
        sx={{ width: '50%', marginBottom: '5px' }}
        onChange={(e) => setPosition(e.target.value)}
      />
      <TextField
        required
        value={company || ''}
        id="outlined-required"
        label="Company"
        sx={{ width: '50%', marginBottom: '5px' }}
        onChange={(e) => setCompany(e.target.value)}
      />
      <TextField
        required
        value={source || ''}
        id="outlined-required"
        label="Source"
        sx={{ width: '50%', marginBottom: '5px' }}
        onChange={(e) => setSource(e.target.value)}
      />
      <Button variant="contained" sx={{ width: '50%' }} onClick={addToSheet}>
        Add to Tracker
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.user,
    ...state.jobProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToGSheet: (payload) => dispatch(addToGSheet(payload)),
    setJobProfile: (payload) => dispatch(setJobProfile(payload)),
    setPosition: (payload) => dispatch(setPosition(payload)),
    setCompany: (payload) => dispatch(setCompany(payload)),
    setSource: (payload) => dispatch(setSource(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobApplicationComponent);
