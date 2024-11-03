import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import {isEmail, toastify } from "../../config/global"

import { auth } from "../../config/firebase";

import { Button, Form, Input, Row, Col, Typography } from 'antd';
import { RiMailLine } from "react-icons/ri";

const { Title } = Typography;
 
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isProcessing,setIsProcessing]= useState(false)
const navigate= useNavigate()
  const handleOnChange = (e) => setEmail(e.target.value);

  const handlePasswordReset = () => {
    setIsProcessing(true)
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toastify('Password reset email sent successfully!',"success");
        })
        .catch((error) => {
          toastify(`Error: ${error.message}`,"error");
        })
        .finally(()=>{
          setIsProcessing(false)
navigate("/auth/login")
        })
    } else {
     toastify('Please enter your email.',"warning");
    }


  };

  return (
    <main>
      <div className="container-fluid d-flex align-content-center justify-content-centermin-vh-100 bg-light   ">
         <div className="card p-3 shadow" style={{ width:"500px" }}>
              <Title level={2} className="text-center my-3">Forgot Password</Title>
              <Form>
                <Row gutter={[18, 18]}>
                  <Col span={16} offset={4}>
                    <Input
                        prefix={<RiMailLine />}
                        className="py-2"
                        size="large"
                        type="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter your email"
                      />
                  
                  </Col>
                 
                  <Col span={16} offset={4}>
                    <Button type='primary' size='large' block onClick={handlePasswordReset} loading={isProcessing}   >
                      Reset Password
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
       
    </main>
  );
}
