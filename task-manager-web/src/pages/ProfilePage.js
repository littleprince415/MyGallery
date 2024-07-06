// ProfilePage.js
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis justo eget urna sagittis feugiat.'
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{user.name}</Card.Subtitle>
              <Card.Text>{user.bio}</Card.Text>
              <Card.Text>Email: {user.email}</Card.Text>
              <Link to="/edit-profile" className="btn btn-primary mr-2">
                Edit Profile
              </Link>
              <Button variant="danger">Delete Account</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
