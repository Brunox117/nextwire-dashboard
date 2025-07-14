import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../store/authSlice/authSlice";
import { checkSession } from "../helpers/supabaseDB/helpers";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const verifySession = async () => {
      const { ok, uid, name, errorMessage } = await checkSession();
      if (!ok) return dispatch(logout({ errorMessage }));
      dispatch(login({ uid, displayName: name }));
    };
    verifySession();
  }, []);
  return {
    status,
  };
};
