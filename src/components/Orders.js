import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams,Link } from 'react-router-dom';

function Orders(){
    const navigate=useNavigate();
    const [item,setItem]=useState('')
    const {id}=useParams();
    const getOneItem=async()=>{
        try {
            preloader();
            const url=`https://tinypesa-biz-api.onrender.com/api/${id}`;
            const response=await fetch(url,{
                method:"GET"
            })
            const parseRes=await response.json();
            setItem(parseRes);
            preloaderoff();
        } catch (error) {
            preloaderoff();
            console.log(error.message)
        }
    }
    useEffect(()=>{
       getOneItem();
    },[])
    const $delete=async()=>{
        try {
            preloader();
            const url=`https://tinypesa-biz-api.onrender.com/api/${id}`;
            const response=await fetch(url,{
                method:"DELETE"
            })
            const parseRes=await response.json();
            toast.success('Item Deleted');
            preloaderoff();
            navigate('/dashboard');
        } catch (error) {
            preloaderoff();
            toast.error('Failed!!');
            console.log(error)
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
         <div className="viewItem">
                <div className="land card" key={item._id} >
                    <img className='card-img-top' src={item.image} alt="..."/>
                <div className='card-body'>
                <div className="card-text">
                    <h4 style={{fontStyle:'oblique'}}>{item.title}</h4>
                    <p style={{fontStyle:'oblique'}}>{item.detail}</p> 
                    <small>Selling @: Ksh{item.amount}</small><br/>
                    <small>Located in: {item.location}</small><br/>
                    <small>Call the Seller: 0{item.phone}</small>
                </div>
                <a onClick={$delete} target='_blank'  rel="noreferrer" className="btn btn-success" style={{marginTop:'10px',fontSize:'80%'}}>Delete Item</a>
                <Link to='/dashboard'><button type='button' className="btn btn-info"style={{float:'right', marginTop:'10px',fontSize:'80%'}}>Back</button></Link>
                </div>
                </div>
        </div>
       </>
    );
}

export default Orders;