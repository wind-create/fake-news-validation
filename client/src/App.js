import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Hoax from "scenes/hoax";
import Faq from "scenes/faq";
import CreateQA from "scenes/createQA";
import EditQA from "scenes/editQA";
import EditQAHoaxNews from "scenes/editQAHoaxNews";
import CreateHoax from "scenes/createHoax";
import Register from "scenes/register";
import Login from "scenes/login";
import Manager from "scenes/manager";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = localStorage.getItem("token");
  
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            
          <Route path= "/" element={isAuth ? <Navigate to="/dashboard" /> : <Login />}/>
            <Route element={<Layout />}>
              <Route path= "/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/" />}/>
              <Route path= "/hoax" element={isAuth ? <Hoax /> : <Navigate to="/" />}/>
              <Route path= "/faq" element={isAuth ? <Faq /> : <Navigate to="/" />}/>
              <Route path= "/createFAQ" element={isAuth ? <CreateQA /> : <Navigate to="/" />}/>
              <Route path= "/create" element={isAuth ? <CreateHoax /> : <Navigate to="/" />}/>
              <Route path="/client/faq/:id/editdatafaq" element={isAuth ? <EditQA /> : <Navigate to="/" />} />
              <Route path="/client/qahoaxnews/:id/editdataqahoaxnews" element={isAuth ? <EditQAHoaxNews /> : <Navigate to="/" />} />
              <Route path= "/create_manager" element={isAuth ? <Register />  : <Navigate to="/" />}/>
              <Route path= "/manager" element={isAuth ? <Manager />: <Navigate to="/" />}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
