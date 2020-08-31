import React, { useState, useContext } from 'react';

import './auth.css';
import { Card } from '@material-ui/core';

import {useHttp} from '../../shared/hooks/http-hooks';

import {validate, VALIDATOR_REQUIRE, VALIDATOR_EMAIL} from '../../shared/validation/validators';

import {AuthContext} from '../../shared/validation/auth-context';

import ImagesUpload from '../../shared/UIElements/Images';

const Auth = Props => {

    const sendRequest = useHttp();

    const auth = useContext(AuthContext);

    const [isLogin, setLogin] = useState(false);

    const [formState, setFormState] = useState({
        inputs: {
            name: {
                value: '',
                isValid: false,
                isTouched:false
            },
            password: {
                value: '',
                isValid: false,
                isTouched:false
            },
            emailId:{
                value:'',
                isValid:false,
                isTouched:false
            },
            image:{
                value:null,
                isValid:true,
                isTouched:false
            },
            isValid:false
        }
    })

    const onInputHandler = (e = null, title, validators = null) => {

        let value = null;
         value = e.target.value;

        setFormState({
            ...formState,
            inputs: {
                ...formState.inputs,
                [title]: {
                    ...formState.inputs[title],
                    value: value,
                    isValid: validate(value, validators)
                }
            }
        })
    }

    const onTouchedHandler = (title) => {

        console.log(title)

        setFormState({
            ...formState,
            inputs: {
                ...formState.inputs,
                [title]: {
                    ...formState.inputs[title],
                    isTouched:true
                }
            }
        })

    }

   const onSwitchHandler = () => {
        
        let switchLogin = isLogin ? false : true;
        setLogin(switchLogin);

    }

    const onSubmit = async () => {

        // e.preventDefault();
        // const formData = new FormData();

        try{

            const response = await fetch("http://localhost:4000/api/user/signup",{
                method:"POST",
                body:JSON.stringify({
                username:formState.inputs.name.value,
                password:formState.inputs.password.value,
                email:formState.inputs.emailId.value
            }), 
            headers:{
                'Content-Type': 'application/json'
              }
              
            });

          const responseData = await response.json();

          auth.login(responseData.userId, responseData.token);

        }catch(error){
            console.log(error);
        }
    }

    const onLoginHandler = async (e) => {

        try{

            const response = await fetch("http://localhost:4000/api/user/login",{
                method:"POST",
                body:JSON.stringify({
                username:formState.inputs.name.value,
                password:formState.inputs.password.value
            }), 
            headers:{
                'Content-Type': 'application/json'
              }
              
            });

              const responseData = await response.json();

              auth.login(responseData.userId, responseData.token);
    

            }catch(error){

                console.log(error);
                
            }

    }

    return (
        <Card className = 'login-portal'>
          {!isLogin ? <h3 className = 'login-portal__title'>Sign Up</h3>
            :  <h3 className = 'login-portal__title'>Login</h3>}
          <hr />
         <div className = 'login-portal__content'>
         <form>
         
             <div className = 'row'>
            <label><strong>Username:</strong></label>
            <input
                className = 'form-control'
                type='text'
                onBlur = {() => onTouchedHandler("name")}
                onChange={(e) => onInputHandler(e, "name", [VALIDATOR_REQUIRE()])}
            />

            {formState.inputs.name.isTouched && (formState.inputs.name.isValid ? null : <span className = 'login-portal__content__error'>Please enter a username</span>
            )}
            </div>

            <div className = 'row'>
             <label><strong>Password:</strong></label>
            <input
                className = 'form-control'
                type='password'
                onBlur = {() => onTouchedHandler("password")}
                onChange={(e) => onInputHandler(e, "password", [VALIDATOR_REQUIRE()])}
            />
            {formState.inputs.password.isTouched && (formState.inputs.password.isValid ? null : <span className = 'login-portal__content__error'>Please enter a password</span>
            )}
            </div>

            {!isLogin ?            
            <div className = 'row'>
            <label><strong>EmailId:</strong></label>
            <input
                className = 'form-control'
                type='text'
                onBlur = {() => onTouchedHandler("emailId")}
                onChange={(e) => onInputHandler(e, "emailId", [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()])}
            />
            {formState.inputs.emailId.isTouched && (formState.inputs.emailId.isValid ? null : <span className = 'login-portal__content__error'>Please enter a emailId</span>
            )}
            </div>
            :null}

            <div className = 'row'>
            {!isLogin ? <button type = 'button' className = 'btn btn-danger' onClick = {onSubmit}>Sign Up</button>:
                <button type = 'button' className = 'btn btn-primary' onClick = {onLoginHandler}>Login</button>}
            </div>
        </form>
        </div>

        <div className = 'row login-portal__switch-to-login'>
            {!isLogin ? <p onClick = {onSwitchHandler}>Switch to login portal</p>
                :<p onClick = {onSwitchHandler}>Switch to signup portal</p>}
        </div>

        </Card>
    );


}
export default Auth;