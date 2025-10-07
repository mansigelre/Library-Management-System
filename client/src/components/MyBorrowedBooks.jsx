import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookA } from "lucide-react";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import Header from "../layout/Header";
import ReadBookPopup from "../popups/ReadBookPopup";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.book);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const { readBookPopup } = useSelector((state) => state.popup);

  const [readBook, setReadBook] = useState({});
  const [filter, setFilter] = useState("returned");

  const openReadPopup = (id) => {
    const book = books.find((book) => book._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  // const formatDate = (timestamp) => {
  //    const date = new Date(timestamp);
  //    const formattedDate = `${String(date.getDate()).padStart(2,"0")}-${String(date.getMonth()+1).padStart(2,"0")}-${date.getFullYear()}`;
  //    const formattedTime = `${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}:${String(date.getSeconds()).padStart(2,"0")}`;
  //    return `${formattedDate} ${formattedTime}`;
  //  };

  

 const formatDate = (timestamp) => {
     const date = new Date(timestamp);
     const formattedDate = `${String(date.getDate()).padStart(2,"0")}-${String(date.getMonth()+1).padStart(2,"0")}-${date.getFullYear()}`;
     const formattedTime = `${String(date.getHours()).padStart(2,"0")}:${String(date.getMinutes()).padStart(2,"0")}:${String(date.getSeconds()).padStart(2,"0")}`;
     return `${formattedDate} ${formattedTime}`;
   };
 
   useEffect(() => {
     const result = formatDate("2025-09-12T15:27:53.120+00:00");
     console.log(result); // ✅ will show in console on mount
   }, []);
  // 🔥 FIX: Add filtering logic back
  const returnedBooks = userBorrowedBooks?.filter((book) => book.returned === true);
  const notReturnedBooks = userBorrowedBooks?.filter((book) => book.returned === false);

  const booksToDisplay = filter === "returned" ? returnedBooks : notReturnedBooks;

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header />

        <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <h2 className="text-xl font-medium md:text-2xl md:font-semibold">
            Borrowed Books
          </h2>
        </header>

        {/* Filter buttons */}
        <header className="flex flex-col gap-3 sm:flex-row md:items-center mt-4">
          <button
            className={`relative rounded text-center border-2 font-semibold py-2 w-full sm:w-72 ${
              filter === "returned"
                ? "bg-black text-white border-black"
                : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("returned")}
          >
            Returned Books
          </button>
          <button
            className={`relative rounded text-center border-2 font-semibold py-2 w-full sm:w-72 ${
              filter === "notReturned"
                ? "bg-black text-white border-black"
                : "bg-gray-200 text-black border-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setFilter("notReturned")}
          >
            Non-Returned Books
          </button>
        </header>

        {/* Table */}
        {booksToDisplay && booksToDisplay.length > 0 ? (
          <div className="mt-6 overflow-auto bg-white rounded-md shadow-lg">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Book Title</th>
                  <th className="px-4 py-2 text-left">Date & Time</th>
                  <th className="px-4 py-2 text-left">Due Date</th>
                  <th className="px-4 py-2 text-left">Returned</th>
                  <th className="px-4 py-2 text-left">View</th>
                </tr>
              </thead>
              <tbody>
                {booksToDisplay.map((book, index) => (
                  <tr
                    key={index}
                    className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{book.bookTitle}</td>
                    <td className="px-4 py-2">{formatDate(book.borrowedDate)}</td>
                    <td className="px-4 py-2">{formatDate(book.dueDate)}</td>

                    <td className="px-4 py-2">{book.returned ? "Yes" : "No"}</td>
                    <td className="px-4 py-2">
                      <BookA
                        className="cursor-pointer"
                        onClick={() => openReadPopup(book.bookId)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : filter === "returned" ? (
         <h3 className="text-3xl mt-5 font-medium">
          No returned books found
         </h3>
        ) : (
         <h3 className="text-3xl mt-5 font-medium">
          No non-returned books found
         </h3>
        
        )}
      </main>
      {readBookPopup && <ReadBookPopup book={readBook}/>}
    </>
  );
};

export default MyBorrowedBooks;
