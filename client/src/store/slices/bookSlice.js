import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    fetchBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
      state.message = null;
    },
    fetchBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    addBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess: (state, action) => {
      state.loading = false;
      state.books.push(action.payload);
    },
    addBookFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetBookSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const fetchAllBooks=()=>async(dispatch)=>{
    dispatch(bookSlice.actions.fetchBooksRequest());
    await axios.get("http://localhost:4000/api/v1/book/all",{withCredentials:true})
    .then((res)=>{
        dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
    }).catch((error)=>{
        dispatch(bookSlice.actions.fetchBooksFailed(error.response.data.message));

    });
}
export const addBook =(data)=>async(dispatch)=>{
    dispatch(bookSlice.actions.addBookRequest());
    await axios.post("http://localhost:4000/api/v1/book/admin/add",data,{withCredentials:true,
        headers:{
            "Content-Type":"application/json",
        }
    })
    .then((res)=>{
        dispatch(bookSlice.actions.addBookSuccess(res.data.book));
        toast.success(res.data.message);
        dispatch(toggleAddBookPopup());
        dispatch(fetchAllBooks()); 
        dispatch(resetBookSlice());
    })
    .catch((error)=>{
        dispatch(bookSlice.actions.addBookFailed(error.response.data.message));
        dispatch(resetBookSlice());

    });
};
export const resetBookSlice =()=>(dispatch)=>{
  dispatch(bookSlice.actions.resetBookSlice());
}

export default bookSlice.reducer;
