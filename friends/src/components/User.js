import React, { Component } from "react";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import axios from "axios";
import UserDetails from "./UserDetails";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: null,
      firstname: "",
      lastname: "",
      avatar: "",
      userList: [],
    };
  }
  

  //function which is called the first time the component loads
  componentDidMount() {
    this.getUserList();
  }

  //Function to get the User Data from json
  getUserList() {
    axios.get("http://localhost:3200/v1/allUsers").then((response) => {
      this.setState({ userList: response.data });
    });
  }

  render() {
    if (!this.state.userList) return <p>Loading data</p>;
    return (
      <div className="addmargin">
        <div className="col-md-3">
          {this.state.userList.map((user) => (
            <Panel bsStyle="info" className="centeralign">
              <Panel.Heading>
                <Panel.Title componentClass="h3" >{user.name}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <img src={user.avatar} alt="avatar" width="100" height="120"></img>
                <p><b>{user.firstname}</b></p>
                <Button 
                  bsStyle="info"
                  onClick={() =>
                    this.setState({
                      selectedUserId: user.id,
                      firstname: user.firstname,
                      lastname: user.lastname,
                      avatar: user.avatar,
                    })
                  }
                >
                  Click to View Details
                </Button>
              </Panel.Body>
            </Panel>
          ))}
        </div>
        <div className="col-md-6">
          <UserDetails
            id={this.state.selectedUserId}
            firstname={this.state.firstname}
            lastname={this.state.lastname}
            avatar={this.state.avatar}
          />
        </div>
      </div>
    );
  }
}
