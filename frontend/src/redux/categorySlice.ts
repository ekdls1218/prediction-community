import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  id: number;
  name: string;
}

interface CategoryState {
  categories: Category[];
  selectedCategory : number | null
}

const initialState: CategoryState = { categories: [], selectedCategory: null };

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers : {
      setCategories : (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
      },
      setCategory: (state, action: PayloadAction<number | null>) => {
        state.selectedCategory = action.payload
      }
    }
});

export const { setCategories, setCategory } = categorySlice.actions; 
export default categorySlice.reducer;