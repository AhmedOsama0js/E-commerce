import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../Store/getMeSlice";
import Cookies from "js-cookie";

export const useUserData = () => {

  const [role, setRole] = useState("wait");
  const dispatch = useDispatch();
  const cookies = Cookies.get("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cookies) {
          const response = await dispatch(getMe(cookies));
          setRole(response.payload?.data?.role);
        } else {
          setRole("guest");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setRole("guest");
      }
    };

    fetchData();
  }, [cookies, dispatch]);

  return { role };
};
