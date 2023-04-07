
import React, { useState }  from "react"
import {
  //MDBContainer,
  //MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
}
from 'mdb-react-ui-kit';

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  //let [authMode1, setAuthMode1] = useState("forgot_password")
  const changeAuthMode = () => {
    //setAuthMode(authMode === "signin" ? "signup" : "signin" )
    if (authMode === "signin")
      setAuthMode("signup")
    else if (authMode === "signup")
      setAuthMode("signin")
}
 const changeAuthMode1 = () => {
  //setAuthMode(authMode === "signin" ? "signup" : "signin" )
  if (authMode === "signin")
    setAuthMode("change_password")
  else if (authMode === "change_password")
    setAuthMode("signin")
}

const changeAuthMode2 = () => {
  //setAuthMode(authMode === "signin" ? "signup" : "signin" )
  if (authMode === "signin")
    setAuthMode("forgot_password")
  else if (authMode === "forgot_password")
    setAuthMode("signin")
}

const changeAuthMode3 = () => {
  //setAuthMode(authMode === "signin" ? "signup" : "signin" )
  if (authMode === "forgot_password")
    setAuthMode("continue")
  else if (authMode === "continue")
    setAuthMode("forgot_password")
}

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div style={{padding:'5px'}}>
               <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>
            <p className="text-center mt-2">
               <span className="link-primary" onClick={changeAuthMode2}>Forgot password?</span>
            </p>
            <p className="text-center mt-2">
               <span className="link-primary" onClick={changeAuthMode1}>Change Password?</span>
            </p>
            <div className="text-center">
              <p>Or sign in with:</p>
            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

if (authMode === "signup") {
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g: Tran Hoang"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g: hoang@gmail.com"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Repeat Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Repeat Password"
            />
          </div>
          <div style={{padding:'5px'}}>
               <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </div>
          <div className="text-center">
              <p>Or sign up with:</p>
            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>
            </div>
        </div>
      </form>
    </div>
  )
  }

if (authMode === "change_password") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Change Password</h3>
            <div className="text-center">
                Back to login page?{" "}
              <span className="link-primary" onClick={changeAuthMode1}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Old Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Old password"
              />
            </div>
            <div className="form-group mt-3">
              <label>New Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="New password"
              />
            </div>
            <div className="form-group mt-3">
            <label>Repeat Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Repeat Password"
            />
          </div>
            <div style={{padding:'5px'}}>
               <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                  Change
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  if (authMode === "forgot_password") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Forgot Password</h3>
            <div className="text-center">
                Back to login page?{" "}
              <span className="link-primary" onClick={changeAuthMode2}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div style={{padding:'5px'}}>
               <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Agree to use the confirmation code sent to the email' />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={changeAuthMode3}>
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  if (authMode === "continue") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Change Password</h3>
            <div className="text-center">
              <span className="link-primary" onClick={changeAuthMode3}>
                Back
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Confirmation Code</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Code"
              />
            </div>
            <div className="form-group mt-3">
              <label>New Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="New password"
              />
            </div>
            <div className="form-group mt-3">
            <label>Repeat Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Repeat Password"
            />
          </div>
            <div style={{padding:'5px'}}>
               <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" onClick={changeAuthMode}>
                  Change
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}