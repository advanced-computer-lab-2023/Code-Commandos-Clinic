// NotificationsPage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import NotificationDetails from "../components/NotificationDetails";
import Swal from "sweetalert2";

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch("/api/notification/getUserNotifications");
                if (response.ok){
                    const data = await response.json();
                    setNotifications(data);
                }
                else if(!response.ok){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: await response.text(),
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: "Error fetching notifications",
                });
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="container">
            <h1 style={{textAlign:"center"}}>Notifications</h1>
            {notifications && notifications.map((notification) => (
                <NotificationDetails
                    key={notification._id}
                    notification={notification}
                />
            ))}
        </div>
    );
};

export default NotificationsPage;
