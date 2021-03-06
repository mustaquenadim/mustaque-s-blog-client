import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import moment from 'moment';

const WriteABlog = () => {
    const { register, handleSubmit } = useForm();
    const dateTime = moment().format('LLL');

    const [imageURL, setImageURL] = useState(null);
    const handleUploadFile = (event) => {
        const imageData = new FormData();
        imageData.set('key', 'edae0002c27d9671e6fe41b4304098ef');
        imageData.append('image', event.target.files[0]);
        axios
            .post('https://api.imgbb.com/1/upload', imageData)
            .then((response) => setImageURL(response.data.data.display_url))
            .catch((error) => console.log(error));
    };

    const onSubmit = (data) => {
        const blogData = { title: data.title, imageURL: imageURL, description: data.description, price: data.price, dateTime };
        const url = `https://morning-inlet-65384.herokuapp.com/addBlog`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(blogData),
        }).then((result) => {
            if (result) {
                alert('Blog added successfully!');
            }
        });
    };

    return (
        <div className='writeABlog p-3'>
            <div className='writeABlog__head bg-white p-1 mb-3 d-flex'>
                <Link className='fw-bold text-decoration-none text-dark' to='/'>
                    <BsArrowLeft className='writeABlog__icon' data-bs-toggle='tooltip' data-bs-placement='bottom' title='Go to Home' />
                </Link>
                <h3>Create a Blog</h3>
            </div>
            <div className='row'>
                <Sidebar />
                <div className='col'>
                    <div className='writeABlog__col bg-white p-3' style={{ height: '85vh' }}>
                        <form onSubmit={handleSubmit(onSubmit)} className='p-3 rounded-3'>
                            <div className='mb-3'>
                                <label htmlFor='serviceCoverPhoto' className='form-label'>
                                    Upload Cover Image
                                </label>
                                <input type='file' className='form-control' onChange={handleUploadFile} id='serviceCoverPhoto' placeholder='Upload image' {...register} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='name' className='form-label'>
                                    Title
                                </label>
                                <input type='text' className='form-control' name='title' id='title' placeholder='Enter title' {...register('title')} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='price' className='form-label'>
                                    Description
                                </label>
                                <textarea type='text' className='form-control' name='description' id='description' placeholder='Enter Description' {...register('description')} />
                            </div>
                            <input type='submit' className='btn btn-primary' value='Post' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WriteABlog;
