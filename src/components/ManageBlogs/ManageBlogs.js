import React, { useEffect, useState } from 'react';
import './ManageBlogs.css';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import { BsArrowLeft } from 'react-icons/bs';

const ManageBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('https://morning-inlet-65384.herokuapp.com/blogs')
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
            });
    });
    const handleDelete = (id) => {
        const url = `https://morning-inlet-65384.herokuapp.com/deleteBlog/${id}`;
        fetch(url, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert('Blog deleted successfully!');
            });
    };
    return (
        <div className='manageBlogs p-3'>
            <div className='manageBlogs__head bg-white p-1 mb-3 d-flex'>
                <Link className='fw-bold text-decoration-none text-dark' to='/'>
                    <BsArrowLeft className='manageBlogs__icon' data-bs-toggle='tooltip' data-bs-placement='bottom' title='Go to Home' />
                </Link>
                <h3>Manage Blogs</h3>
            </div>
            <div className='row'>
                <Sidebar />
                <div className='col'>
                    <div className='manageBlogs__col bg-white p-3' style={{ height: '85vh' }}>
                        <table class='table table-borderless table-hover'>
                            <thead className=''>
                                <tr className='text-center table-success'>
                                    <th scope='col'>Sl. No.</th>
                                    <th scope='col'>Date & Time</th>
                                    <th scope='col'>Title</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {blogs.map((blog, index) => (
                                    <tr>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{blog?.dateTime}</td>
                                        <td>{blog?.title}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageBlogs;
