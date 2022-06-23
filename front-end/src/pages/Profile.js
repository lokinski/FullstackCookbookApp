import React, { Component } from "react";
import { Container, Alert } from "react-bootstrap";
import ProfileContext from "../context/ProfileContext";
import ProfileHeader from "../components/profileHeader";
import RecipeCard from '../components/recipeCard';

import { ProfileProvider } from "../context/ProfileContext";

class Profile extends Component {
  render() {
    return (
      <Container className="pt-4">
        <ProfileProvider username={this.props.match.params.username}>
          <ProfileContext.Consumer>
            {(profile) =>
              profile.found && !profile.fetching ? (
                <>
                  <ProfileHeader />
                  <RecipeCard.Container>
                    <RecipeCard.Objects recipes={profile} />
                  </RecipeCard.Container>
                </>
              ) : !profile.fetching ? (
                <Alert variant="danger" style={{ width: "100%" }}>
                  No user found.
                </Alert>
              ) : (
                ""
              )
            }
          </ProfileContext.Consumer>
        </ProfileProvider>
      </Container>
    );
  }
}

export default Profile;
