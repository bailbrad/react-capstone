import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';

import Button from "../button/button.component";

const defaultFormFields = { //initializing default values
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields) //default ff is now default state
    //reminder - useState returns array of value to store and setter function
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password != confirmPassword){
            alert("Passwords do not match");
            return;
        }
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password); 
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();

        } catch (error){
            if (error.code === 'auth/email-already-in-use'){
                alert("Email already in use");
            } else{
                console.log("Error in user creation", error);
            }
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields ({...formFields, [name]: value}) //generic logic to update targeted parts of state
        console.log(formFields);
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit = {handleSubmit}>

                <FormInput 
                    label = "Display Name"  
                    type ="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value = {displayName}/>
                
                <FormInput 
                    label = "Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email"
                    value={email} />
                
                <FormInput 
                    label = "Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}/>
                
                <FormInput 
                    label = "Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword"
                    value={confirmPassword}/>

                <Button type="submit">Sign Up </Button>
            </form>
        </div>
    )
}

export default SignUpForm;