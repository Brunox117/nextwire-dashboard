import { supabaseDB } from "./supabaseInstance";

export const loginWithEmailPassword = async ({ email, password }) => {
  const { data, error } = await supabaseDB.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }

  const { user } = data;
  return {
    ok: true,
    uid: user.id,
    name: user.user_metadata?.name || user.email,
  };
};

export const logoutSupabase = async () => {
  await supabaseDB.auth.signOut();
};

export const checkSession = async () => {
  const {
    data: { session },
    error,
  } = await supabaseDB.auth.getSession();
  if (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
  if (session) {
    const { user } = session;
    return {
      ok: true,
      uid: user.id,
      name: user.user_metadata?.name || user.email,
    };
  }
  return {
    ok: false,
    errorMessage: "No active session",
  };
};
