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

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            
          <Route path= "/login" element={<Login />}/>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to= "/dashboard" replace />}/>
              <Route path= "/dashboard" element={<Dashboard />}/>
              <Route path= "/hoax" element={<Hoax />}/>
              <Route path= "/faq" element={<Faq />}/>
              <Route path= "/createFAQ" element={<CreateQA />}/>
              <Route path= "/create" element={<CreateHoax />}/>
              <Route path="/client/faq/:id/editdatafaq" element={<EditQA />} />
              <Route path="/client/qahoaxnews/:id/editdataqahoaxnews" element={<EditQAHoaxNews />} />
              <Route path= "/admin" element={<Register />}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
