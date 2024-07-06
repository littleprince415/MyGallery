import React from 'react';
import TaskList from '../components/TaskList';
import { Link } from 'react-router-dom';

function TaskListPage() {
  return (
    <div>
      <h2>Tasks</h2>
      <Link to="/tasks/new">Add New Task</Link>
      <TaskList />
    </div>
  );
}

export default TaskListPage;
