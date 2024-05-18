import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../Store/getMeSlice";
import Cookies from "js-cookie";

export const useUserData = () => {
  const { loading } = useSelector((state) => state.me);

  const [role, setRole] = useState("wait");
  const [userData, setUserDAta] = useState(null);
  const dispatch = useDispatch();
  const cookies = Cookies.get("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cookies) {
          const response = await dispatch(getMe(cookies));
          setRole(response.payload?.data?.role);
          setUserDAta(response.payload?.data);
        } else {
          setRole("guest");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setRole("guest");
      }
    };
  console.log(role);
    fetchData();
  }, [cookies, dispatch, role]);
  return { role, userData, loading };
};
