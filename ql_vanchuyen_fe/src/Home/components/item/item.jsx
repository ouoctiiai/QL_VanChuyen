import React from "react";
import "./item.style.css";

export const Item = (props) => {
  const { imageSrc, name, description } = props;
  console.log(imageSrc);
  return (
    <div id="item-container">
      {/* <img src={imageSrc} alt={name} />
      <div id="item-title">
        <b>{name}</b>
      </div>
      <div id="item-description">{description}</div> */}
      <div className="content">
        <div style={{display: "flex", justifyContent: "center"}}>
          <h2>Phương thức hoạt động</h2>
        </div>
        <div style={{ backgroundColor: "#efefef" }}>
          <div className="list-group list-group-horizontal py-3" style={{marginLeft: "100px", marginRight: "100px"}}>
            <div style={{ width: "18rem", display: "flex", alignItems: "center", flexDirection: "column", borderRight: "2px dashed white", padding: "10px"}}>
              <img src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-1.png" class="card-img-top" alt="..." />
              <h3 style={{ color: "#01904a", textAlign: "center"}}>Tiếp nhận đơn hàng</h3>
              <p class="card-text" style={{textAlign: "center"}}>Shop đăng nhập và đăng đơn hàng cho trung tâm điều vận GHTK qua hệ thống quản lý riêng.</p>
            </div>
            <div style={{ width: "18rem", display: "flex", alignItems: "center", flexDirection: "column", borderRight: "2px dashed white", padding: "10px"}}>
              <img src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-2.png" class="card-img-top" alt="..." />
              <h3 style={{ color: "#01904a" }}>Lấy hàng</h3>
              <p class="card-text" style={{textAlign: "center"}}>Nhân viên GHTK qua địa chỉ shop để lấy hàng tận nơi.</p>
            </div>
            <div style={{ width: "18rem", display: "flex", alignItems: "center", flexDirection: "column", borderRight: "2px dashed white", padding: "10px"}}>
              <img src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-3.png" class="card-img-top" alt="..." />
              <h3 style={{ color: "#01904a" }}>Giao hàng</h3>
              <p class="card-text" style={{textAlign: "center"}}>GHTK giao hàng cho khách hàng và thu hộ tiền trực tiếp (Cash on Delivery).</p>
            </div>
            <div style={{ width: "18rem", display: "flex", alignItems: "center", flexDirection: "column", borderRight: "2px dashed white", padding: "10px"}}>
              <img src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-4.png" class="card-img-top" alt="..." />
              <h3 style={{ color: "#01904a" }}>Đối soát</h3>
              <p class="card-text" style={{textAlign: "center"}}>GHTK đối soát trả tiền cho shop (3 lần/tuần) qua tài khoản ngân hàng. Đồng thời gửi biên bản đối soát định kì vào email.</p>
            </div>
            <div style={{ width: "18rem", display: "flex", alignItems: "center", flexDirection: "column", padding: "7px"}}>
              <img src="https://giaohangtietkiem.vn/wp-content/themes/giaohangtk/images/bkg-active-5.png" class="card-img-top" alt="..." />
              <h3 style={{ color: "#01904a" }}>Kết thúc</h3>
              <p class="card-text" style={{textAlign: "center"}}>Giao dịch hoàn thành.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
