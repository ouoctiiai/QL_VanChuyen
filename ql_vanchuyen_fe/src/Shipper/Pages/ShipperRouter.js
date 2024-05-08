import React from 'react'
import Navbar from '../Components/Navbar';
import History from "./History";
import Profile  from "./Profile";
import ListDonCho  from "./ListDonCho";
import Dashboard  from "./Dashboard";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route , Router} from "react-router-dom";
import UpdateProfile from './UpdateProfile';
import DetailOrder from './DetailOrder';

function ShipperRouter() {
  return (
    <div>
      <Navbar />
      {/* <ListDonCho />
      <Dashboard /> 
      <UpdateProfile /> 
      <History />
      <Profile /> */}


      <DetailOrder />

        <Switch>
            <Route path="/" element={<ListDonCho />} />
            <Route path="/history" element={<History />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*"> 404 not found </Route>
        </Switch>
    </div>
  )
}

export default ShipperRouter
