import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    startLoadingData: (state, action) => {
      state.loading = true;
      state.error = "";
    },
    getDataSuccessFully: (state, action) => {
      state.userData = action?.payload;
      state.loading = false;
      state.error = "";
    },
    failedLoadingData: (state, action) => {
      state.error = action?.payload;
      state.loading = false;
    },
  },
});

export const { startLoadingData, getDataSuccessFully, failedLoadingData } =
  userSlice.actions;

export const getUserData = () => async (dispatch) => {
  try {
    dispatch(startLoadingData());
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users`
    );
    if (data) {
      dispatch(getDataSuccessFully(data));
    }
  } catch (error) {
    dispatch(
      failedLoadingData(
        error?.response && error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message
      )
    );
  }
};

export default userSlice.reducer;
