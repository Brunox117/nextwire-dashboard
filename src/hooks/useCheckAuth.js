import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice/authSlice";
import { FirebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout());
      const { uid, displayName } = user;
      dispatch(login({ uid, displayName }));
    });
  }, []);
  return {
    status,
  };
};
