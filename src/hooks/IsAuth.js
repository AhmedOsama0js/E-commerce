// import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// const useIsAuth = () => {
//   const [state, setState] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const accessToken = Cookies.get("access_token");
//       try {
//         const response = await axios.get(
//           "http://localhost:8008/api/v1/users/getMe",
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         const data = response.data;
//         setState(data);
//       } catch (error) {
//         console.error("Error fetching user data:", error.message);
//         setState({});
//       }
//     };

//     fetchData();
//   }, []);
//   return state;
// };

// export default useIsAuth;
