// import './Register.css';
// import axios from 'axios';
// function clicked(e){
//     alert("Something");
//     axios.post('http://localhost:5000/register')
//         .then(res=>console.log(res.data));
//     e.preventDefault();
// }
// function Register(){
//     return(
//         <div>
//         <form onSubmit={clicked}>
//             <div className="form-group text-left">
//                 <label>Email address</label>
//                 <input type="email" id="email" name="email" placeholder="Enter email"/>
//             </div>
//             <div className="form-group text-left">
//                 <label>Password</label>
//                 <input type="password" id="password" placeholder="Password"/>
//             </div>
//             <div className="form-group text-left">
//                 <label>Confirm Password</label>
//                 <input type="password" id="confirmPassword" placeholder="Confirm Password" />
//             </div>
//             <button type="submit" className="btn btn-primary">Register</button>
//         </form>
//         </div>
//     )
// }
// export default Register;


import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange=this.handleSubmit.bind(this);
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

    axios
      .post('http://localhost:5000/register',user)
      .then(() => console.log('User created'))
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
              />
            </div>
            <br />
            <div style={{ width: '30%' }}>
              <button className="btn btn-success" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;