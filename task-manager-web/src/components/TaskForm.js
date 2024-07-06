import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const TaskFormPage = () => {
  const history = useHistory();

  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission logic here, e.g., save to database
    console.log('Submitting Task:', task);
    // Redirect to task list page after submission
    history.push('/tasks');
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h2>Add New Task</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                name="title"
                value={task.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                name="description"
                value={task.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Task
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskFormPage;
