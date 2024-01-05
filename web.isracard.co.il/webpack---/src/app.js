import React, {useEffect,  useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import OnlineBankingDialog from "./views/Dialogs/OnlineBankingDialog";

const App = () => {
  const theme = useTheme();
  useEffect(() => {
 
 
}, []);



  return (
    <>
      <Router>
      
      <OnlineBankingDialog/>
        </Router>
     
    </>
  );
};

export default App;
