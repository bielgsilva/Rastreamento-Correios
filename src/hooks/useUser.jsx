import { useContext } from "react";
import UserContext from "../context/Context";

export default function useUser() {
  return useContext(UserContext);
}
