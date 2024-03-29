import { IProduct } from "@/types";
import { Action, createSlice } from "@reduxjs/toolkit";

export interface IproductState {
  Products: Array<IProduct>;
  userProducts: Array<IProduct>;
}
const initialState: IproductState = {
  Products: [],
  userProducts: [],
};
const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setAllProductsData: (state, action) => {
      if (state.Products[0] === action.payload[0]) {
        return;
      } else {
        action.payload.forEach((item: any) => {
          return state.Products.push(item);
        });
      }
    },
    setUserProducts: (state, action) => {
      console.log("action", action);
      action.payload.forEach((item: IProduct) => {
        return state.userProducts.push(item);
      });
    },
  },
});

export const { setAllProductsData, setUserProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
