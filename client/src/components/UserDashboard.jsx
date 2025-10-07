import React from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import Header from "../layout/Header";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";
import { useState } from "react";
import { fetchAllBorrowedBooks } from "../store/slices/borrowSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);


const UserDashboard = () => {
  const {settingPopup}=useSelector(state=>state.popup)
  const { userBorrowedBooks } = useSelector(state => state.borrow);
  const dispatch = useDispatch();


  const [totalBorrowedBooks,setTotalBorrowedBooks]=useState(0);
  const [totalReturnedBooks,setTotalReturnedBooks]=useState(0);


  useEffect(()=>{
    let numberofTotalBorrowedBooks=userBorrowedBooks.filter((book)=>book.returned===false);
    let numberofTotalReturnedBooks=userBorrowedBooks.filter((book)=>book.returned===true);
    setTotalBorrowedBooks(numberofTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberofTotalReturnedBooks.length);
    dispatch(fetchAllBorrowedBooks());
  },[userBorrowedBooks,dispatch])
  const data={
    labels:[" Total Borrowed Books","Total Returned Books"],
    datasets:[
      {
        label:"Books",
        data:[totalBorrowedBooks,totalReturnedBooks],
        backgroundColor:["#3D3E3E","#151619"],
        borderWidth:1,
        hoverOffset: 4
      },
    ],
  };
  return <>
  <main className=" relative flex-1 p-6 pt-28">
    <Header />
    <div className="flex flex-col-reverse xl:flex-row ">
      
        {/*Left side*/}
        <div className="flex flex-[4] flex-col gap-7 lg:py-5 justify-between xl:min-h-[85.5vh]">
          <div className="flex flex-col gap-7 flex-[4]">
            <div className="flex flex-col lg:flex-row gap-7 overflow-y-hidden">
              <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 ">
                <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                <span className="bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center rounded-lg"><img src={bookIcon} alt="Book Icon" className="w-8 h-8"/></span>
                <p className="text-lg xl:text-xl font-semibold">
                  Your Borrowed Books List: {totalBorrowedBooks}
                </p>
              </div>
              <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 ">
                <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                <span className="bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center rounded-lg"><img src={returnIcon} alt="Return Icon" className="w-8 h-8"/></span>
                <p className="text-lg xl:text-xl font-semibold">
                  Your Returned Books List: {totalReturnedBooks}
                </p>
              </div>
            </div>
            <div className="flex flex-col flex-[4] gap-7">
              <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 ">
                <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                <span className="bg-gray-300 h-20 lg:h-full min-w-20 flex justify-center items-center rounded-lg"><img src={browseIcon} alt="Book Icon" className="w-8 h-8"/></span>
                <p className="text-lg xl:text-xl font-semibold">
                  Let's Browse and Borrow More Books!
                </p>
              </div>
              {/* <img src={logo} alt="Logo" className="hidden lg:block w-auto justify-end" /> */}
            </div>
          </div>
          
          <div className="bg-white p-4 text-lg sm:text-xl xl:text-3xl 2xl:text-4xl min-h-52 font-semibold
  relative flex-[2] flex justify-center items-center rounded-2xl mb-6"> {/* mb-6 add kiya */}
  <h4 className="overflow-y-hidden">""</h4>
  <p className="text-gray-700 text-xs sm:text-sm absolute right-4 sm:right-12 bottom-2">~ Library team</p>
</div>

        </div>
        {/*Right side*/}
       <div className="flex-[2] flex flex-col items-center gap-6 py-5">

          <div className="xl:flex-[4] flex items-end w-full content-center">
            <Pie data={data} options={{cutout:0}}className="mx-auto lg:mx-0 w-full h-auto"/>
          </div>
         <div className="flex items-center p-6 sm:p-8 w-full sm:w-[400px] xl:w-fit gap-5 
  h-fit min-h-[150px] bg-white rounded-lg">
  <img src={logo} alt="logo" className="w-auto h-12 2xl:h-20"/>
  <span className="w-[2px] bg-black h-full"></span>
  <div className="flex flex-col gap-5 ml-6">
    <p className="flex items-center gap-3">
      <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
      <span>Total Borrowed Books: {totalBorrowedBooks}</span>
    </p>
    <p className="flex items-center gap-3">
      <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
      <span>Total Returned Books: {totalReturnedBooks}</span>
    </p>
  </div>
</div>


        </div>
      
    </div>
    
  </main>
 
  
  </>;
};

export default UserDashboard;
