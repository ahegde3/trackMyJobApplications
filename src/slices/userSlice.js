import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInUser,signUpUser } from '../api/user';

export const userLogin = createAsyncThunk(
  'user/Login',
  async (payload, { rejectWithValue }) => {
    return signInUser(payload.email, payload.password)
      .then((response) => {
        localStorage.setItem('IS_LOGGED_IN', true)
        localStorage.setItem('uid', response.uid)
        if (response.uid !== undefined) return response;
        else return rejectWithValue(response);
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (payload, { getState,rejectWithValue }) => {
  
       const userState=getState().user;
       const firstName=userState.firstName 
       const lastName=userState.lastName 
       const email=userState.email 
       const password=userState.password 
       if(firstName && lastName && email && password)
      return signUpUser(email,firstName,lastName , password)
        .then((response) => {
          if (response.uid !== undefined) return resolve(response);
          else return rejectWithValue(response);
        })
        .catch((error) => {
          return rejectWithValue(error);
        });
        else return rejectWithValue("fill all fields");
    }
  );

const initialState = {
  uid: null,
  email: null,
  firstName: null,
  lastName: null,
  sheetId: null,
  password:null,
  isLoggedIn:false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUid:(state,action)=>{
      state.uid=action.payload
      state.isLoggedIn = true
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail:(state,action)=>{
        state.email=action.payload
    },
    setPassword:(state,action)=>{
        state.password=action.payload
    }
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.sheetId = action.payload.sheetId;
      state.isLoggedIn=true
    },
    [registerUser.fulfilled]: (state, action) => {
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.sheetId = action.payload.sheetId;
        state.isLoggedIn=true
      },
  },
});

export const {
  setUid,
    setFirstName,
    setLastName,
    setEmail,
    setPassword
}=userSlice.actions

export default userSlice.reducer;
