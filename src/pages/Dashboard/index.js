import React, { useState } from 'react';
import {  PlusOutlined,  UserAddOutlined,  HomeOutlined,SettingOutlined ,ProductOutlined,ShoppingCartOutlined,BarsOutlined,ArrowLeftOutlined } from '@ant-design/icons';
import {  Layout, Menu  } from 'antd';
import { useNavigate } from 'react-router-dom';
import Routes from "./Routes"


const {Sider } = Layout;
function getItem(label, key, icon,onClick, children) {
  return {
    key,
    icon,
    children,
    label,
    onClick,    
  };
}

const App = () => {
  const navigate= useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    getItem('Home', '1',  <HomeOutlined />,() => navigate("/dashboard")),
  
    getItem('Products', 'sub1',<ProductOutlined />,()=>{},[
      getItem('Add   products', '3', <PlusOutlined />, () => navigate("/dashboard/addproducts")),
      getItem('All products', '4',<BarsOutlined />,()=>{navigate("/dashboard/showallproducts")}),
      getItem('Update products', '5',<ShoppingCartOutlined />,()=>{navigate("/dashboard/updateproduct")}),
      
    ]),
    getItem('Setting', 'sub2', <SettingOutlined />,()=>{}, [getItem('Account', '6')]),
    getItem('Profile', '9', <UserAddOutlined />),
  ];

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
       <Routes/>
       
      </Layout>
    </Layout>
  );
};
export default App;