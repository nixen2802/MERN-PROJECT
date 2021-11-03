import './Register.css'
import React, { Component } from 'react';
import axios from 'axios';
class Register extends Component {
  constructor(props) {
    super(props);
    // this.handleInputChange=this.handleSubmit.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
      conpassword: '',
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { email, password, conpassword } = this.state;

    const user = {
      email,
      password,
      conpassword,
    };
    this.setState({
      email: "",
      password:"",
      conpassword:""
    });
    axios
      .post('http://localhost:5000/register',user)
      .then((result) =>{
        console.log(result.data)
        if(result.data==="Success")
        {
          this.props.history.push('/login')
        }
        else
        {
          alert("You have enetered something wrong!!!")
        }
      }
      )
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div>
        <br />
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={this.handleInputChange}
                value={this.state.password}
              />
            </div>
            <br />
            <div style={{ width: '30%' }} className="form-group">
              <input
                type="text"
                className="form-control"
                name="conpassword"
                placeholder="Confirm password"
                onChange={this.handleInputChange}
                value={this.state.conpassword}
              />
            </div>
            <br />
            <div style={{ width: '30%' }}>
              <button className="btn btn-success" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;