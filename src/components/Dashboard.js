import React from 'react';
import toast from 'react-hot-toast';
import {useState} from 'react';
import { Link } from "react-router-dom";

function Dashboard() {
    const [items,setItems]=useState([])
    const getItems=async()=>{
        try {
            preloader();
            const url='https://tinypesa-biz-api.onrender.com/api/getUserItems';
            const response=await fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    userId:localStorage.getItem('userId')
                }),
                headers:{
                    'content-type':'application/json'
                }
            })
            const parseRes=await response.json();
            setItems(parseRes);
            preloaderoff();
        } catch (error) {
            toast.error('failed!!')
            console.log(error);
            preloaderoff();
        }
    }
     //preloader
 const preloader=()=>{
    const loader=document.querySelector('.preload');
    loader.style.display='block';
  }
  const preloaderoff=()=>{
    const loader=document.querySelector('.preload');
    loader.style.display='none';
  }
    return (
        <>
            <div className='preload'></div>
            <div style={{fontFamily:'monospace',marginTop:'20px',marginLeft:'30px'}}>
            Username: <small style={{color:'GrayText'}}>{localStorage.getItem('name').toUpperCase()}</small><br/>
            Phone: <small style={{color:'GrayText'}}>0{localStorage.getItem('number')}</small><br/>
            Location: <small style={{color:'GrayText'}}>{localStorage.getItem('location').toUpperCase()}</small><br/>
            UserID: <small style={{color:'GrayText',fontStyle:'oblique'}}>{localStorage.getItem('userId').slice(0,10)}</small><br/>
            <a className="btn btn-link" onClick={getItems} style={{fontFamily:'monospace'}}>Get My Items</a>
            </div>

            <div className="landing">
                {items?items.map(item=>(
                    <div key={item._id} className="land card" style={{width: '18rem'}}>
                    <img src={item.image} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{item.title.toUpperCase()}</h5>
                        <p className="card-text" style={{color:'GrayText',fontStyle:'oblique'}}>{item.detail.substr(0,20)} ...</p>
                        <Link to={`/orders/${item._id}`} className="btn btn-outline-dark position-relative">🦁View item 
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                            {item.free}
                        <span className="visually-hidden">unread messages</span>
                        </span>
                        </Link>
                    </div>
                </div>
                )):"No Items"}
            </div>
        </>
    );
}

export default Dashboard;