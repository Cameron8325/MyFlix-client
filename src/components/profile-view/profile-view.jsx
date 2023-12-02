import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export const ProfileView = ({ user, onLogout }) => {
  // Use useParams to get the username from the URL
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check if username is defined before making the fetch request
    if (username) {
      fetch(`https://camflixcf-73cf2f8e0ca3.herokuapp.com/users/${username}`, {
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
    }
  }, [user, username]);

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
