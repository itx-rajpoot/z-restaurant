import laptop from "./card_images/laptop.jpg"
import headPhones_lightGray from "./card_images/headPhones-lightGray.jpg"
import leather_watch from "./baner_images/leather-watch.jpg"
import shoes from "./card_images/shoes.jpg"
import hand_bage from "./card_images/hand_bage.jpg"
import smart_phone from "./card_images/smart_phone.avif"


export const wishlistData= [
    {
      "id": 1,
      "productName": "Wireless Earbuds",
      "brand": "SoundTech",
      "price": 49.99,
      "image": headPhones_lightGray,
      "addedDate": "2024-09-19",
      "inStock": true
    },
    {
      "id": 2,
      "productName": "Smart Watch",
      "brand": "TimeMax",
      "price": 199.99,
      "image":leather_watch,
      "addedDate": "2024-09-18",
      "inStock": false
    },
    {
      "id": 3,
      "productName": "Gaming Laptop",
      "brand": "TechGear",
      "price": 1199.99,
      "image": laptop,
      "addedDate": "2024-09-17",
      "inStock": true
    },
    // {
    //   "id": 4,
    //   "productName": "Bluetooth Speaker",
    //   "brand": "AudioPro",
    //   "price": 79.99,
    //   "image": "https://example.com/images/bluetooth-speaker.jpg",
    //   "addedDate": "2024-09-16",
    //   "inStock": true
    // },
    // {
    //   "id": 5,
    //   "productName": "4K TV",
    //   "brand": "UltraView",
    //   "price": 599.99,
    //   "image": "https://example.com/images/4k-tv.jpg",
    //   "addedDate": "2024-09-15",
    //   "inStock": false
    // }
  ]

  export const cartData = [
    {
      id: 1,
      title: "Men's Casual Shoes",
      price: 49.99,
      quantity: 2,
      image: shoes,
    },
    {
      id: 2,
      title: "Women's Handbag",
      price: 89.99,
      quantity: 1,
      image: hand_bage,
    },
    {
      id: 3,
      title: "Smartphone X",
      price: 699.99,
      quantity: 1,
      image: smart_phone,
    },
    // {
    //   id: 4,
    //   title: "Wireless Earbuds",
    //   price: 29.99,
    //   quantity: 3,
    //   image: "https://example.com/images/wireless-earbuds.jpg",
    // },
    // {
    //   id: 5,
    //   title: "Kids' Toy Set",
    //   price: 24.99,
    //   quantity: 1,
    //   image: "https://example.com/images/kids-toy-set.jpg",
    // },
  ];
  