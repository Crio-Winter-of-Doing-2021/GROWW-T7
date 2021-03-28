import React, { Component } from 'react';
import 'whatwg-fetch';

import {
    getFromStorage,
    setInStorage
} from '../../utils/storage'
import Explore from '../explore/Explore';

class Landing extends Component {
    constructor(props) {
        super(props);
       this.state = {
          isLoading: false,
          token: '',
          signUpError: '',
          signInError: '',
          masterError:'',
          signInEmail: '',
          signInPassword: '',
          signUpEmail: '',
          signUpPassword: '',
        };
        this.onSignIn = this.onSignIn.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.logout = this.logout.bind(this);
        this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
      }
      componentDidMount() {
          const token = getFromStorage('the_main_app');
          if(token){
              //verify token
              fetch('api/account/verify?token='+token).then(res => res.json()).then(json=>{
                  if(json.success){
                      this.setState({
                          token,
                          isLoading:false,
                      })
                  }
              })
          }else{
            this.setState({
                isLoading: false
              });
          }  
     }

     onTextboxChangeSignInEmail(event){
         this.setState({
             signInEmail: event.target.value
         })
     }

     onTextboxChangeSignInPassword(event){
        this.setState({
            signInPassword: event.target.value
        })
    }

    onTextboxChangeSignUpEmail(event){
        this.setState({
            signUpEmail: event.target.value
        })
    }

    onTextboxChangeSignUpPassword(event){
        this.setState({
            signUpPassword: event.target.value
        })
    }
     
    onTextboxChangeSignUpFirstName(event){
        this.setState({
            signUpFirstName: event.target.value
        })
    }

    onTextboxChangeSignUpLastName(event){
        this.setState({
            signUpLastName: event.target.value
        })
    }

    onSignUp() {
        // Grab state
        const {
          signUpEmail,
          signUpPassword,
        } = this.state;
        this.setState({
          isLoading: true,
        });
        // Post request to backend
        fetch('/api/account/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: signUpEmail,
            password: signUpPassword,
          }),
        }).then(res => res.json())
          .then(json => {
            console.log('json', json);
            if (json.success) {
              this.setState({
                signUpError: json.message,
                isLoading: false,
                signUpEmail: '',
                signUpPassword: '',
              });
            } else {
              this.setState({
                signUpError: json.message,
                isLoading: false,
              });
            }
          });
      }

      onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;
    this.setState({
      isLoading: true,
    });
    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
    
      render() {
        const {
          isLoading,
          token,
          signInError,
          signInEmail,
          signInPassword,
          signUpEmail,
          signUpPassword,
          signUpError,
        } = this.state;
        if (isLoading) {
          return (<Explore/>);
        }
        if (!token) {
          return (
            <div>
              <div>
                {
                  (signInError) ? (
                    <p>{signInError}</p>
                  ) : (null)
                }
                <h3 style={{textAlign:'center'}}>Sign In</h3>
                <form>
                <div className="form-group"> 
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email" class="form-control"
                  placeholder="Enter Email"
                  value={signInEmail}
                  onChange={this.onTextboxChangeSignInEmail}
                />
                </div>
                <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input className="form-control"
                  type="password"
                  placeholder="Enter Password"
                  value={signInPassword}
                  onChange={this.onTextboxChangeSignInPassword}
                />
                </div>
                <button className="btn btn-primary" onClick={this.onSignIn}>Sign In</button>
                </form>
              </div>
              <br />
              <br />
              <div>
                {
                  (signUpError) ? (
                    <p>{signUpError}</p>
                  ) : (null)
                }
                <h3 style={{textAlign:'center'}}>Sign Up</h3>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={signUpEmail}
                  onChange={this.onTextboxChangeSignUpEmail}
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={signUpPassword}
                  onChange={this.onTextboxChangeSignUpPassword}
                /><br />
                <button className="btn btn-primary" onClick={this.onSignUp}>Sign Up</button>
              </div>
           </div>
          );
        }
        return (
            
            <div>
            <p>Account</p>
            
            <button onClick={this.logout}>Logout</button>
          </div>
        );
      }    
    
}


export default Landing