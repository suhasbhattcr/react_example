import React, { Component } from "react";
import Panel from "react-bootstrap/lib/Panel";
import axios from "axios";

//This Component is a child Component of Users Component
export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
    };
    console.log(this.state);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.id !== prevProps.id) {
      this.getFriends(this.props.id);
    }
  }

  //Function to Load the Friends data from json.
  getFriends(id) {
    axios.get(`http://localhost:3200/v1/allFriends/${id}`).then((response) => {
      this.setState({ friends: response.data });
    });
  }

  render() {
    if (!this.state.friends) return <p>Loading Data</p>;
    return (
      <div className="Friends">
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossorigin="anonymous"
        ></script>
        <Panel bsStyle="info" className="centeralign">
          <Panel.Heading>
            <Panel.Title componentClass="h3">
              {this.props.firstname}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <img
              src={this.props.avatar}
              alt="avatar"
              width="150"
              height="175"
            ></img>
            <h4>
              <b>
                {this.props.firstname} {this.props.lastname}
              </b>
            </h4>
            <h4>Friends:</h4>
            {this.state.friends.map((friend) => (
              <Panel
                bsStyle="info"
                key={friend.firstname}
                className="centeralign"
              >
                <Panel.Heading>
                  <Panel.Title componentClass="h3">
                    {friend.firstname}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <img
                    src={friend.avatar}
                    alt="avatar"
                    width="100"
                    height="120"
                  ></img>
                  <p>
                    <b>
                      {friend.firstname} {friend.lastname}
                    </b>
                  </p>
                </Panel.Body>
              </Panel>
            ))}
          </Panel.Body>
        </Panel>
      </div>
    );
  }
}
