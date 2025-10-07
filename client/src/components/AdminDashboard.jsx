// import React from "react";
// import adminIcon from "../assets/pointing.png";
// import usersIcon from "../assets/people-black.png";
// import bookIcon from "../assets/book-square.png";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
//   ArcElement,
// } from "chart.js";
// import logo from "../assets/black-logo.png";
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import { useEffect } from "react";
// import Header from "../layout/Header";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
//   ArcElement
// );

// const AdminDashboard = () => {
//   const {user} = useSelector(state => state.auth);
//   const{users} = useSelector(state => state.user);
//   const {books} = useSelector(state => state.book);
//   const{allBorrowedBooks} = useSelector(state => state.borrow);
//   const{settingPopup}= useSelector(state => state.popup);

//   const [totalUsers, setTotalUsers]= useState(0);
//   const [totalAdmin, setTotalAdmin]= useState(0);
//   const [totalBooks, setTotalBooks]= useState((books && books.length) || 0);
//   const [totalBorrowedBooks, setTotalBorrowedBooks]= useState(0);
//   const [totalReturnedBooks, setTotalReturnedBooks]= useState(0);

//   useEffect(()=>{
//     let numberofUsers = users.filter(user => user.role.toLowerCase() === "user");
//     let numberofAdmins = users.filter(user => user.role.toLowerCase() === "admin");
//     setTotalUsers(numberofUsers);
//     setTotalAdmin(numberofAdmins);
//     let numberofTotalBorrowedBooks=allBorrowedBooks.filter((book)=>book.returnDate===null);
//     let numberofTotalReturnedBooks=allBorrowedBooks.filter((book)=>book.returnDate!==null);
//     setTotalBorrowedBooks(numberofTotalBorrowedBooks.length);
//     setTotalReturnedBooks(numberofTotalReturnedBooks.length);
//         // dispatch(fetchAllBorrowedBooks());


//         const data = {
//         labels: ["Total Borrowed Books", "Total Returned Books"],
//         datasets: [
//     {
//       label: "Books",
//       data: [totalBorrowedBooks, totalReturnedBooks],
//       backgroundColor: ["#3D3E3E", "#151619"],
//       borderWidth: 1,
//       hoverOffset: 4,
//     },
//   ],
// };

//   }, [users, allBorrowedBooks])

//   return <>

//   <main className="relative flex-1 p-6 pt-28">
//     <Header />  
//     <div className="flex flex-col-reverse xl-flex-row">
//       <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items xl:flex-col justify-between xl:gap-20 py-5">
//         <div className="xl:flex-[4] flex items-end w-full content-center">
//           <Pie data={data} options={{cutout: 0}} className="mx-auto lg:mx-0 w-full h-auto"/>
//         </div>
//       </div>
//     </div>
//   </main>

//   </>
// };

// export default AdminDashboard;



// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import Header from "../layout/Header";
// import { Pie } from "react-chartjs-2";
// import 'chart.js/auto';
// import { fetchAllBorrowedBooks } from "../store/slices/borrowSlice";

// const AdminDashboard = () => {
//   const { users = [] } = useSelector(state => state.user);
//   const { books = [] } = useSelector(state => state.book);
//   const { allBorrowedBooks = [] } = useSelector(state => state.borrow);

//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalAdmin, setTotalAdmin] = useState(0);
//   const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
//   const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

//   useEffect(() => {
//     let numberofUsers = users.filter(user => user.role?.toLowerCase() === "user");
//     let numberofAdmins = users.filter(user => user.role?.toLowerCase() === "admin");
//     setTotalUsers(numberofUsers.length);
//     setTotalAdmin(numberofAdmins.length);
//     let numberofTotalBorrowedBooks = allBorrowedBooks.filter(book => book.returnDate === null);
//     let numberofTotalReturnedBooks = allBorrowedBooks.filter(book => book.returnDate !== null);
//     setTotalBorrowedBooks(numberofTotalBorrowedBooks.length);
//     setTotalReturnedBooks(numberofTotalReturnedBooks.length);
    

//   }, [users, allBorrowedBooks]);

//   if (!users.length && !books.length && !allBorrowedBooks.length) {
//     return (
//       <main className="relative flex-1 p-6 pt-28">
//         <Header />
//         <div className="flex justify-center items-center h-96">
//           <span className="text-gray-500 text-xl">Loading dashboard data...</span>
//         </div>
//       </main>
//     );
//   }

//   const data = {
//     labels: ["Total Borrowed Books", "Total Returned Books"],
//     datasets: [
//       {
//         label: "Books",
//         data: [
//           totalBorrowedBooks || 0,
//           totalReturnedBooks || 0
//         ],
//         backgroundColor: ["#3D3E3E", "#151619"],
//         borderWidth: 1,
//         hoverOffset: 4,
//       },
//     ],
//   };

//   return (
//     <main className="relative flex-1 p-6 pt-28">
//       <Header />
//       <div className="flex flex-col-reverse xl:flex-row">
//         <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items xl:flex-col justify-between xl:gap-20 py-5">
//           <div className="xl:flex-[4] flex items-end w-full content-center h-64">
//             <Pie data={data} options={{ cutout: 0 }} className="mx-auto lg:mx-0 w-full h-auto" />
//           </div>
//             {/* <div className="flex items-center p-8 w-full sm:w-fit mr-5 xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h[150px] bg-white xl:flex-1 rounded-lg">
//             <img src={logo} alt="Logo" className="w-auto xl:flex-1 rounded-lg" />
//             <span className="classNamew-[20] bg-black h-full"></span> 
//           </div>  */}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default AdminDashboard;









import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../layout/Header";
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import { fetchAllBorrowedBooks } from "../store/slices/borrowSlice";
import logo from "../assets/black-logo.png";
import adminIcon from "../assets/pointing.png";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png"; 


const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { users = [] } = useSelector(state => state.user);
  const { books = [] } = useSelector(state => state.book);
  const { allBorrowedBooks = [] } = useSelector(state => state.borrow);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  // 🔹 Fetch borrowed books when dashboard loads
  useEffect(() => {
    dispatch(fetchAllBorrowedBooks());
  }, [dispatch]);

  useEffect(() => {
    let numberofUsers = users.filter(user => user.role?.toLowerCase() === "user");
    let numberofAdmins = users.filter(user => user.role?.toLowerCase() === "admin");
    setTotalUsers(numberofUsers.length);
    setTotalAdmin(numberofAdmins.length);

    let numberofTotalBorrowedBooks = allBorrowedBooks.filter(book => book.returnDate === null);
    let numberofTotalReturnedBooks = allBorrowedBooks.filter(book => book.returnDate !== null);

    setTotalBorrowedBooks(numberofTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberofTotalReturnedBooks.length);

  }, [users, allBorrowedBooks]);

  if (!users.length && !books.length && !allBorrowedBooks.length) {
    return (
      <main className="relative flex-1 p-6 pt-28">
        <Header />
        <div className="flex justify-center items-center h-96">
          <span className="text-gray-500 text-xl">Loading dashboard data...</span>
        </div>
      </main>
    );
  }

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        label: "Books",
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <main className="relative flex-1 p-6 pt-28">
      <Header />
      <div className="flex flex-col-reverse xl:flex-row">
        <div className="flex-[2] flex-col gap-7 lg:flex-row flex lg:items xl:flex-col justify-between xl:gap-20 py-5">
          <div className="xl:flex-[4] flex items-end w-80 content-center h-80">
            <Pie data={data} options={{ cutout: 0 }} className="mx-auto lg:mx-0 w-64 h-auto" />
          </div>
          <div className="flex items-center p-8 w-64 sm:w-[400px] xl:w-fit xl:p-3 2xl:p-6 gap-5 h-fit xl:min-h[150px] bg-white xl:flex-3 rounded-lg" >
            <img src={logo} alt="logo" className="w-30 h-20 object-contain"/>
            <span className="w-[2px] bg-black h-full"></span>
            <div className="flex flex-col gap-3">
              <p className="flex items-center gap-3">
      <span className="w-3 h-3 rounded-full bg-[#3D3E3E]"></span>
      <span>Total Borrowed Books </span>
    </p>
    <p className="flex items-center gap-3">
      <span className="w-3 h-3 rounded-full bg-[#151619]"></span>
      <span>Total Returned Books </span>
    </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-7 flex-[4] ml-5">
  {/* User Box */}
  <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
    <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg ">
      <img src={usersIcon} alt="users-icon" className="w-8 h-8"/>
    </span>
    <span className="w-[2px] bg-black h-20 lg:h-full"></span>
    <div className="flex flex-col items-center gap-2">
      <h4 className="font-black text-3xl">{totalUsers}</h4>
      <p className="font-light text-gray-700 text-sm">Total User Base</p>
    </div>
  </div>
  {/* Book Box */}
  <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
    <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg ">
      <img src={bookIcon} alt="book-icon" className="w-8 h-8"/>
    </span>
    <span className="w-[2px] bg-black h-20 lg:h-full"></span>
    <div className="flex flex-col items-center gap-2">
      <h4 className="font-black text-3xl">{books.length}</h4>
      <p className="font-light text-gray-700 text-sm">Total Book Base</p>
    </div>
  </div>
  {/* Admin Box */}
  <div className="flex items-center gap-3 bg-white p-5 max-h-[120px] overflow-y-hidden rounded-lg transition hover:shadow-inner duration-300 w-full lg:max-w-[360px]">
    <span className="bg-gray-300 h-20 min-w-20 flex justify-center items-center rounded-lg ">
      <img src={adminIcon} alt="admin-icon" className="w-8 h-8"/>
    </span>
    <span className="w-[2px] bg-black h-20 lg:h-full"></span>
    <div className="flex flex-col items-center gap-2">
      <h4 className="font-black text-3xl">{totalAdmin}</h4>
      <p className="font-light text-gray-700 text-sm">Total Admin Base</p>
    </div>
  </div>
</div>

        </div>
    </main>
  );
};

export default AdminDashboard;
