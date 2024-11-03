import React  from "react";
import { ArrowLeftOutlined} from "@ant-design/icons";
import { Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";



const Index = () => {
  const { handleLogout, user } = useAuthContext();

  const navigate = useNavigate();


  return (   
        <div className="row ">
          <div className="col-12 col-md-8 offset-md-2 d-flex align-items-center  mt-5  sm-ms-1 ms-md-5   p-5 flex-column card  shadow">
            <h2 className="">Email: {user.email}</h2>
            <h2>UID: {user.uid}</h2>
            <Space>
              <Button danger onClick={handleLogout}>
                Logout
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/home");
                }}
              >
                <ArrowLeftOutlined /> Frontend Home
              </Button>
            </Space>
          </div>
        </div>
     );
};
export default Index;
