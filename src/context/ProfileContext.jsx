import { createContext } from "react";

export const ProfileContext = createContext({
  accessToken: {
    profilePhoto: "",
    fullName: "",
    email: "",
  },
  setAccessToken: function () {},
});
