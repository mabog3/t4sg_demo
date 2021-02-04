import React, {useState} from 'react'
import { Link } from "@reach/router"
import { auth, generateUserDocument, firestore } from './firebase'
import Error from './Error'
import { UserContext } from "./providers/UserProvider"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './styles.css'



const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conf, setConf] = useState('')
    const [username, setUsername] = useState("")
    const [error, setError] = useState(null)
    const [firstName, setFirst] = useState('')
    const [lastName, setLast] = useState('')
    const [cmsg, setCmsg] = useState('')
    const [pwMsg, setPwMsg] = useState('')
    const [disab, setDisab] = useState(true)
    


    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password)
            generateUserDocument(user, {displayName:username}, {firstName:firstName, lastName:lastName}).then(() => {
                const userRef = firestore.doc(`users/${user.uid}`)
                console.log(userRef)
                const addData = userRef.set({
                    firstName:firstName,
                    lastName:lastName,
                    displayName:username,
                }, { merge: true })
            }
            )
        } catch(err){
            setError(err)
            console.log(error, 'signup') //{message:'Error Signing up with email and password'}
        }
    }

    const handleEmail = input => {
        setEmail(input)
        if (input.length < 1) {
            setDisab(true)
        }
        else {
            setDisab(false)
        }
    }

    const handleInput = (input, id) => {
        if (id === 'fn') 
        {
            setFirst(input) 
        }
        if (id === 'ln')
        {
            setLast(input)
        }
        if (id === 'un'){
            setUsername(input)
        }
        if (input.length < 1) {
            setDisab(true)
        }
        else {
            setDisab(false)
        }
    }
    const handlePassword = input => {
        setPassword(input)
        if (input.length < 8) {
            setPwMsg('Passwords must be longer than 8 characters')
            setDisab(true)
        }
        else {
            setDisab(false)
            setPwMsg('')
        }
    }

    const handleConfirm = input => {
        setConf(input)
        if (input !== password) {
            setCmsg('Passwords do not match!')
            setDisab(true)
        }
        else {
            setCmsg('')
            setDisab(false)
        }
    }

    return (
        <div style={{marginLeft:'20%', marginRight:'20%', marginTop:30}}>
            <h1 style={{marginBottom:35}}>Registration</h1>
            <Form style={{width:'100%'}}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e=>handleEmail(e.target.value)} required/>
                    <Form.Text style={{color:'red'}}></Form.Text>
                </Form.Group>
                <Form.Group controlId="text">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" placeholder="Username" value={username} onChange={e=>handleInput(e.target.value, 'un')}/>
                    <Form.Text style={{color:'red'}}></Form.Text>
                </Form.Group>

                <Form.Group controlId="text">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required type="text" placeholder="Username" value={firstName} onChange={e=>handleInput(e.target.value, "fn")}/>
                    <Form.Text style={{color:'red'}} ></Form.Text>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type="text" placeholder="Username" value={lastName} onChange={e=>handleInput(e.target.value, 'ln')}/>
                    <Form.Text style={{color:'red'}} ></Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" value={password} onChange={e=>handlePassword(e.target.value)} required/>
                    <Form.Text style={{color:'red'}} >{pwMsg}</Form.Text>

                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder='Confirm Password' value={conf} onChange={e=>handleConfirm(e.target.value)}/>
                    <Form.Text style={{color:'red'}}>{cmsg}</Form.Text>
                </Form.Group>

                <div style={{display:'flex', justifyContent:'center'}}>
                <Button variant="primary" type="submit" onClick={e=>handleRegister(e)} disabled={disab}>
                    Register
                </Button>
                <Link to="/">
            Sign in here
                </Link>
                </div>
                
                </Form>
            
          <Error error={error}/>

        </div>
        )
}
export default Register