import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Notify.scss";
function Notify() {
    const [notify, setNotify] = useState([]);

    const token = localStorage.getItem("userToken");
    const tokenBearer = `Bearer ${token}`;

    useEffect(() => {
        const getNotify = async () => {
            const res = await axios.get(
                "http://localhost:8000/users/notification",
                {
                    headers: { Authorization: tokenBearer },
                }
            );
            setNotify(res.data);
        };
        getNotify();
    }, []);

    const handleFormat = (date) => {
        let newDate = new Date(date);
        return newDate.toLocaleDateString("en-US");
    };
    return (
        <div className="notification">
            <i className="fas fa-bell"></i>
            <div className="notification__content">
                <h3>Notifications</h3>
                <div className="notification__content-detail">
                    {notify.map((item, index) => (
                        <div className="notification__content-detail-price" key={index}>
                            <span style={{color: "red"}}>{item.typeCoin}</span>
                            <p>
                                Min_threshold:{" "}
                                {Number(item.min_threshold).toFixed(2)}
                            </p>
                            <p>
                                Max_threshold:{" "}
                                {Number(item.max_threshold).toFixed(2)}
                            </p>
                            {/* <span>{item.min_threshold.Number().toFixed(2)}</span> */}
                            <p style={{color: "#ccc",  fontStyle: "oblique"}}>{handleFormat(item.created)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Notify;
