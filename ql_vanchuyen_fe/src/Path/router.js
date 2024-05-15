export const ROUTERS ={
    
    CUSTOMER: {
        HOME: "/customer",
        PROFILE:"/profile-customer",
        CREATE_ORDER:"/create-order",
        ORDER_LIST:"/order-list",
        ORDER_DETAILS:"/order-details"
    },

    LOGIN:{
        LOGIN: "/login",
        REGISTER: "/register"
    },

    SHIPPER:{
        HOME: "/shipper_home",
        PROFILE: "/profile",
        HISTORY: "/history",
        DASHBOARD: "/dashboard",
        DETAILORDER: "/detailorder",
        UPDATEPEOFILE: "/UpdateProfile",
        DETAILORDER: "/detailorder/:id"
    },
    
    ADMIN:{
        TRANGCHUADMIN : "/trangchuadmin",
        QLTAIKHOAN: "/qltaikhoan",
        QLTAIXE: "/qltaixe"
    },

    EMPLOYEE:{
        HOME: "/nv_home",
        LIST: "/dsdonhang",
        CREATE: "/taodonhang",
        DETAIL: "/chitietdh"
    },
}