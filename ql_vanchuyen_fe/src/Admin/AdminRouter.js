import { Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import "./index.css";
import { Switch } from "react-router-dom/cjs/react-router-dom";
import { ROUTERS } from './../Path/router';
import Team from "./scenes/QLTaiKhoan";
import DSTaiXe from "./scenes/QLTaiXe";
import DSXe from "./scenes/QLXe";
import Form from "./scenes/TaoTKShipper";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import AdminLayout from "./AdminLayout";
import Bar from "./scenes/Charts/BarChart";
import Line from "./scenes/Charts/LineChart";
import Pie from "./scenes/Charts/PieChart";
import PhieuChi from "./scenes/TaoPhieuChi";
import DSPhieuChi from "./scenes/QLPhieuChi";
import Radar from "./scenes/Charts/Radar";
import history from './../history';
import AdminDashboard from "./scenes/dashboard";


const renderAdminRouter = () => {
  const adminRouter = [
    {
      path: ROUTERS.ADMIN.QLTAIKHOAN,
      component: Team
    },
    {
      path: ROUTERS.ADMIN.QLTAIXE,
      component: DSTaiXe
    },
    {
      path: ROUTERS.ADMIN.QLXE,
      component: DSXe
    },
    {
      path: ROUTERS.ADMIN.TAOTKSHIPPER,
      component: Form
    },
    {
      path: ROUTERS.ADMIN.DASHBOARD,
      component: AdminDashboard
    },
    {
      path: ROUTERS.ADMIN.BARCHART,
      component: Bar
    },
    {
      path: ROUTERS.ADMIN.RADARCHART,
      component: Radar
    },
    {
      path: ROUTERS.ADMIN.LINECHART,
      component: Line
    },
    {
      path: ROUTERS.ADMIN.PIECHART,
      component: Pie
    },
    {
      path: ROUTERS.ADMIN.TAOPHIEUCHI,
      component: PhieuChi
    },
    {
      path: ROUTERS.ADMIN.QLPHIEUCHI,
      component: DSPhieuChi
    },
  ]
  return (
    <AdminLayout>
        {
            adminRouter.map((item, key) => {
              return <Route key={key} path={item.path} component={item.component} history={history} />
            })
          }
      </AdminLayout>
  );
}

const AdminRouter = () => {
  return renderAdminRouter();
};

export default AdminRouter;
