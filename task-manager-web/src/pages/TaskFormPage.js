import React, { useState } from 'react';
import axios from 'axios';

const TaskFormPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/tasks/new', {
        title,
        description,
        status
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Assuming you have a token stored in localStorage for authentication
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('Task created:', response.data);
      // Reset form fields after successful submission
      setTitle('');
      setDescription('');
      setStatus('');
      // You can add more handling like showing a success message or redirecting to tasks page
    } catch (error) {
      console.error('Failed to create task:', error);
      // Handle error cases, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskFormPage;
