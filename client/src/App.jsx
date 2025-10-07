// import React, { useEffect } from "react";
// import { getUser } from "./slices/authSlice";
// import { fetchAllUsers } from "./slices/userSlice";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import OTP from "./pages/OTP";
// import Register from "./pages/Register";
// import ResetPassword from "./pages/ResetPassword";
// import { ToastContainer } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";

// const App = () => {
//   const {user,isAuthenticated} = useSelector(state => state.auth)
//   const  dispatch = useDispatch();
//   useEffect(()=>{
//     dispatch(getUser());
//     if(isAuthenticated && user?.role==="Admin"){
//       dispatch(fetchAllUsers());
//     }
    
//   },[])
//   return <Router>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/password/forgot" element={<ForgotPassword />} />
//       <Route path="/otp-verification/:email" element={<OTP />} />
//       {/* <Route path="/password/reset/:token" element={<ResetPassword />} /> */}
//       <Route path="/reset/password/:token" element={<ResetPassword />} />


//     </Routes>
//     <ToastContainer theme="dark" />

//   </Router>;
// };

// export default App;


// 

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import { fetchAllUsers } from "./store/slices/userSlice";
import { fetchAllBooks } from "./store/slices/bookSlice";
import { fetchUserBorrowedBooks } from "./store/slices/borrowSlice";




const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchAllBooks());
    if (isAuthenticated && user?.role.toLowerCase() === "user") {
      dispatch(fetchUserBorrowedBooks());
    }
    if (isAuthenticated && user?.role.toLowerCase() === "admin") {
      dispatch(fetchAllUsers());
      dispatch(fetchUserBorrowedBooks());
    }
  }, [dispatch, isAuthenticated, user?.role]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/reset/password/:token" element={<ResetPassword />} />
      </Routes>

      
      <ToastContainer theme="dark" />
    </Router>
  );
};

export default App;
