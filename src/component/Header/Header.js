import React, { useEffect, useState } from "react";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button,  Space,Dropdown, List,Avatar,Empty,Typography,message,} from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { UseCartContext } from "../../context/CartContext";

import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import logo from "../Assets/logo.jpg"

const { Title } = Typography;

const DropdownWishlist = ({ wishlist }) => {
  return (
    <div
      className="card"
      style={{
        width: "400px",
        maxHeight: wishlist.length > 5 ? "350px" : "auto",
        overflowY: wishlist.length > 5 ? "scroll" : "visible",
      }}
    >
      {wishlist.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={wishlist}
          renderItem={(item, index) => (
            <List.Item
              className="px-2"
              actions={[
                <Button
                  key="list-loadmore-edit"
                  style={{ color: "red", border: "none", fontSize: "18px" }}
                >
                  <DeleteOutlined />
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image} size={70} shape="square" />}
                title={<Title level={4}>{item.productName}</Title>}
                description={`Price: $${item.price}`}
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty description={"No items in wishlist"} />
      )}
      <hr />
      <button className="btn btn-md my-2 mx-2  border wishList">Wish List</button>
    </div>
  );
};

export default function Header() {
  const { isAuthentication, isAdmin, handleLogout, user } = useAuthContext();
  const { removeFromCart } = UseCartContext();
 
  const [Admin, setAdmin] = useState();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
      const Admin = isAdmin
      setAdmin(Admin)
      console.log("ISADmin", isAdmin)
      console.log("isAuthentication", isAuthentication)
    const handleScreenSize = () => {
      if (window.innerWidth < 992) {
        setIsCartOpen(false);
        setIsWishlistOpen(false);
      }
    };
    window.addEventListener("resize", handleScreenSize);

    const fetchCart = () => {
      if (!isAuthentication || !user) return;

      const cartRef = doc(firestore, "carts", user.uid);

      // Real-time listener for cart changes
      const unsubscribe = onSnapshot(cartRef, (cartDoc) => {
        if (cartDoc.exists()) {
          const items = cartDoc.data().items || [];
          setCartItems(items); 
        } else {
          setCartItems([]);
          message.info("Your cart is empty. Time to fill it up with goodies! 🎁");
        }
      });

      return () => unsubscribe(); 
    }; 
    
    if (isAuthentication) fetchCart();

    return () => window.removeEventListener("resize", handleScreenSize);
  }, [ isAuthentication, user]);

  const DropdownCart = ( {cart }) => {
    return (
      <div
        className="card"
        style={{
          width: "400px",
          maxHeight: cart.length > 5 ? "350px" : "auto",
          overflowY: cart.length > 5 ? "scroll" : "visible", }}>
        {cart.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item) => (
              <List.Item
                className="px-2"
                actions={[
                  <Button
                    key="list-loadmore-edit"
                    style={{ color: "red", border: "none", fontSize: "18px" }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteOutlined />
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image} size={70} shape="square" />}
                  title={<Title level={4}>{item.title}</Title>}
                  description={`Price: $${item.newPrice}`}
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty description={"No items in cart"} />
        )}
        <hr />
        <button className="btn btn-md my-2 mx-2 border wishList">View Cart</button>
        <button className="btn btn-md my-2 mx-2 border wishList bg-dark text-light">CheckOut</button>
      </div>
    );
  };

  return (
    <header style={{position:"sticky",zIndex:1000,top:0 }}>
      <nav className="navbar navbar-expand-lg shadow ">
        <div className="container">
          <Link to="/home" className="navbar-brand">
            <img
            style={{width:"100px"}}
              src={logo}
              alt="Z-Restuarant"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/home" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/frontend/about" className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Menu
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/frontend/collection/dessert" className="dropdown-item">
                      Desserts
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/frontend/collection/fast-food" className="dropdown-item">
                      Fast Food
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/frontend/collection/pak-food" className="dropdown-item">
                      Pakistani Food
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/frontend/collection/juices" className="dropdown-item">
                      Drinks
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/auth/register" className="nav-link">
                  Order
                </Link>
              </li>
            </ul>
            <div className="d-none d-md-flex gap-4">
              {!isAuthentication ? (
                <Button type="primary" onClick={() => navigate("/auth/login")}>
                  Login
                </Button>
              ) : (
                <Space>
                  {!Admin && (
                    <Button type="primary" onClick={handleLogout}>
                      Logout
                    </Button>
                  )}

                  {Admin && (
                    <>
                      <Button type="primary"  onClick={handleLogout}>
                        Logout
                      </Button>
                      <Button onClick={()=>{navigate("/dashboard")}}   type="primary">
                        Dashboard
                      </Button>
                    </>
                  )}

                  <div style={{ borderLeft: "1px solid #cad2c5", paddingLeft: 15 }}>
                    <Space size="middle">
                      <Dropdown
                        placement="bottomRight"
                        trigger={"click"}
                        dropdownRender={() => <DropdownWishlist wishlist={cartItems} />}
                        open={isCartOpen}
                        onOpenChange={(visiable) => setIsCartOpen(visiable)}
                      >
                        <Badge count={0} showZero>
                          <HeartOutlined className="like-count fs-3" />
                        </Badge>
                      </Dropdown>
                      <Dropdown
                        placement="bottomRight"
                        trigger={"click"}
                        dropdownRender={() => <DropdownCart cart={cartItems} />}
                        open={isWishlistOpen}
                        onOpenChange={(visiable) => setIsWishlistOpen(visiable)}
                      >
                        <Badge count={cartItems.length} showZero>
                          <ShoppingCartOutlined className="cart-count fs-3" />
                        </Badge>
                      </Dropdown>
                    </Space>
                  </div>
                </Space>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
