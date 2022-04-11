import React, { useState, useContext, useEffect } from 'react';
import fire from '../../config/Fire';
import { AuthContext } from '../../context/Auth';
import { withRouter, Redirect, Link } from 'react-router-dom';
import KidoLogo from '../../assets/kido-logo.jpg';
import './SignUp.css';


function SignUp(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fireErrors, setFireErrors] = useState("");


  const register = (event) => {
    event.preventDefault();
    fire.auth().createUserWithEmailAndPassword(email, password)
     .catch((error) => {
        setFireErrors(error.message)
     })
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }



  let errorNotification = fireErrors ? 
  (<div className="alert alert-danger" role="alert">{fireErrors}</div>) : null;

  return(
    <section className="auth py-5">
    <div className="authentication">
    <div className="container">
    <div className="text-center">
            <img src={KidoLogo} width="200" alt="icon"/>
          </div>
        <div className="row justify-content-center">
       
            <div className="col-md-5 col-lg-5">
                <div className="mt-4 px-5 py-4 bg-white border shadow-lg rounded signup-box">
                <h2 className="text-center">Sign Up</h2>
                <div>{errorNotification}</div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="text" className="form-control" id="email" name="email" value={email} placeholder="Enter a email" onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter a password" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <button onClick={register} className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20">Sign up Now</button>
                    </div>
                    {/* <div className="or py-3">
                    <h3><span>or</span></h3>
                    </div> */}
                    {/* <div className="row pt-3">
                      <div className="col-lg-12 text-center">
                      <p class="text-center">Have an account? <Link to="/login">Log in</Link></p>
                      </div>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
    </div>
    </section>




  );

}

export default withRouter(SignUp);
