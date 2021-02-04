const Error = props => {

    if (props.error !== null){
        if (props.error.message !== null){
            return (
                <p>{props.error.message}</p>
            )
        }
        else {
            return null
        }
        
    }
    else {
        return null
    }
    
}

export default Error