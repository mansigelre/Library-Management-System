import React, { useState, useEffect } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { Link, Navigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";





const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, isAuthenticated } = useSelector(state => state.auth);

  // const handleOTPVerification = (e) => {
  //   e.preventDefault();
  //   dispatch(otpVerification({ email, otp }) );
  // }
  const handleOTPVerification = (e) => {
  e.preventDefault();
  if (!email || !otp) {
    toast.error("Please enter all fields");
    return;
  }
  dispatch(otpVerification({ email, otp }));
};


  useEffect(()=>{
    // if(message){
    //   toast.success(message);
    // }
    if(error){
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  },[loading,error,dispatch,isAuthenticated]);
  if(isAuthenticated){
    return <Navigate to ="/"/>;

  }


  return <>
  <div className="flex flex-col justify-center md:flex-row h-screen">
    {/* Left side with logo */}
    <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
    <Link to ={"/register"} className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 -left-28 hover:bg-black hover:text-white transition duration-300 text-end">Back</Link>
    <div className="max-w-sm w-full">
      <div className="flex justify-center mb-12">
        <div className="rounded-full flex items-center justify-center">
          <img src={logo} alt="Logo"className="h-24 w-auto"/>
        </div>
      </div>
      <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">Check your MailBox</h1>
      <p className="text-gray-800 text-center mb-12">Please enter the otp to proceed </p>
      <form onSubmit={handleOTPVerification}>
        <div className="mb-4">
          <input type="number"value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter OTP" className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"/>
        </div>
        <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">VERIFY</button>
      </form>
    </div>
    </div>
    {/*Right side with form */}
    <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
      <div className="text-center h-[400px]" >
        <div className="flex justify-center mb-12">
          <img src={logo_with_title} alt="Logo" className="mb-12 h-44 w-auto"/>
        </div>
        <p className="text-gray-300 mb-12">New to our platform? Sign up now.</p> <Link to="/register" className="border-2 mt-5 border-white px-8 w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">SIGN UP</Link>
      </div>
    </div>
  </div>
  
  </>;
};

export default OTP;
