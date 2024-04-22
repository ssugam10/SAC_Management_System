import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateItem = () => {
  const [name, setName] = useState('');
  const [timeOfIssue, setTimeOfIssue] = useState('');
  const [needRepairs, setNeedRepairs] = useState('');
  const [quantity, setQuantity] = useState('');
  const [remaining, setRemaining] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = () => {
    const data = {
      name,
      timeOfIssue,
      needRepairs,
      quantity,
      remaining,
      createdAt,
      updatedAt,
      studentId
    };
    setLoading(true);
    axios.post(`http://localhost:5555/books`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch(err => {
        setLoading(false);
        alert('An error has occurred, please check the console.');
        console.log(err);
      });
  }

  return (
    <div className='p-8 bg-gray-200'>
      <BackButton />
      <h1 className='text-3xl font-bold my-4 text-center'>Create Item</h1>
      {loading && <Spinner />}
      <div className='bg-gray-100 flex flex-col border-2 border-black rounded-xl max-w-md mx-auto p-4'>
        <div className='my-4'>
          <label htmlFor='name' className='text-lg font-semibold text-gray-800'>Name</label>
          <input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='my-4'>
          <label htmlFor='timeOfIssue' className='text-lg font-semibold text-gray-800'>Time of Issue</label>
          <input
            id='timeOfIssue'
            type='text'
            value={timeOfIssue}
            onChange={(e) => setTimeOfIssue(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='my-4'>
          <label htmlFor='needRepairs' className='text-lg font-semibold text-gray-800'>Does it need any repairs?</label>
          <input
            id='needRepairs'
            type='text'
            value={needRepairs}
            onChange={(e) => setNeedRepairs(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='flex flex-wrap'>
          <div className='w-full md:w-1/2 my-4 md:pr-2'>
            <label htmlFor='quantity' className='text-lg font-semibold text-gray-800'>Quantity</label>
            <input
              id='quantity'
              type='number'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className='border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='w-full md:w-1/2 my-4 md:pl-2'>
            <label htmlFor='remaining' className='text-lg font-semibold text-gray-800'>Remaining</label>
            <input
              id='remaining'
              type='number'
              value={remaining}
              onChange={(e) => setRemaining(e.target.value)}
              className='border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
        </div>
        <div className='flex flex-wrap'>
          <div className='w-full md:w-1/2 my-4 md:pr-2'>
            <label htmlFor='createdAt' className='text-lg font-semibold text-gray-800'>Created At</label>
            <input
              id='createdAt'
              type='text'
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              className='border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='w-full md:w-1/2 my-4 md:pl-2'>
            <label htmlFor='updatedAt' className='text-lg font-semibold text-gray-800'>Updated At</label>
            <input
              id='updatedAt'
              type='text'
              value={updatedAt}
              onChange={(e) => setUpdatedAt(e.target.value)}
              className='border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500'
            />
          </div>
        </div>
        <div className='my-4'>
          <label htmlFor='studentId' className='text-lg font-semibold text-gray-800'>Student ID</label>
          <input
            id='studentId'
            type='text'
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className='border border-gray-400 px-4 py-2 w-full rounded-md focus:outline-none focus:border-blue-500'
          />
        </div>
        <button className='mt-2 mb-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateItem;
