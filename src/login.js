import React, {useState, useContext} from 'react'
import { Link } from "@reach/router";
import { auth, signInWithGoogle } from './firebase';
import { UserContext } from "./providers/UserProvider"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Error from './Error'


const Login = () => {
    const user = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);

    const handleLogin = e => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password).catch(err => {
            setError(err);
            console.log(err)
          })
        console.log(user)
    }

    return (
        <div style={{marginLeft:'20%', marginRight:'20%'}}>
            <h1 style={{marginBottom:35}}>Login</h1>
            <Form style={{width:'100%'}}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
                </Form.Group>

                <div style={{display:'flex', justifyContent:'center'}}>
                <Button variant='primary' type='submit' onClick={e=>handleLogin(e)}>Login</Button>
                <Button variant='primary'> <Link style={{color:'white'}} to="Register">Sign up here</Link> </Button>
                <Button variant='primary' onClick={signInWithGoogle}>Sign in with Google</Button>
                </div>
                
                </Form>
            
          <Error error={error}/>
           
        </div>
        )
}

export default Login