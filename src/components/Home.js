import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from './Footer';
const Home=()=>{
    const[items,setItems]= useState('');
    const getAllItems=async()=>{
        try {
            preloader();
            const url='https://tinypesa-biz-api.onrender.com/api/'
            const response=await fetch(url,{
                method:"GET"
            })
            const parseRes=await response.json();
            setItems(parseRes);
            preloaderoff();
        } catch (error) {
            preloaderoff();
            console.log(error.message)
        }
    }
    useEffect(()=>{
        getAllItems()
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
            <div className="landing">
                {items?items.map(item=>(
                    <div key={item._id} className="land card" style={{width: '18rem'}}>
                    <img src={item.image} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{item.title.toUpperCase()}</h5>
                        <p className="card-text" style={{color:'GrayText',fontStyle:'oblique'}}>{item.detail.substr(0,20)} ...</p>
                        <Link to={`/items/${item._id}`} className="btn btn-outline-dark position-relative">🦁View item 
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info">
                            {item.free}
                        <span className="visually-hidden">unread messages</span>
                        </span>
                        </Link>
                    </div>
                </div>
                )):'😥 No Items Left'}
            </div>
            <Footer/>
        </>
    )
}

export default Home;