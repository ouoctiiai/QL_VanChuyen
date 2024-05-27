import Delivery from "../Shipper/Pages/Delivery";

export const ROUTERS ={
    
    CUSTOMER: {
        HOME: "/customer",
        PROFILE:"/profile-customer",
        CREATE_ORDER:"/create-order",
        ORDER_LIST:"/order-list",
        ORDER_DETAILS:"/order-details",
        UPDATE_PROFILE: "/update-profile-customer",
        UPDATE_PASSWORD: "/update-password-customer"
    },

    LOGIN:{
        LOGIN: "/login",
        REGISTER: "/register"
    },

    HOME:{
        HOME: "/"
    },

    SHIPPER:{
        HOME: "/shipper_home",
        LISTDONCHO: "/list-don-cho",
        PROFILE: "/profile",
        HISTORY: "/history",
        DASHBOARD: "/dashboard",
        UPDATEPEOFILE: "/UpdateProfile",
        DETAILORDER: "/detailorder/:id",
        DETAILHISTORY: "/detailhistory/:id",
        ORDERATWH: "/orderAtWH",
        DELIVERY: "/delivery/:id"
    },
    
    ADMIN:{
        TRANGCHUADMIN : "/trangchuadmin",
        QLTAIKHOAN: "/qltaikhoan",
        QLTAIXE: "/qltaixe",
        QLXE: "/qlxe",
        TAOTKSHIPPER: "/taotkshipper",
        BARCHART: "/barchart",
        PIECHART: "/piechart",
        LINECHART:"/linechart",
        RADARCHART: "/radarchart",
        TAOPHIEUCHI: "/taophieuchi",
        QLPHIEUCHI: "/qlphieuchi",
    },

    EMPLOYEE:{
        NVHOME: "/nv_home",
        LIST: "/dsdonhang",
        CREATE: "/taodonhang",
        DETAIL: "/chitietdh/:id"
    },
}