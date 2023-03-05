import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInUser, signUpUser, getUserDetails } from '../api/user';

export const userLogin = createAsyncThunk(
  'user/Login',
  async (payload, { rejectWithValue }) => {
    return signInUser(payload.email, payload.password)
      .then((response) => {
        localStorage.setItem('IS_LOGGED_IN', true);
        localStorage.setItem('uid', response.uid);
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
  async (payload, { getState, rejectWithValue,fulfillWithValue }) => {
    const userState = getState().user;
    const firstName = userState.firstName;
    const lastName = userState.lastName;
    const email = userState.email;
    const password = userState.password;
    if (firstName && lastName && email && password)
      return signUpUser(email, firstName, lastName, password)
        .then((response) => {
          if (response.uid !== undefined) return fulfillWithValue(response);
          else return rejectWithValue(response);
        })
        .catch((error) => {
          return rejectWithValue(error);
        });
    else return rejectWithValue('fill all fields');
  }
);

export const saveUserData = createAsyncThunk(
  'user/saveUserData',
  async (payload, { getState, rejectWithValue, dispatch }) => {
    const uid = payload.uid;
    const userState = getState().user;
 
    if (uid && !userState.sheetId){
      return getUserDetails(uid)
        .then((response) => {
          if (response.uid !== undefined) return response;
          else return rejectWithValue(response);
        })
        .catch((error) => {
          return rejectWithValue(error);
        });}
    else dispatch(setUid(uid));
  }
);

const initialState = {
  uid: null,
  email: null,
  firstName: null,
  lastName: null,
  sheetId: null,
  password: null,
  isLoggedIn: false,
  isRegisteredUser: true,
  showHome: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUid: (state, action) => {
      if (action.payload) {
        state.uid = action.payload;
        state.isLoggedIn = true;
      } else {
        state.uid = null;
        state.isLoggedIn = false;
      }
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setRegisteredUser: (state, action) => {
      state.isRegisteredUser = action.payload;
    },
    setShowHome: (state, action) => {
      console.log("showHome",action.payload)
      state.showHome = action.payload;
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.sheetId = action.payload.sheetId;
      state.isLoggedIn = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.sheetId = action.payload.sheetId;
      state.isLoggedIn = true;
    },
    [saveUserData.fulfilled]:(state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.sheetId = action.payload.sheetId;
      state.isLoggedIn = true;
    },
  },
});

export const {
  setUid,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setRegisteredUser,
  setShowHome,
} = userSlice.actions;

export default userSlice.reducer;
