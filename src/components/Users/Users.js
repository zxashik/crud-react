import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [])

    // DELETE An user

    const handleDeleteUser = id => {
        const proceed = window.confirm('Are you sure you want to delete');
        if (proceed) {
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('deleted successfully');
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    }
                })
        }
    }
    return (
        <div>
            <h2>This is Users</h2>
            <h4>Users Available: {users.length}</h4>

            {
                users.map(user => <div className="user-design" key={user._id}>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <Link to={`/users/update/${user._id}`}><button>Update</button></Link>
                    <button onClick={() => handleDeleteUser(user._id)}> X</button>
                </div>)
            }
        </div>
    );
};

export default Users;