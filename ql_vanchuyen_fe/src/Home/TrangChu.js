import React from "react";
import { Header } from "./header/newHeader/siteHeader";
import { Item } from "./components/item/item";
import "./TrangChu.scss";

const props = {
  imageSrc:
    "https://www.egitana.pt/files/produtos/detalhes/ibanez-rg370ahmz-bmt-standard_5ef4ca208e1b1.jpg?v=8",
  name: "Ibanez RG370AHMZ-BMT Standard"
};
console.log(props);
export default function App() {
  return (
    <div className="home">
      <Header />
      <div id="body-content">
        <Item {...props} />
      </div>
    </div>
  );
}