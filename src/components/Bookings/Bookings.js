import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [bookings, setbookings] = useState([]);

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/bookings?email=" + loggedInUser.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //secure data pass confirmation from client side
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setbookings(data));
  }, []);

  return (
    <div>
      <h3>You Have: {bookings.length} bookings.</h3>
      {bookings.map((book) => (
        <li key={book._id}>
          {book.name} from: {new Date(book.checkIn).toDateString("dd/MM/yyyy")}{" "}
          to:{new Date(book.checkOut).toDateString("dd/MM/yyyy")}{" "}
        </li>
      ))}
    </div>
  );
};

export default Bookings;
