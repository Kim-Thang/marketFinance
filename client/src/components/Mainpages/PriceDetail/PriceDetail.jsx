import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PriceDetail() {
    const [detail, setDetail] = useState([])
   
    const { id } = useParams()

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/");

        socket.onmessage = function (e) {
            var data = JSON.parse(e.data);
            setDetail(data);
        };
        return () => {
            socket.close();
        };
    }, []);

    const priceDetail = detail.filter((item) => {
        return item.id === parseInt(id)
    })
  
    console.log(id)
    return (
        <div style={{paddingTop: "100px"}}>
            <h2>Detail</h2>
        </div>
    )
}

export default PriceDetail
