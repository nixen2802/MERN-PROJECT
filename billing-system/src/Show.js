import './Show.css';
import React from 'react'
export default class Detials extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value:this.props.location.state,
        }
        console.log(this.props.location.state)
    }

render(){
return (
    <div>
        This is the addition of products page
    </div>

    )
}

}