// import React, { useEffect, useState } from "react";
// const UserIpComponent = () => {
//   const [userIp, setUserIp] = useState(null);
//   const getUserIp = async () => {
//     try {
//       const response = await axios.get("https://ipinfo.io");
//       const { ip } = response.data;
//       return ip;
//     } catch (error) {
//       console.error("Error fetching IP:", error.message);
//       return null;
//     }
//   };
//   useEffect(() => {
//     const fetchUserIp = async () => {
//       const ip = await getUserIp();
//       setUserIp(ip);
//     };
//     fetchUserIp();
//   }, []);
//   return (
//     <div>
//       <h1>User IP Address:</h1>
//       {userIp ? <p>{userIp}</p> : <p>Loading...</p>}
//     </div>
//   );
// };
// export default UserIpComponent;
