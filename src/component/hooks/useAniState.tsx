import React from "react";
import { reState } from "../ui/UI2aniContext";

const useAniState = () =>  {
    const state = React.useContext(reState)

    return state;
  };
  
  export default useAniState;