import './Body.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Show from './Show';
import Addbill from './Addbill';
import Showproducts from './Showproducts';
import Addproducts from './Addproducts';
import Showbill from './Showbill';
function Body(){
    return(
    <div id='body'>
      
      <BrowserRouter>
        <Route exact path ="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/show" component={Show} />
        <Route exact path="/addbill" component={Addbill} />
        <Route exact path="/showproducts" component={Showproducts} />
        <Route exact path="/addproducts" component={Addproducts} />
        <Route exact path="/showbill/:id" component={Showbill} />
      </BrowserRouter>
    </div>
        
        
        
  );

}


export default Body;