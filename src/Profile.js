import React, { useContext, useState } from "react"
import { UserContext } from "./providers/UserProvider"
import {auth, firestore} from "./firebase"
import {Redirect} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'




const Profile = (props) => {

    const [data, setData ]  = useState({})
    const [un, setUN] = useState('')
    const [fn, setFN] = useState('')
    const [ln, setLN] = useState('')

    const user = useContext(UserContext)
    if (!user) {
        return (
            <Redirect to="/"></Redirect>
        )
    }
    const userRef = firestore.doc(`users/${user.uid}`)
    userRef.get().then((us) => {
        if (us.exists) {
            setData(us.data())
        } else {
            console.log("No such us!")
        }})

        console.log(data.firstName)
        console.log(data)
    const handleChange = async () => {
        if (fn.length < 1 || un.length < 1 || ln.length < 1) {
            alert("Info fields may not be empty")
        }

        else {
            try {
            const changeData = await userRef.set({
                firstName:fn,
                lastName:ln,
                displayName:un,
            }, { merge: false })
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
        }
    }
    
    return (
        <div>
            <h1>Welcome, {data.firstName} {data.lastName}!</h1>
            <p>
            {data.displayName} {data.email} 
            </p>

            <h2>Edit my info</h2>
            <div style={{marginLeft:'30%', marginRight:'30%'}}>
            <Form style={{width:'100%'}}>
                <Form.Group controlId="text">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" placeholder="Username"value={un} onChange={e=>{setUN(e.target.value)
                    console.log(e.target.value)}}/>
                    <Form.Text>Current value: {data.displayName}</Form.Text>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required type="text" placeholder="First Name" value={fn} onChange={e=>setFN(e.target.value)}/>
                    <Form.Text>Current value: {data.firstName}</Form.Text>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required type="text" placeholder="Last Name" value={ln} onChange={e=>setLN(e.target.value)}/>
                    <Form.Text>Current value: {data.lastName}</Form.Text>
                </Form.Group>
                <Button type='submit' onClick={handleChange}>Submit Changes</Button>
                </Form>
            </div>
            
            <Button onClick={() => {auth.signOut()}}>Sign Out</Button>
        </div>

    )
}

export default Profile