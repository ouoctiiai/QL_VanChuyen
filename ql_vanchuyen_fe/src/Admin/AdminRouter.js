import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import "./index.css";


import BarChart from "./components/BarChart";
import GeographyChart from "./components/GeographyChart";
import Header from "./components/Header";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import ProgressCircle from "./components/ProgressCircle";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import Team from './scenes/team/QLTeam';
// import Calendar from './scenes/calendar/calendar';
import StatBox from "./components/StatBox";


function AdminRouter() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Switch>
            <Route path="/dashboad" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            {/* <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/form" element={<Form />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/geography" element={<Geography />} /> */}
          </Switch>

        <Dashboard>
          <Header/>
          <StatBox/> 
          <ProgressCircle/>
          <BarChart/>
          <LineChart/>
          <PieChart/>
          <GeographyChart/>
        </Dashboard>
        </main>
      </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AdminRouter;
