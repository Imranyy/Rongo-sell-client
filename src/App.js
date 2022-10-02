import './App.css';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';
import Home from './components/Home';
import Detail from './components/detail';
import NotFound from './components/notFound';
import Narbar from './components/Narbar'
import SignIn from './components/SignIn';
import Sell from './components/Sell';
import Orders from './components/Orders';
import Dashboard from './components/Dashboard';
import { useEffect } from 'react';

function App() {
  async function checkUI(){
    try {
      const url='https://tinypesa-biz-api.onrender.com/api/verify'
      const response=await fetch(url,{
        method:'GET',
        headers:{
          authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      const parseRes= await response.json();
    } catch (err) { 
      toast.error('You are logged out...')
      console.log(err.message);
    }
  }
  useEffect(()=>{
    checkUI();
  })
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
