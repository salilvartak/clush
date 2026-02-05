import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "885455459982-kfda950i4pb5al05slgtoko392aqpcnq.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.authentication?.idToken;

      if (!idToken) return;

      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(idToken);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return { promptAsync };
}
