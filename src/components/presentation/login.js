import React from "react";
import update from 'immutability-helper';
import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import { isLoaded } from 'react-redux-firebase'

  class Login extends React.Component {
  constructor(props, context) {
    console.log(props)
    super(props, context);
            this.state = {
              email:'',
              password:''
          };       
    }
    componentDidMount(){
      console.log(this.props)
      if(this.props.auth?.uid){
        this.props.history.push('/')
      }
    }
    componentDidUpdate(prevProps, prevState)
    {
      console.log("Prev props ")
      console.log(prevProps);
      console.log('new props')
      console.log(this.props);

      if(this.props.auth?.uid!=undefined)
      {
        this.props.history.push('/')
      }
    }
handleChange= (e)=>{
  console.log(e.target);
  this.setState({[e.target.name]:e.target.value})
}
    onSubmit=async()=>{
      console.log(this.props.signIn)
      
        console.log('Hello')
      let obj = {email:this.state.email,password:this.state.password}
      console.log(obj)
      let method=  this.props.signIn(obj)
      if(this.props.auth.uid!=undefined) 
       this.props.history.push('/');
   
    }

  render() { 
    return (
      <>
      {!isLoaded(this.props.auth)?<></>:
      <>
      {this.props.auth.loading?<h4 style={{marginTop:'10%',height:'52vh'}}>Patiently Wait...we are logging you in</h4>:
          <div className="container med contact">
            <div className="section funnel-section">
                <div className="form-card">
                    <h2 className="form-heading center">Enter Login details</h2>
                    <div className="form-section">
                        <div className="input-group full"><label>Email</label>
                            <div className="effect"><input type="text" name="email" value={this.state.email || ''}  onChange={this.handleChange}  /><span></span>
                            </div>
                        </div>

                        <div className="input-group full"><label>Password</label>
                            <div className="effect"><input  type="password" name="password"  value={this.state.password || ''} onChange={this.handleChange}/><span></span>
                            </div>
                        </div>
                        {this.props.authMine?.ErrorMessage?.message?<div className="input-group full">
                                <span className="error-message" >{this.props.authMine?.ErrorMessage?.message}</span> 
                        </div> :<></>}  
                        <div className="form-buttons">
                            <button onClick={this.onSubmit} className="btn hvr-float-shadow" type='button'>Login</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
  }
  </>
  }
        </>
    );
  }
}


 
const mapStateToProps=(state)=>{
  return{
     auth: state.firebase.auth,
     authMine:state.auth
  }
}


const mapDispatchToProps=(dispatch)=>{
  return{
     signIn:(userData)=>{dispatch(authActions.signIn(userData))}
  }
}

  export default connect(mapStateToProps,mapDispatchToProps)(Login)