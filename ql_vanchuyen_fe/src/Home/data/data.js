//To use the data import the getItems function

//Returns an array of items that can be passed individually
//as a prop to Item component
export const getItems = async () => {
  //Emulate the delay of waiting for server data
  await new Promise((resolve) => setTimeout(500));

  return items;
};

const items = [
  {
    name: "Ibanez RG370AHMZ-BMT Standard",
    imageSrc:
      "https://www.egitana.pt/files/produtos/detalhes/ibanez-rg370ahmz-bmt-standard_5ef4ca208e1b1.jpg?v=8"
  },
  {
    name: "Allbirds Men's Merino Wool Sneakers, Grey, Size 10",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_WL_RN_SF_PDP_Natural_Grey_BTY_20df0c58-8d86-4a8b-9b89-b89da7d46780_600x600.png?v=1600891257"
  },
  {
    name: "Leather shoes",
    imageSrc:
      "https://cdnv2.moovin.com.br/milshoes/imagens/produtos/det/sapato-free-shoes-5ef3499acd9b5.jpg"
  },
  {
    name: "Blue dress",
    imageSrc:
      "https://images-na.ssl-images-amazon.com/images/I/61hYNSzMuoL._AC_UL1001_.jpg"
  },
  {
    name: "Pinstripe Wrap Front Dress",
    imageSrc:
      "https://d1hdvmbk3kpdg7.cloudfront.net/Products/C92631_W20/Pinstripe-Wrap-Front-Dress-C92631-W20_400x800_637245477052174056_C92631-W20-930-1.jpg"
  },
  {
    name:
      "https://www.greenhillsports.com/pub/media/catalog/product/cache/aa591b76794ab2a10ad7768b219c97a7/b/g/bgg-2018_gym_red_2.jpg",
    imageSrc:
      "https://www.greenhillsports.com/pub/media/catalog/product/cache/aa591b76794ab2a10ad7768b219c97a7/b/g/bgg-2018_gym_red_2.jpg"
  },
  {
    name: "Fidget Spinner",
    imageSrc:
      "https://www.papagaiosempenas.pt/wp-content/uploads/2019/02/IMG_2036-e1495814427182-600x600.jpg"
  },
  {
    name: "Led Digital Watch",
    imageSrc:
      "https://b3h2.scene7.com/is/image/BedBathandBeyond/31019441744598p?$690$&wid=690&hei=690"
  },
  {
    name: "Calculator Controller",
    imageSrc:
      "https://partypocket.co.uk/wp-content/uploads/2020/01/Calculator-controller.jpg"
  },
  {
    name: "School Notebook",
    imageSrc:
      "https://cdn.shopclues.com/images/thumbnails/42347/320/320/5711889331531470393464.jpg"
  },
  {
    name: "Women's Backpack",
    imageSrc:
      "https://d1126yhoonl7p4.cloudfront.net/img/p/9/6/3/4/5/96345-large_default.jpg"
  },
  {
    name: "Duley Hat",
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSdfNPfYkZ0p-qWENwiI9Xv_FmONcBYwXZ8fw&usqp=CAU"
  },
  {
    name: "Beta Belt",
    imageSrc:
      "https://www.blackdiamondequipment.com/on/demandware.static/-/Sites-bdel/default/dwa00a3d39/products/apparel/_F17/P_APM4Q2_608_RUST_BetaBelt_web.jpg"
  },
  {
    name: "Wooden Phone Holder",
    imageSrc:
      "https://media.vkfofworcester.co.uk/out/pictures/generated/product/1/1000_1000_75/r1204536-02/wooden-phone-holder-12.0453.6-1.jpg"
  },
  {
    name: "ArgosCanon EOS 250D DSLR Camera Body with 18-55mm IS Lens",
    imageSrc:
      "https://media.4rgos.it/i/Argos/3087776_R_Z001A?w=750&h=440&qlt=70"
  },
  {
    name: "Ibanez RG370AHMZ-BMT Standard",
    imageSrc:
      "https://www.egitana.pt/files/produtos/detalhes/ibanez-rg370ahmz-bmt-standard_5ef4ca208e1b1.jpg?v=8"
  }
];
