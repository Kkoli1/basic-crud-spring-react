import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users")
        setUsers(result.data);
    }

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/delete/${userId}`);
            console.log('User deleted successfully');
            // After successful deletion, you should update the user list
            setUsers(users.filter(user=>user.id !== userId));
        } catch (error) {
            console.error('Error deleting user', error);
        }
    }

    return (
        <div className='container'>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">#</th>
                            <th scope="col" className="text-center">Name</th>
                            <th scope="col" className="text-center">Username</th>
                            <th scope="col" className="text-center">Email</th>
                            <th scope='col' className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr>
                                <th scope="row" className="align-middle text-center" key={user.id}>{user.id}</th>
                                <td className="align-middle text-center">{user.name}</td>
                                <td className="align-middle text-center">{user.userName}</td>
                                <td className="align-middle text-center">{user.email}</td>
                                <td className="align-middle text-center">
                                    <button className='btn btn-primary mx-2'>View</button>
                                    <button className='btn btn-outline-primary mx-2'>Edit</button>
                                    <button className='btn btn-danger mx-2' onClick={()=>
                                    {
                                        deleteUser(user.id);
                                        
                                    }
                                    }>Delete</button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
