import React from 'react'
import { Row, Col, Typography, Input, Button, Space } from "antd";
import { FacebookFilled, TwitterSquareFilled, InstagramFilled } from "@ant-design/icons";
import { Link } from 'react-router-dom';


const { Title, Text } = Typography;
export default function Footer() {
  return (
    <>
         <footer className="footer">
      <div className="container">
        <Row gutter={[16, 16]} className="footer-content">
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">
              About Us
            </Title>
            <Text className="footer-text">
              We are providing all types of food, like Fast foods, pakistani foods, Desserts, and many more.
            </Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">
              Quick Links
            </Title>
            <ul className="footer-links">
              <li><Link to="/home" >Home</Link></li>
              <li><Link to="/frontend/about" >About</Link></li>
              <li><a href="/collection">Menu</a></li>
              <li><a href="/auth/register">Order</a></li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">
              Contact Us
            </Title>
            <Text className="footer-text">
              Email: support@example.com <br />
              Phone: +123 456 7890 <br />
              Address: 123 Z-restaurant St, Shop City, pakistan
            </Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="footer-title">
              Newsletter
            </Title>
            <Space direction="vertical">
              <Text className="footer-text">
                Subscribe to our newsletter for the latest updates and offers.
              </Text>
              <Input placeholder="Enter your email" className="newsletter-input" />
              <Button type="primary">Subscribe</Button>
            </Space>
          </Col>
        </Row>
        <Row justify="center" className="social-icons">
          <Space size="middle">
           
              <FacebookFilled style={{ fontSize: '24px', color: '#3b5998' }} />
       
         
             <TwitterSquareFilled style={{ fontSize: '24px', color: '#1da1f2' }} />
           
           
              <InstagramFilled style={{ fontSize: '24px', color: '#e1306c' }} />
              </Space>
          
        </Row>
        <Row justify="center" className="footer-bottom">
          <Col>
            <Text className="footer-text">
              &copy; 2024 Your z-restaurant Site. All Rights Reserved.
            </Text>
          </Col>
        </Row>
      </div>
    </footer>
    </>
  )
}
