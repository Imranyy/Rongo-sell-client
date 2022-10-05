import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
const Detail=()=>{
    const [item,setItem]=useState('');
    const navigate=useNavigate();
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
            navigate('/');
            preloaderoff();
            console.log(error.message)
        }
    }
    useEffect(()=>{
       getOneItem();
    },[])
     //preloader
 const preloader=()=>{
    const loader=document.querySelector('.preload');
    loader.style.display='block';
  }
  const preloaderoff=()=>{
    const loader=document.querySelector('.preload');
    loader.style.display='none';
  }
    return(
        <>
        <div className='preload'></div>
            <div className="viewItem">
                <div className="land card" key={item._id} >
                    <img className='card-img-top' src={item.image} alt="..." height='250' width='250'/>
                <div className='card-body'>
                <div className="card-text" style={{fontSize:'90%'}}>
                    <h4 style={{fontStyle:'oblique'}}>{item.title}</h4>
                    <p style={{fontStyle:'oblique'}}>{item.detail}</p> 
                    <small>Selling @: Ksh{item.amount}</small><br/>
                    <small>Located in: {item.location}</small><br/>
                    <small>Call the Seller: 0{item.phone}</small>
                </div>
                <a href={`https://wa.me/+254${item.phone}`} target='_blank'  rel="noreferrer" className="btn btn-success" style={{marginTop:'10px',fontSize:'80%'}}>whatsapp</a>
                <Link to='/'><button type='button' className="btn btn-info"style={{float:'right', marginTop:'10px',fontSize:'80%'}}>Back</button></Link>
                </div>
                </div>
        </div>
        </>
    )
}
export default Detail;