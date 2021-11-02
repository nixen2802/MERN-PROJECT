import './Body.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
function Body(){
    return(
    <div id='body'>
      
      <BrowserRouter>
        <Route exact path ="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </BrowserRouter>
    </div>
        
        
        
  );

}


export default Body;