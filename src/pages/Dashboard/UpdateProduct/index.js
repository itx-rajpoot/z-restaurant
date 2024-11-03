import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { doc,  updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { Button, Col, Input, message, Row } from 'antd';
const { TextArea } = Input;

export default function AddProducts() {
  const location = useLocation();
  const dataItem = location.state || {};  
  const [state, setState] = useState(dataItem);
  const [isProcessing, setIsProcessing] = useState(false);


  const navigate = useNavigate();

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

    const { productName, category, oldPrice, newPrice, type, description, image } = state;
    let imageUrl = state.imageUrl || "";  // Keep existing image URL if image is not updated

    try {
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const updatedProduct = { ...dataItem, productName, category, oldPrice, newPrice, type, description, imageUrl };
      
      // Update the product in Firestore
      await updateDoc(doc(firestore, "addProduct", dataItem.randomId), updatedProduct);

      message.success("Product updated successfully!");
      // navigate('/dashboard/home'); 
    } catch (error) {
      console.error("Error updating product: ", error);
      message.error("Failed to update product.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='bg-light'>
      <div className="container">
        <h1 className='text-center pt-5' style={{ color: "#495057" }}>Update Product</h1>
        
        <Row gutter={[16, 16]} className='shadow py-3 mt-2' style={{ borderRadius: "10px", backgroundColor: "white", color: "#6c757d" }}>
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 20, offset: 2 }} lg={{ span: 10, offset: 1 }}>
            <label className='fs-4'>Product name:</label>
            <Input type='text' name='productName' placeholder='Enter product name' className='py-2' onChange={handleChange} value={state.productName} />
          </Col>
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 20, offset: 2 }} lg={{ span: 10, offset: 1 }}>
            <label className='fs-4'>Category:</label>
            <Input type='text' name="category" placeholder='Enter Category' className='py-2' onChange={handleChange} value={state.category} />
          </Col>
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 20, offset: 2 }} lg={{ span: 10, offset: 1 }}>
            <label className='fs-4'>Old price:</label>
            <Input type='text' name="oldPrice" placeholder='Enter old price' className='py-2' onChange={handleChange} value={state.oldPrice} />
          </Col>
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 20, offset: 2 }} lg={{ span: 10, offset: 1 }}>
            <label className='fs-4'>New price:</label>
            <Input type='text' name="newPrice" placeholder='Enter new price' className='py-2' onChange={handleChange} value={state.newPrice} />
          </Col>
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 20, offset: 2 }} lg={{ span: 10, offset: 1 }}>
            <label className='fs-4'>Type:</label>
            <Input type='text' name="type" placeholder='Enter type (mens, womens, kids, others)' className='py-2' onChange={handleChange} value={state.type} />
          </Col>
          <Col span={20} offset={2}>
            <label className='fs-4'>Description:</label>
            <TextArea name="description" placeholder="Enter Description" autoSize={{ minRows: 3, maxRows: 5 }} onChange={handleChange} value={state.description} />
          </Col>
          <Col span={10} offset={1}>
            <label className='fs-4'>Upload Image:</label>
            <input type='file' name='image' className='py-2' onChange={handleChange} />
          </Col>
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 20, offset: 2 }} lg={{ span: 8, offset: 8 }}>
            <Button className='w-100' size='large' type='primary' loading={isProcessing} disabled={isProcessing} onClick={handleSubmit}>Update Product</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
