import axios from 'axios';
import React from 'react';


export default function Dashboard() {



    const logout = (e)=>{
        e.preventDefault();

        axios.get("http://localhost:5000/api/user/logout")
            .then((res) => {
                console.log(res);
                localStorage.removeItem("token");
                sessionStorage.clear("session");
                window.location.href = "/";
            }).catch((err) => {
                console.log(err);
            }
        )
    }



    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={logout} className="button">Logout</button>
        </div>
    );
}
