import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Home from './components/Home';
import Detail from './components/detail';
import NotFound from './components/notFound';
import Narbar from './components/Narbar'
import SignIn from './components/SignIn';
import Sell from './components/Sell';
import Orders from './components/Orders';
import Dashboard from './components/Dashboard';

function App() {
  return (
  <Router> 
   <Narbar/>
      <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/dashboard' element={<Dashboard/>}/>
       <Route path='/items/:id' element={<Detail/>}/>
       <Route path='/signin' element={<SignIn/>}/>
       <Route path='/sell' element={<Sell/>}/>
       <Route path='/orders/:id' element={<Orders/>}/>
       <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Toaster/>
   </Router>
  
  );
}
 
export default App;
