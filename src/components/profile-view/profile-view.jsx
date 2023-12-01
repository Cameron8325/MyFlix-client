import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export const ProfileView = ({ user, onLogout }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Assuming you have an API endpoint to fetch detailed user information
    fetch(`https://my-flix-app-api.herokuapp.com/users/${user.Username}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
      });
  }, [user]);

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>User Profile</h2>
        </Col>
      </Row>
      {userData ? (
        <>
          <Row className="mt-3">
            <Col>
              <strong>Username:</strong> {userData.Username}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <strong>Email:</strong> {userData.Email}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <strong>Birthday:</strong> {new Date(userData.Birthday.$date).toDateString()}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <strong>Favorite Movies:</strong>{' '}
              {userData.FavoriteMovies.map((movie) => (
                <span key={movie.$oid}>{movie.$oid} </span>
              ))}
            </Col>
          </Row>
        </>
      ) : (
        <Row className="mt-3">
          <Col>Loading user data...</Col>
        </Row>
      )}
      <Row className="mt-4">
        <Col>
          <Button variant="danger" onClick={onLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
