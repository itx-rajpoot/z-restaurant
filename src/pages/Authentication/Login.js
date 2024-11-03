import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {isEmail, toastify } from "../../config/global"

import {  signInWithEmailAndPassword } from "firebase/auth";
import {auth, firestore} from "../../config/firebase"
import { doc,getDoc } from "firebase/firestore";



import { LockOutlined} from "@ant-design/icons";
import { Button,Form, Input, Row, Col, Typography } from 'antd';
import { RiMailLine } from "react-icons/ri";
import { useAuthContext } from "../../context/AuthContext";
const { Title } = Typography

const initialize = {email: "", password: "" };

export default function Login() {
 const {dispatch}=useAuthContext()

    const [state,setState] =useState( initialize)
    const [isProcessing,setIsProcessing]= useState(false)
      const navigate = useNavigate();



    const handleChange = (e)=>{
       let {name,value}= e.target
         setState(s=>({...s,[name]:value}));
    }
    const handleSubmit= (e)=>{
        e.preventDefault();
        const {email,password}= state;
        if(email.length === 0 || password.length === 0){
           return toastify("Please fill all the input","error")
        }
        if (!isEmail(email)) { return toastify("Please enter a valid email address", "error") }
    if (password.length < 6) {return toastify("Password must be at least 6 characters long.", "error");}
  setIsProcessing(true)
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    readUserProfile(user);
    toastify("User  Successfully Logged-In","success")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toastify("plaese enter your correct email or password","error")
  })
  .finally(()=>{
    setIsProcessing(false)
    setState(initialize)
// navigate("/home")

  })
    }

    const readUserProfile=async(userCredential)=>{
const {uid}=userCredential;
const docRef = doc(firestore, "users", uid);
const docSnap = await getDoc(docRef);
const userdata= docSnap.data()
dispatch({type:"SET_LOGGED_IN",payload:(userdata)})

// console.log(docSnap.data());   


    }
  return (
    <main>
      <div className="container-fluid  d-flex justify-content-center align-items-center min-vh-100 bg-light"  >
       
            <div className="card p-3 shadow " style={{border:0 ,width:"500px"}}>
              <Title level={2} className="text-center mb-4">Login</Title>
              <Form>
              <Row gutter={[18,18]}>
                
                <Col span={20} offset={2}  >
               
                  <Input prefix={<RiMailLine />}
                  className="py-2"
                  size="large"
                    type="email"
                     name="email"
                     value={state.email}
                     onChange={handleChange}
                    placeholder="Enter your email"
                  />
                 
                </Col>
                <Col span={20} offset={2} >
                <span className="mb-1" style={{float:"right" ,}}><Link to='/auth/forgotpassword'> Forgot Password </Link></span>
                  <Input.Password prefix={<LockOutlined/>}
                  className="py-2"
                  size="large"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="Enter your Password"
                  />
                </Col>
                <Col span={20} offset={2}>
                            <Button type='primary' size='large' loading={isProcessing} disabled={isProcessing} block  onClick={handleSubmit}>Login</Button>
                        </Col>
              </Row>
              </Form>
              <Row>
                <Col span={24} >
                <p className=" pt-2 text-center">Creat New Account.  
                  <Link to='/auth/register'> Register Now!</Link>
                </p>
                </Col>
              </Row>
            </div>
          </div>
        
    </main>
  );
}
