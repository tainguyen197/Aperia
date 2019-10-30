import React from "react";
import "./detailInfoEmployeeForm.css";
import {
  Form,
  Button,
  Row,
  Col
} from "react-bootstrap";
import {formatDate} from '../../config/formatDate';

class DetailInfoEmployeeForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      employeeCode: undefined,
      employeeName: undefined,
      email: undefined,
      phone: undefined,
      DOB: undefined,
      startDate: undefined
    };
  }

  handleClose = () => {
    this.props.handleClose(false);
  };

  onChange = (evt) =>{
    this.setState({[evt.target.name]: evt.target.value})
  }
  submit = (evt) =>{
    this.handleClose();
    const userInfo = {
      employeeCode: this.state.employeeCode,
      employeeName: this.state.employeeName,
      email: this.state.email,
      phone: this.state.phone,
      DOB: new Date(this.state.DOB),
      startDate: new Date(this.state.startDate)
    }
    evt.preventDefault();
    this.props.submitResult( userInfo,this.props.modalMode);
    
  }

  componentDidMount(){
    const {data} = this.props;
    if(data){
      this.setState({
        employeeCode: data.employeeCode,
        employeeName: data.employeeName,
        email: data.email,
        phone: data.phone,
        DOB: formatDate(data.DOB),
        startDate: formatDate(data.startDate)
      })
    }
  }
  render() {
    return (
      <>
      <Form onSubmit = {this.submit}>
        <Form.Group >
          <Form.Label>
            Employee Code <span className="required">*</span>
          </Form.Label>
          <Form.Control name="employeeCode" type="text" value={this.state.employeeCode} onChange={this.onChange} required readOnly={this.props.modalMode===1?true:false}/>
        </Form.Group>
        <Form.Group >
          <Form.Label>
            Employee Name <span className="required">*</span>
          </Form.Label>
          <Form.Control name='employeeName' type="text" value={this.state.employeeName} onChange={this.onChange} required />
        </Form.Group>
        <Form.Group >
          <Form.Label>
            DOB <span className="required">*</span>
          </Form.Label>
          <Form.Control  name="DOB" value={this.state.DOB} onChange={this.onChange} type="date" required/>
        </Form.Group>
        <Form.Group >
          <Form.Label>Email</Form.Label>
          <Form.Control name='email' value={this.state.email} onChange={this.onChange} type="email"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Phone Number <span className="required">*</span>
          </Form.Label>
          <Form.Control name="phone" value={this.state.phone} onChange={this.onChange} type="number" required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Start Date <span className="required">*</span>
          </Form.Label>
          <Form.Control name="startDate" value={this.state.startDate} onChange={this.onChange} type="date" required/>
        </Form.Group>
        <Row>
          <Col><span className="required">*</span> Vadicates a required field</Col>
          <Col  className = "flexRight"> <Button variant="primary" onChange={this.onChange} style={{marginRight:'10px'}} onClick = {this.submitForm} type="submit">
          Submit
        </Button>
        <Button onClick = {this.handleClose} variant="secondary">Cancel</Button></Col>
        </Row>
       
      </Form>
      </>
    );
  }
}

export default DetailInfoEmployeeForm;
