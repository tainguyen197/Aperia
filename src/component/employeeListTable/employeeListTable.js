import React from "react";
import {Table } from "react-bootstrap";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userAction from "../../actions/userAction.js";
import { formatDate } from "../../config/formatDate";
import "./employeeListTable.css";

import "firebase/analytics";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import { firebaseConfig } from "../../config/firebaseConfig";

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

class EmployeeListTable extends React.Component {
  deleteUser = employee => {
    let confirm = window.confirm("Are you sure!");
    if (confirm) {
      //update store
      this.props.deleteUserInfo(employee);
    }
  };

  editUser = employee => {
    this.props.dataEmployeer(employee);
  };
  componentDidMount() {
    db.collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          data.DOB = new Date(data.DOB.seconds * 1000);
          data.startDate = new Date(data.startDate.seconds * 1000);
          this.props.addUserInfo(data);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }
  render() {
    return (
      <div className="employeeListTable">
        <h4>Employee List</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Code</th>
              <th>Employee Name</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.userInfo.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.employeeCode}</td>
                  <td>{user.employeeName}</td>
                  <td>{formatDate(user.DOB)}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{formatDate(user.startDate)}</td>
                  <td>
                  <table >
                    <tbody>
                      <tr style={{ backgroundColor: "unset" }}>
                        <td
                          onClick={e => this.editUser(user)}
                          className="action"
                        >
                          Edit
                        </td>
                       <td className="action">&nbsp;|&nbsp;</td>
                        <td
                          onClick={e => this.deleteUser(user)}
                          className="action"
                        >
                          Delete
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserInfo: bindActionCreators(userAction.GET_USER_INFO, dispatch),
    addUserInfo: bindActionCreators(userAction.ADD_USER_INFO, dispatch),
    deleteUserInfo: bindActionCreators(userAction.DELETE_USER_INFO, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeListTable);
