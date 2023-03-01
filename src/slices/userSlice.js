import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInUser } from '../api/user';

export const userLogin = createAsyncThunk(
    "user/Login",
    async (payload, { rejectWithValue }) => {
        console.log(userLogin)
      return signInUser(
        payload.email,
        payload.password,
      )
        .then((response) => {
            console.log(response)
          if (response.uid !== undefined) return response;
          else return rejectWithValue(response);
        })
        .catch((error) => {
          return rejectWithValue(error);
        });
    }
  );



const initialState = {
 uid:null,
 email:null,
 firstName:null,
 lastName:null,
 sheetId:null
  };

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{        
    },
    extraReducers: {
        [userLogin.fulfilled]:(state,action)=>{
            state.uid=action.payload.uid
            state.email=action.payload.email
            state.firstName=action.payload.firstName
            state.lastName=action.payload.lastName
            state.sheetId=action.payload.sheetId
        }
    }
})  


export default userSlice.reducer