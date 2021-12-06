import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./sidebar.scss";

let useClickOutSide = (handler) => {
    let domNode = useRef();

    useEffect(() => {
        let maybeHandler = (event) => {
            if (!domNode.current.contains(event.target)) {
                handler();
            }
        };
        document.addEventListener("click", maybeHandler);
        return () => {
            document.removeEventListener("click", maybeHandler);
        };
    });
    return domNode;
};

function Sidebar() {
    const [favorite, setFavorite] = useState([]);
    const [user, setUser] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);

    const [status, setStatus] = useState({ err: "", success: "" });
    const { err, success } = status;

    const token = localStorage.getItem("userToken");
    const tokenBearer = `Bearer ${token}`;

    useEffect(() => {
        const getFavorite = async () => {
            const res = await axios.get(
                "http://localhost:8000/users/favorite",
                {
                    headers: { Authorization: tokenBearer },
                }
            );
            setFavorite(res.data);
        };
        getFavorite();
    }, []);

    useEffect(() => {
        const getInfo = async () => {
            const res = await axios.get("http://localhost:8000/users/detail", {
                headers: { Authorization: tokenBearer },
            });
            setUser(res.data);
        };
        getInfo();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("firstLogin");
        localStorage.removeItem("userToken");
        window.location.href = "/";
    };
    const handleDeleteFavorite = async (id) => {
        try {
            if (window.confirm("Are you sure want to delete this?")) {
                const res = await axios.delete(
                    `http://localhost:8000/users/favorite/${id}`,
                    { headers: { Authorization: tokenBearer } }
                );
                setStatus({ err: "", success: res.data.message });
            }
        } catch (error) {
            setStatus({ err: "Delete failed", success: "" });
        }
    };
    const handleShow = () => {
        setMenuOpen(!menuOpen);
    };

    let domNode = useClickOutSide(() => {
        setMenuOpen(false);
    });
    return (
        <div ref={domNode}>
            <i className="fas fa-user user__avatar" onClick={handleShow}></i>
            {/* <div  className={`${menuOpen ? "overlay" : ""}`}></div> */}
            <div className={`slidebar__user ${menuOpen ? "side_show" : ""}`}>
                <div className="slidebar__user-name">
                    <span>{user.username}</span>
                    <i className="fas fa-times" onClick={handleShow}></i>
                </div>
                {success && <Alert variant="success">{success}</Alert>}
                <div className="slidebar__user-watch">
                    <span>Watchlist</span>
                    {favorite.map((item, index) => (
                        <div className="slidebar__user-coin" key={index}>
                            <span>{item.coin.name}</span>
                            <span>
                                <i
                                    className="fas fa-trash"
                                    onClick={() =>
                                        handleDeleteFavorite(item.coin.pk)
                                    }
                                ></i>
                            </span>
                        </div>
                    ))}
                </div>
                <Link to="/detail">
                    <button className="btn-user">Infomation</button>
                </Link>
                <button className="btn-user" onClick={handleLogout}>
                    Log out
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
