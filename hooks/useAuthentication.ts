import { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from "../supabase";
import { ErrorType } from "../types";

interface SigninType {
  email: string;
  password: string;
}

interface SignupHandler extends SigninType {
  fullname: string;
}

type UseAuthenticationReturnType = {
  loading: boolean;
  request: (...params: any) => any;
};

type UseAuthenticationType = {
  googleSignin: UseAuthenticationReturnType;
  appleSignin: UseAuthenticationReturnType;
  signin: UseAuthenticationReturnType;
  signup: UseAuthenticationReturnType;
  googleLogout: UseAuthenticationReturnType;
  appleLogout: UseAuthenticationReturnType;
  logout: UseAuthenticationReturnType;
};

export default function useAuthentication(): UseAuthenticationType {
  const [googleSigninLoading, setGoogleSigninLoading] = useState(false);
  const [signinLoading, setSigninLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [googleLogoutLoading, setGoogleLogoutLoading] = useState(false);
  const [error, setError] = useState<
    ErrorType<"email" | "password" | "fullname">
  >({
    field: "",
    message: "",
  });

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
      iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
      //@ts-ignore
      androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    });
  }, []);

  const googleSignin = async () => {
    try {
      setGoogleSigninLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
    } catch (error: any) {
      //   setError(error);
    } finally {
      setGoogleSigninLoading(false);
    }
  };

  const appleSignin = async () => {};

  const signin = async ({ email, password }: SigninType) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      //   setError({
      //     field: "email",
      //     message: "Invalid email address",
      //   });
      return;
    }

    setSigninLoading(true);
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error) {
      console.error(error);
    } finally {
      setSigninLoading(false);
    }
  };

  const signup = async ({ fullname, email, password }: SignupHandler) => {
    if (!fullname) {
      //   setError({
      //     field: "fullname",
      //     message: "Fullname is required",
      //   });

      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      //   setError({
      //     field: "email",
      //     message: "Invalid email address",
      //   });

      return;
    }

    setSigninLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            fullname,
          },
        },
      });

      if (error) throw error;
      //   if (!data.session)
      //     router.push({
      //       pathname: "/auth/authScreens/ActivateAccount",
      //       params: {
      //         email,
      //       },
      //     });
    } catch (error) {
      console.error(error);
    } finally {
      setSignupLoading(false);
    }
  };

  const googleLogout = async () => {
    try {
      setGoogleLogoutLoading(true);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (err) {
      console.log(err);
    } finally {
      setGoogleLogoutLoading(false);
    }
  };

  return {
    googleSignin: { loading: googleSigninLoading, request: googleSignin },
    appleSignin: { loading: false, request: () => {} },
    signin: { loading: signinLoading, request: signin },
    signup: { loading: signupLoading, request: signup },
    googleLogout: { loading: googleLogoutLoading, request: googleLogout },
    appleLogout: { loading: false, request: () => {} },
    logout: { loading: false, request: () => {} },
  };
}
