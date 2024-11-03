import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Space, Image, Button, message, Spin } from "antd";

import { firestore, storage } from "../../../config/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

// const columns = [
//   {
//     title: 'ID',
//     dataIndex: 'id',
//     key: 'id',
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: 'Image',
//     dataIndex: 'image',
//     key: 'image',
//     render: (image) => (
//       <Image
//         width={80}
//         height={80}
//         src={image}
//         alt="Product Image"
//         style={{ objectFit: 'cover',borderRadius:"50px" }}
//       />
//     ),
//   },
//   {
//     title: 'Product Name',
//     dataIndex: 'productName',
//     key: 'productName',
//   },
//   {
//     title: 'Category',
//     dataIndex: 'category',
//     key: 'category',
//   },
//   {
//     title: 'Old Price',
//     dataIndex: 'oldPrice',
//     key: 'oldPrice',
//   },
//   {
//     title: 'New Price',
//     dataIndex: 'newPrice',
//     key: 'newPrice',
//   },
//   {
//     title: 'Type',
//     dataIndex: 'type',
//     key: 'type',
//   },
//   {
//     // title: 'Type',
//     // key: 'type',
//     // dataIndex: 'type',
//     render: (_, { tags }) => (
//       <>
//         {tags?.map((tag) => {
//           let color = tag.length > 5 ? 'geekblue' : 'green';
//           if (tag === 'loser') {
//             color = 'volcano';
//           }
//           return (
//             <Tag color={color} key={tag}>
//               {tag.toUpperCase()}
//             </Tag>
//           );
//         })}
//       </>
//     ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <Button>Update </Button>
//         <Button danger >Delete</Button>
//       </Space>
//     ),
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     render: (_, record) => (
//       <Space size="middle">
//         <Button>Update </Button>
//         <Button danger >Delete</Button>
//       </Space>
//     ),
//   },
// ];


export default function ShowProducts() {
  const [document, setDocument] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(5);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchDocument = async () => {
      setIsLoading(true);
      const array = [];
      const querySnapshot = await getDocs(collection(firestore, "addProduct"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        array.push(data);
        

      });
      setDocument(array);
      // mens.push(array)
      setIsLoading(false);
    };
    fetchDocument();
  }, []);
  console.log(document);
  

  const handleDelete = async (itemId, image) => {
    const desertRef = ref(storage, image);
    try {
      deleteObject(desertRef);
      await deleteDoc(doc(firestore, "addProduct", itemId));
      message.success("SuccessFully Delete Product");
      setDocument((document) =>
        document.filter((item) => {
          return item.randomId !== itemId;
        })
      );
    } catch (error) {
      message.error("Error Delete Product");
    
    }
  };

  // const contentStyle = {
  //   padding: 50,
  //   background: "rgba(0, 0, 0, 0.05)",
  //   borderRadius: 4,
  // };
  // const content = <div style={contentStyle} />;
  return (
    <div className="container">
      <h1 className="text-center my-4">All Products</h1>

      {/* <Table columns={columns} dataSource={document} rowKey="id" loading={isLoading} /> */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">#id</th>
              <th scope="col">Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Category</th>
              <th scope="col">Old Price</th>
              <th scope="col">New Price</th>
              <th scope="col">Type</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {document.length === 0 ? (
              <div className="d-flex align-items-center justify-content-center w-100  min-vh-100 ">
                <Spin tip="Loading" size="large">
                  {content}
                </Spin>
              </div>
            ) : (
              document.slice(0, limit).map((items, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row">
                      {" "}
                      <Image
                        width={80}
                        height={80}
                        src={items.image}
                        alt="Product Image"
                        style={{ objectFit: "cover", borderRadius: "50px" }}
                      />
                    </th>
                    <td>{items.productName}</td>
                    <td>{items.category}</td>
                    <td>{items.oldPrice}</td>
                    <td>{items.newPrice}</td>
                    <td>{items.type}</td>
                    <td>{items.description}</td>
                    <td>
                      <Space>
                        {" "}
                        <Button
                          onClick={() => {
                            navigate("/dashboard/updateproduct", {
                              state: items,
                            });
                          }}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          danger
                          onClick={() =>
                            handleDelete(items.randomId, items.image)
                          }
                        >
                          Delete
                        </Button>
                      </Space>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {limit < document.length ? (
        <div className="row">
          <div className="col text-center my-3">
            <Button
              type="primary"
              onClick={() => {
                setLimit(limit + 2);
              }}
            >
              View more
            </Button>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col text-center my-3">
            <Button
              onClick={() => {
                setLimit(5);
              }}
            >
              See less
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
// export const  mens =[]
