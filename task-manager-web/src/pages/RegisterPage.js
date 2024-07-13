import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { email, password, confirmPassword } = formData;
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทางใน React Router v6

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        email,
        password,
        confirmPassword
      });

      console.log(response.data);
      alert(response.data.message); // แสดงข้อความจาก backend

      // นำทางไปยังหน้า login หลังจากลงทะเบียนสำเร็จ
      navigate('/login');

    } catch (error) {
      if (error.response && error.response.data) {
        alert('Error: ' + error.response.data.message);
      } else {
        console.error('Unexpected error:', error);
        alert('Unexpected error occurred');
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <h2>Register</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <br></br>
            <Form.Text className="text-muted mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
