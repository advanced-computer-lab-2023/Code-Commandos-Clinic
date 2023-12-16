// NotificationDetails.jsx

import React from "react";
import Swal from "sweetalert2";

const NotificationDetails = ({ notification }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch("/api/notification/deleteNotificationById/"+notification._id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(response.ok){
                window.location.reload()
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: await response.text(),
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Error deleting notification.',
            });
        }
    };

    return (
        <div className="container card box mt-lg-5 col-6">
            <h3 >{notification.title}</h3>
            <p><strong>Content: </strong>{notification.content}</p>
            <button className="btn btn-danger" style={{width:"fit-content"}} onClick={handleDelete}>Delete</button>
            <hr />
        </div>
    );
};

export default NotificationDetails;
