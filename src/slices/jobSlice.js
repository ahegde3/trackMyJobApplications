import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { insertToGSheet } from '../api/jobs';

export const addToGSheet = createAsyncThunk(
  'jobProfile/addToGSheet',
  async (payload, { rejectWithValue, dispatch,getState }) => {

    const uid = payload.uid;
    const jobProfile=getState().jobProfile
    const position = jobProfile.position;
    const company =jobProfile.company;
    const source = jobProfile.source;

    if (uid && position && company)
      return insertToGSheet(uid, { position, company, source }).then(() =>
        dispatch(
          setJobProfile({
            jobId: null,
            position: null,
            company: null,
            source: null,
          })
        )
      );
    else return rejectWithValue('fill all fields');
  }
);

const initialState = {
  jobId: '',
  position: '',
  company: '',
  source: '',
};

const jobSlice = createSlice({
  name: 'jobProfile',
  initialState,
  reducers: {
    setJobProfile: (state, action) => {
      state.jobId = action.payload.jobId;
      state.position = action.payload.position;
      state.company = action.payload.company;
      state.source = action.payload.source;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setSource: (state, action) => {
      state.source = action.payload;
    },
  },
  extraReducers: {

  },
});

export const { setJobProfile, setPosition, setCompany, setSource } =
  jobSlice.actions;

export default jobSlice.reducer;
