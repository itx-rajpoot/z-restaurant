import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import {isEmail, toastify } from "../../config/global"

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Typography } from 'antd';
import { RiMailLine } from "react-icons/ri";


import { doc, setDoc } from "firebase/firestore";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {auth, firestore} from "../../config/firebase"






const { Title } = Typography;
const initialize = { fullname: "", email: "", password: "" };

export default function Register() {
   const {dispatch}=useAuthContext()
    const [state, setState] = useState(initialize);
    const [isProcessing, setIsProcessing]= useState(false)
    const navigate= useNavigate()

  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { fullname, email, password } = state;

    fullname = fullname.trim();
    if (fullname.length === 0 || email.length === 0 || password.length === 0) {return toastify("Please fill all inputs.", "error");   }
    if (fullname.length < 3) {return toastify("Fullname must be at least 3 characters long.", "error");}

    if (!isEmail(email)) {return toastify("Please enter a valid email address.", "error");}
    if (password.length < 6) {return toastify("Password must be at least 6 characters long.", "error");}
setIsProcessing(true)

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    creatUserProfile(user)
   toastify("A user has been successfully reagister", "success");
    
})
.catch((error) => {
       console.error("error", error)
           switch(error.code){
            case "auth/email-already-in-use":
               toastify("Email already in register","error");
                break;
                default:toastify("Something went wrong while creating new user","error");
           }
    
})
.finally(()=>{
    setIsProcessing(false)
    setState(initialize)
   
 
})

  };


  const creatUserProfile=async(userCredential)=>{
    const {uid} =  userCredential
    const {fullname,email}=state
    const user= {
     uid,fullname,email,status:"active",role:["customer"]
    };
    await setDoc(doc(firestore,"users",uid),user)
  dispatch({type:"SET_LOGGED_IN",payload:(user)})
  navigate("/home")

  }

  return (
    <main>
        
      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
       
            <div className="card p-3 shadow" style={{ width:"500px"}}>
              <Title level={2} className="text-center my-3">Register</Title>
              <Form>
                <Row gutter={[20, 20]}>
                  <Col span={20} offset={2}>
                    <Input
                      prefix={<UserOutlined />}
                      size="large"
                      className="py-2"
                      type="text"
                      name="fullname"
                      placeholder="Enter your name"
                      value={state.fullname}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={20} offset={2}>
                    <Input
                      prefix={<RiMailLine />}
                      className="py-2"
                      size="large"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={state.email}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={20} offset={2}>
                    <Input.Password
                      prefix={<LockOutlined />}
                      className="py-2"
                      size="large"
                      name="password"
                      placeholder="Enter your Password"
                      value={state.password}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={20} offset={2}>
                    <Button type='primary' size='large' block loading={isProcessing} disabled={isProcessing} onClick={handleSubmit}>Register</Button>
                  </Col>
                </Row>
              </Form>
              <Row>
                <Col span={24}>
                  <p className="pt-2 text-center">Already Have an Account? 
                    <Link to='/auth/login'>Login</Link>
                  </p>
                </Col>
              </Row>
            </div>
          </div>
      
      
    </main>
  );
}
