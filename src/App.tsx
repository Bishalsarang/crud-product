import React from 'react';
import './App.css';

const mockData = [
    {
        name: "Product 1",
        price: 19.99,
        id: "p1",
        description: "Description for Product 1",
        imageURL: "https://example.com/product1.jpg",
    },
    {
        name: "Product 2",
        price: 29.99,
        id: "p2",
        description: "Description for Product 2",
        imageURL: "https://example.com/product2.jpg",
    },
    {
        name: "Product 3",
        price: 14.99,
        id: "p3",
        description: "Description for Product 3",
        imageURL: "https://example.com/product3.jpg",
    },
    {
        name: "Product 4",
        price: 9.99,
        id: "p4",
        imageURL: "https://example.com/product4.jpg",
    },
    {
        name: "Product 5",
        price: 24.99,
        id: "p5",
        description: "Description for Product 5",
        imageURL: "https://example.com/product5.jpg",
    },
    {
        name: "Product 6",
        price: 39.99,
        id: "p6",
    },
    {
        name: "Product 7",
        price: 49.99,
        id: "p7",
    },
    {
        name: "Product 8",
        price: 12.99,
        id: "p8",
    },
    {
        name: "Product 9",
        price: 17.99,
        id: "p9",
    },
    {
        name: "Product 10",
        price: 22.99,
        id: "p10",
        description: "Description for Product 10",
        imageURL: "https://example.com/product10.jpg",
    },
];

function App() {
    return (
        <div className="App">
            <h1>Products</h1>
            {mockData.map((item) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>Price: ${item.price}</p>
                    {item.description && <p>Description: {item.description}</p>}
                    {item.imageURL && (
                        <img src={item.imageURL} alt={item.name} style={{maxWidth: '100px'}}/>
                    )}
                </div>
            ))}
        </div>
    );
}

export default App;
