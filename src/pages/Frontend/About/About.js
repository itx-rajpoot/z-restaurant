import React from 'react';

import { Layout, Row, Col, Card, Typography, Divider } from "antd";
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function About() {
  return (
    <Layout style={{ backgroundColor: "#f0f2f5" }}>
      <Content style={{ padding: '50px' }}>
        <Card 
          bordered={false}
          style={{ backgroundColor: "#ffffff", borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
          <Title level={2} style={{ color: '#1890ff', textAlign: 'center' }}>
            About Z-Restaurant
          </Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#595959' }}>
            Welcome to Z-Restaurant! At our establishment, we are dedicated to delivering an exceptional dining experience, blending quality ingredients with outstanding service. We believe in creating flavors that delight and inspire, bringing our passion for food to each dish we serve.
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#595959' }}>
            Our team of skilled chefs and attentive staff work together to ensure every visit feels like a special occasion. Whether you’re joining us for a casual meal or celebrating a significant event, Z-Restaurant offers a warm ambiance and an extensive menu to satisfy all tastes. We look forward to serving you and making your experience unforgettable.
          </Paragraph>
          <Divider />
          <Title level={3} style={{ color: '#1890ff', textAlign: 'center' }}>
            Contact Us
          </Title>
          <Row gutter={[16, 16]} justify="center" style={{ marginTop: '20px' }}>
            <Col xs={24} sm={12} md={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', backgroundColor: '#e6f7ff', borderRadius: '10px' }}
              >
                <PhoneOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                <Paragraph style={{ fontSize: '16px', marginTop: '10px', color: '#595959' }}>
                  +92 300 9876543
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', backgroundColor: '#fff1b8', borderRadius: '10px' }}
              >
                <MailOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                <Paragraph style={{ fontSize: '16px', marginTop: '10px', color: '#595959' }}>
                  contact@zrestaurant.com
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', backgroundColor: '#ffe7ba', borderRadius: '10px' }}
              >
                <HomeOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />
                <Paragraph style={{ fontSize: '16px', marginTop: '10px', color: '#595959' }}>
                  456 Culinary Lane, Food City, Country
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};
