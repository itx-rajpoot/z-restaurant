import React, { useEffect } from 'react';
import { Button, Rate, Space } from 'antd';
import Aos from 'aos';
import 'aos/dist/aos.css';

export default function Cards({ value, handleAddToCart, processingId }) {
    const isProcessing = processingId === value.id;

    useEffect(() => {
        Aos.init();
    }, []);

    return (
        <div
            className="card mb-3 mb-md-4 shadow"
            style={{ width: '16rem', border: 'none', outline: 'none' }}
            data-aos="zoom-in-up"
            data-aos-duration="1000"
        >
            <div
                style={{
                    height: '220px',
                    objectFit: 'cover',
                    backgroundSize: 'cover',
                    overflow: 'hidden',
                }}
            >
                <img src={value.image} className="card-img-top h-100" alt={value.name} />
            </div>
            <div className="card-body">
                <h5 className="card-title" style={{ color: '#adb5bd' }}>{value.name}</h5>
                <p className="card-text mb-0" style={{ height: '45px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {value.description}
                </p>
                <Rate style={{ fontSize: '13px' }} disabled defaultValue={4} />
                <p>
                    <Space className='text-danger'>
                        <del>${value.oldPrice}</del>
                        <span>${value.newPrice}</span>
                    </Space>
                </p>
                <Button
                    size='large'
                    className='btn shop-now w-100'
                    loading={isProcessing}
                    onClick={() => handleAddToCart(value)}
                    style={{ color: 'white', backgroundColor: '#e63946' }}
                >
                    Shop Now
                </Button>
            </div>
        </div>
    );
}
