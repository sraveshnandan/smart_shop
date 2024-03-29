import { Ishop } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  details: Object;
  shops: Ishop[];
  userShop: Ishop | undefined;
}
const initialState: UserState = {
  details: {},
  shops: [],
  userShop: undefined,
};
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.details = action.payload;
    },
    setUserShop: (state, action) => {
      state.userShop = action.payload;
    },
    setAllShops: (state, action) => {
      if (state.shops === action.payload) {
        return;
      }
      state.shops.push(action.payload);
    },
  },
});

export const { setUserData, setUserShop, setAllShops } = UserSlice.actions;
export default UserSlice.reducer;
