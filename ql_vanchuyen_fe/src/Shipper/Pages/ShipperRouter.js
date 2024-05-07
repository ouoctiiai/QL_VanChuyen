import React from 'react'
import Navbar from '../Components/Navbar';
import History from "./History";
import Profile  from "./Profile";
import ListDonCho  from "./ListDonCho";
import Dashboard  from "./Dashboard";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route , Router} from "react-router-dom";

function ShipperRouter() {
  return (
    <div>
      <Navbar />
        <Switch>
            <Route path="/shipper_home/" element={<ListDonCho />} />
            <Route path="/shipper_home/history" element={<History />} />
            <Route path="/shipper_home/dashboard" element={<Dashboard />} />
            <Route path="/shipper_home/profile" element={<Profile />} />
            <Route path="*"> 404 not found </Route>
        </Switch>
    </div>
  )
}

export default ShipperRouter
