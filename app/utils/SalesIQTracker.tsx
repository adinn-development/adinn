"use client"; // Required for using hooks and browser APIs

import { useEffect, useRef } from "react";
// import { useLogin } from "./LoginContext"; // Adjust path as needed/
import { loadZohoSalesIQ, identifySalesIQUser } from "./zohoSalesIQ";

export default function SalesIQTracker() {
//   const { user } = useLogin();
  const identifiedRef = useRef(false);

  // Load the SalesIQ widget once when the component mounts
  useEffect(() => {
    loadZohoSalesIQ();
  }, []);

//   // Identify the user whenever `user` becomes available (and only once per session)
//   useEffect(() => {
//     if (user?.email && user?.userName && !identifiedRef.current) {
//       identifySalesIQUser({
//         name: user.userName,
//         email: user.email,
//         phone: user.phone,
//         userId: user._id,
//       });
//       identifiedRef.current = true;
//     }
//   }, [user]);

  return null; // This component does not render anything
}