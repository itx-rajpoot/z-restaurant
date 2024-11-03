import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthContext } from '../../../context/AuthContext';
import { doc, setDoc } from "firebase/firestore";
import { firestore, storage } from "../../../config/firebase";
import { Button, Col, Input, message, Row } from "antd";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const { TextArea } = Input;

const initialize = {
  productName: "",
  category: "",
  oldPrice: "",
  newPrice: "",
  type: "",
  description: "",
  image: "",
};

export default function AddProducts() {
  const [state, setState] = useState(initialize);
  const [isProcessing, setIsProcessing] = useState(false);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setState((s) => ({ ...s, [name]: files[0] }));
    } else {
      setState((s) => ({ ...s, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const {
      productName,
      category,
      oldPrice,
      newPrice,
      type,
      description,
      image,
    } = state;
    const addproducts = {
      productName,
      category,
      oldPrice,
      newPrice,
      type,
      description,
      randomId: window.randomId(),
      //   uid: user.uid,
    };

    try {
      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
        // console.log('Uploaded and got URL: ', imageUrl);
      }
      await setDoc(doc(firestore, "addProduct", addproducts.randomId), {
        ...addproducts,
        image: imageUrl,
      });
      message.success("Product added successfully!");
      setState(initialize);
    } catch (error) {
      console.error("Error adding product: ", error);
      message.error("Failed to add product.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-light">
      <div className="container">
        <h1 className="text-center pt-5" style={{ color: "#495057" }}>
          Add Products
        </h1>
       
        <Row
          gutter={[16, 16]}
          className="shadow py-3 mt-2 "
          style={{
            borderRadius: "10px",
            backgroundColor: "white",
            color: "#6c757d",
          }}
        >
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            lg={{ span: 10, offset: 1 }}
          >
            <label className="fs-4">Product name: </label>
            <Input
              type="text"
              placeholder="Enter product name"
              name="productName"
              className="py-2"
              onChange={handleChange}
              value={state.productName}
            />
          </Col>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            lg={{ span: 10, offset: 1 }}
          >
            <label className="fs-4">Category: </label>
            <Input
              type="text"
              className="py-2"
              placeholder="Enter Category"
              name="category"
              onChange={handleChange}
              value={state.category}
            />
          </Col>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            lg={{ span: 10, offset: 1 }}
          >
            <label className="fs-4">Old price: </label>
            <Input
              type="text"
              className="py-2"
              placeholder="Enter old price"
              name="oldPrice"
              onChange={handleChange}
              value={state.oldPrice}
            />
          </Col>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            lg={{ span: 10, offset: 1 }}
          >
            <label className="fs-4">New price: </label>
            <Input
              type="text"
              className="py-2"
              placeholder="Enter new price"
              name="newPrice"
              onChange={handleChange}
              value={state.newPrice}
            />
          </Col>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            lg={{ span: 10, offset: 1 }}
          >
            <label className="fs-4">Type: </label>
            <Input
              type="text"
              className="py-2"
              placeholder="Enter type (mens, womens, kids, others)"
              onChange={handleChange}
              name="type"
              value={state.type}
            />
          </Col>
          <Col span={20} offset={2}>
            <label className="fs-4">Description: </label>
            <TextArea
              placeholder="Enter Description"
              autoSize={{ minRows: 3, maxRows: 5 }}
              onChange={handleChange}
              name="description"
              value={state.description}
            />
          </Col>
          <Col span={10} offset={1}>
            <label className="fs-4">Upload Image: </label>
            <input
              type="file"
              className="py-2"
             onChange={handleChange}
              name="image"
            />
          </Col>
          <Col
            xs={{ span: 22, offset: 1 }}
            sm={{ span: 20, offset: 2 }}
            lg={{ span: 8, offset: 8 }}
          >
            <Button
              className="w-100"
              size="large"
              type="primary"
              loading={isProcessing}
              disabled={isProcessing}
              onClick={handleSubmit}
            >
              Add products
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
