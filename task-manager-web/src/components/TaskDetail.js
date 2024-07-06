import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const TaskDetailPage = () => {
  const { id } = useParams(); // เรียกใช้ params ที่ได้รับจาก URL
  // Mock data ของ task
  const task = {
    id: id,
    title: 'Task Title',
    description: 'Task Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod.'
    // สามารถเพิ่มข้อมูลเพิ่มเติมตามที่ต้องการได้
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
              <Link to={`/tasks/${task.id}/edit`} className="btn btn-primary mr-2">
                Edit
              </Link>
              <Button variant="danger">Delete</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskDetailPage;
