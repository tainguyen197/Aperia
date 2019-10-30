import React from "react";
import "./App.css";
import EmployeeListTable from "../../component/employeeListTable/employeeListTable";
import DetailInfoEmployeeForm from "../../form/detailInfoEmployeeForm/detailInfoEmployeeForm";
import { Button, Modal, Container } from "react-bootstrap";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userAction from "../../actions/userAction.js";
// import undefined from "firebase/empty-import";

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showNotificate: false,
      show: false,
      modalMode: undefined,
      dataEmployeer: undefined
    };
  }
  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  submitResult = (user,mode) => {
    if(mode === 1){
    this.props.editUserInfo(user)
    }
    else if(mode === 0){
      this.props.addUserInfo(user);
    }
  };
  dataEmployeer = employeerCode => {
    this.setState({
      modalMode: 1,
      dataEmployeer: employeerCode
    });
    this.handleShow();
  };

  addNewEmployeer = () => {
    this.setState({
      modalMode: 0,
      dataEmployeer: undefined
    });
    this.handleShow();
  };

  render() {
    return (
      <Container>
        <h1 style={{ textAlign: "center" }}>XYZ Company</h1>
        

        <EmployeeListTable
          dataEmployeer={this.dataEmployeer}
        ></EmployeeListTable>
        <Button variant="primary" onClick={this.addNewEmployeer}>
          Add new employeer
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.modalMode === 1
                ? "Edit employee"
                : "Add new employee"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DetailInfoEmployeeForm
              submitResult={this.submitResult}
              modalMode={this.state.modalMode}
              data={this.state.dataEmployeer}
              handleClose={this.handleClose}
            />
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUserInfo: bindActionCreators(userAction.ADD_USER_INFO, dispatch),
    editUserInfo: bindActionCreators(userAction.EDIT_USER_INFO,dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
