import { create } from "zustand";
import { persist } from "zustand/middleware";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../services/fireBaseConfig.js";

/**
 * Google authentication provider instance
 * Used to trigger the Google login popup
 */
const provider = new GoogleAuthProvider();

/**
 * Initial authentication state
 * This is reused on logout to fully reset the store
 */
const initialState = {
  isLoading: false, // Indicates if an auth action is in progress
  isLoggedIn: false, // Whether the user is authenticated
  userName: null, // Display name or email of the logged user
  error: null, // Authentication error message (if any)
};

/**
 * Authentication store using Zustand
 * - Handles login (manual & Google)
 * - Persists session using localStorage
 */
const useLoginStore = create(
  persist(
    (set) => ({
      /* =======================
         STATE
      ======================== */
      ...initialState,

      /* =======================
         MANUAL SIGNUP (MOCK)
         Used for challenge requirements
      ======================== */

      /**
       * Simulates a manual signup/login
       * This is a frontend-only implementation
       */
      signup: (userName) => {
        set({ isLoading: true });

        try {
          set({
            isLoading: false,
            isLoggedIn: true,
            userName,
          });
        } catch {
          set({
            isLoading: false,
            error: "Signup error",
          });
        }
      },

      /* =======================
         GOOGLE AUTHENTICATION
      ======================== */

      /**
       * Logs in the user using Google authentication (Firebase)
       * Opens a Google popup and retrieves user information
       */
      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });

        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;

          set({
            isLoading: false,
            isLoggedIn: true,
            userName: user.displayName || user.email,
          });
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          set({
            isLoading: false,
            error: "Google login failed",
          });
        }
      },

      /* =======================
         LOGOUT
      ======================== */

      /**
       * Logs out the user from Firebase
       * Clears all persisted authentication state
       */
      logout: async () => {
        await signOut(auth);
        set(initialState);
      },

      /* =======================
         ERROR HANDLING
      ======================== */

      /**
       * Clears authentication error message
       */
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      /**
       * Persist auth state in localStorage
       * Keeps the user logged in on page refresh
       */
      name: "auth-storage",
    }
  )
);

export default useLoginStore;
