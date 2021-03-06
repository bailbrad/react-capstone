import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";
import { createUserDocumentFromAuth, 
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = { //initializing default values
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields) //default ff is now default state
    //reminder - useState returns array of value to store and setter function
    const {email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error){
            switch (error.code){
                case 'auth/wrong-password':
                    alert("Wrong password for email");
                    break;
                case 'auth/user-not-found':
                    alert("No user associated with this email")
                    break;
                default:
                    console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields ({...formFields, [name]: value}) //generic logic to update targeted parts of state
        console.log(formFields);
    }

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit = {handleSubmit}>

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

                <div className="buttons-container">
                    <Button type="submit">Sign In </Button>
                    <Button type="button" onClick = {signInWithGoogle} buttonType = "google">Google Sign In</Button>
                </div>
                
            </form>
        </div>

    )

}

export default SignInForm;