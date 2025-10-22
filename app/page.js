'use client';
import { useEffect, useState } from "react";
import { Card, Row, Col, Button, Select } from "antd";

const { Option } = Select;

export default function Home() {
  const [data, setData] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`
      );
      const result = await res.json();
      setData(result);
    }
    fetchData();
  }, [sortBy, order]); 

  return (
    <div className="min-h-screen bg-gray-50 py-12 mx-4">
      <h1 className="font-bold text-4xl text-center mb-10 text-gray-600">🛍️ Product List</h1>
      <p className="text-gray-600">Filter :</p>

      <div className="mb-8">
        <Select
          defaultValue={sortBy}
          style={{ width: 160 }}
          onChange={setSortBy}
        >
          <Option value="title">Title</Option>
          <Option value="price">Price</Option>
          <Option value="rating">Rating</Option>
        </Select>

        <Select
          defaultValue={order}
          style={{ width: 120 }}
          onChange={setOrder}
        >
          <Option value="asc">Ascending</Option>
          <Option value="desc">Descending</Option>
        </Select>
      </div>


      {data ? (
        <Row gutter={[24, 24]} justify="center">
          {data.products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className="max-w-sm w-full shadow-md border border-gray-200 rounded-2xl hover:shadow-xl transition-transform hover:scale-[1.02]"
                cover={
                  <img
                    alt={product.title}
                    src={product.thumbnail}
                    className="h-100 w-full object-cover rounded-t-2xl"
                  />
                }
              >
                <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-bold">
                    ${product.price}
                  </span>
                  <Button type="primary">Buy Now</Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
}
