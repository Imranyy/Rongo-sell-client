import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
const Narbar=()=>{
    const [isAuth,setIsAuth]=useState(true);
    const loggedinLink=document.querySelectorAll('.logged-in');
    const loggedoutLink=document.querySelectorAll('.logged-out');
   
    //setupUI for logged in and logged out admins
    useEffect(()=>{
      const fetchUi=async()=>{
        try {
          const url='https://tinypesa-biz-api.onrender.com/api/verify'
          const response=await fetch(url,{
            method:'GET',
            headers:{
              authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })
          const parseRes= await response.json();
          parseRes===true ? setIsAuth(true): setIsAuth(false);
        } catch (err) { 
          setIsAuth(false);
          console.log(err.message);
          toast.error('You are logged out...');
        }
      }
      fetchUi();
    },[])

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
      parseRes===true ? setIsAuth(true): setIsAuth(false);
    } catch (err) { 
      console.log(err.message);
      setIsAuth(false);
    }
  }
  if(isAuth){
    loggedinLink.forEach(item=>item.style.display='block');
    loggedoutLink.forEach(item=>item.style.display='none');
  }else{
    loggedinLink.forEach(item=>item.style.display='none');
    loggedoutLink.forEach(item=>item.style.display='block');
  }
  
  const loggOut=()=>{
    toast.success('sign out successful')
    setIsAuth(false);
    localStorage.clear();
  };
    return(
        <>
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
            <Link className="navbar-brand" to='/' style={{fontFamily:"monospace",color:'whitesmoke'}}>
                🛒Rongo Buy</Link>
            <button className="navbar-toggler" onClick={checkUI} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" ></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link className="nav-link active logged-in" to='/dashboard' style={{color:'whitesmoke',fontFamily:"monospace",borderBottom:'solid 1px grey',display:'none'}} aria-current="page"><div data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">😎 {localStorage.getItem('name')}</div></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to='/' style={{color:'whitesmoke',fontFamily:"monospace",borderBottom:'solid 1px grey'}} aria-current="page"><div data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">🛒 Store</div></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active logged-out" to='/signin' style={{color:'whitesmoke',fontFamily:"monospace",borderBottom:'solid 1px grey',display:'none'}} aria-current="page"><div data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">👌 Sign in</div></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active logged-in" to='/sell' style={{color:'whitesmoke',fontFamily:"monospace",borderBottom:'solid 1px grey',display:'none'}} aria-current="page"><div data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">🤑 Sell</div></Link>
                </li>
                <li className="nav-item">
                    <a className="nav-link active logged-in" onClick={loggOut} style={{color:'whitesmoke',fontFamily:'monospace',borderBottom:'solid 1px grey',display:'none'}} aria-current="page"><div data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">😟 Sign Out</div></a>
                </li>

                </ul>
            </div>
            </div>
        </nav>
        </>
    )
}
export default Narbar;