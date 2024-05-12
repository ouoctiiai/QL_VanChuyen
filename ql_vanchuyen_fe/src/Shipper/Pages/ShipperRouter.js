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
        <Switch>
            <Route path="/">
              <ListDonCho />
            </Route>
            <Route path="/history" element={<History />} ></Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/detailorder/:id" element= { <DetailOrder /> }/>
            <Route path="*"> 404 not found </Route>
        </Switch>
    </div>
  )
}

export default ShipperRouter
