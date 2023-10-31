import { useContext } from "react";
import UserContext from "../context/Context";

export default function UseUser() {
  return useContext(UserContext);
}
