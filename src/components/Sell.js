import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import {projectStorage,ref,getDownloadURL,uploadBytesResumable} from '../firebase/FireConfig';
import img from "../images/addicon.png"
function Sell(){
    const [itemName,setItemName]=useState('');
    const [detail,setDetail]=useState('');
    const [price,setPrice]=useState('');
    const [phone,setPhone]=useState('');
    const [tag,setTag]=useState('');   
    const [error,setError]=useState(null);
    const [file,setFile]=useState(null);
    const [invalidError,setInvalidError]=useState('');
    const navigate=useNavigate();
    
    //upload item images
    const types=['image/png', 'image/jpeg'];
      const changeHandler=(e)=>{
        let selected=e.target.files[0]
        if(selected&&types.includes(selected.type)){
            setFile(selected)
            setError('')
            //uploading image to storage
            const storageRef=ref(projectStorage,selected.name);
            const uploadTask = uploadBytesResumable(storageRef, selected);
            uploadTask.on('state_changed',
             async()=>{
                try {
                     await getDownloadURL(storageRef).then((url)=>{
                      console.log(url);
                      localStorage.setItem('pic',url);
                     })
                     
                } catch (error) {
                    console.log(error)
                }
                     })
                     
        }else{
            setFile(null);
            setError('Please select an image file(png or jpeg)')
        }
      }
        
    const addItem=async(e)=>{
        e.preventDefault();
        const validNumber=(userNumber)=>{
            return /^[0]\d{2}\d{3}\d{4}/.test(userNumber);
        }
        let phoneNumber=validNumber(phone)
        if(phoneNumber){
            setInvalidError('')
                try {
                    setInvalidError(<i style={{color:'green'}}>Wait for an STK PUSH...</i>)
                const url="https://tinypesa.com/api/v1/express/initialize";
                const response=await fetch(url,{
                    method:'POST',
                    body:JSON.stringify({
                        amount:price*0.1,
                        msisdn:phone
                    }),
                    headers: {
                        Apikey: "9qG6Ltgzgbn",//apikey get it from your admin account
                        "Content-Type": "application/json",
                        },
                })
                const parseRes=await response.json();
                setInvalidError(<p style={{color:'green'}}><i>STK Push Sent...</i></p>);
                console.log(parseRes)
                //post to db
                preloader();
            const url1='https://tinypesa-biz-api.onrender.com/api/';
            const response1=await fetch(url1,{
                method:"POST",
                body:JSON.stringify({
                    userId:localStorage.getItem('userId'),
                    image:localStorage.getItem('pic'),
                    phone:phone,
                    location:localStorage.getItem('location'),
                    title:itemName,
                    detail:detail,
                    amount:price,
                    free:tag
                }),
                headers:{
                    'content-type':'application/json'
                }
            });
            const parseRes1=await response1.json();
            console.log(parseRes1);
            navigate('/');
            toast.success('Item Added Successfully')
            preloaderoff();
        } catch (error) {
            setInvalidError(<i style={{color:'orangered'}}>Payment failed...</i>)
            console.log(error);
            preloaderoff();
            toast.error('Failed..Try again!!')
        }
            } else if(!phoneNumber){
                setInvalidError(<div id="errorNumber" style={{color:'orange'}}>☠ Please, enter phone number in this format: 07xxxxxxxx</div>)
            }
    };
    
    const back=()=>{
         const sect1=document.querySelector('.sect1');
        const sect2=document.querySelector('.sect2');
       sect1.classList.remove('close');
        sect2.classList.remove('open');
    };
    const Next=()=>{
        if(!file||!itemName||!detail||!price){
            alert('Please, Enter required fields☠☠');
        }else if(price<=0){
            alert('Please Enter a considerable price☠☠');
        }else if(price>20000){
            alert("You can't submit price above ksh 20,000☠☠");
        }else{
            const sect1=document.querySelector('.sect1');
            const sect2=document.querySelector('.sect2');
            sect1.classList.add('close');
            sect2.classList.add('open');
        }
    };
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
           <div className='form card'>
           <form onSubmit={addItem}>
            <div className="card-body sect1">
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Item Name</label>
                        <input type="text" className="form-control" name="name" id="exampleFormControlInput1" onChange={(e)=>{setItemName(e.target.value)}} placeholder="Enter your Item's name" required/>
                    </div>
                    <div className="mb-3">
                        <label>
                        Add Item image:
                            <input type="file" className="form-control uploadPlace" id="exampleFormControlInput1" onChange={changeHandler} />
                            <span>  
                                <img src={img} className="avatar circle img" alt='Pic'/>
                            <br/>
                            </span>
                        </label>
                        <div className="img-response">
                            {error&&<div className='error' style={{color:'orangered'}}>{error}</div>}
                            {file&&<div style={{color:'green'}}>{file.name}</div>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Briefly explain about the Item</label>
                        <textarea className="form-control"  id="exampleFormControlTextarea1" rows="4" onChange={(e)=>{setDetail(e.target.value)}}  placeholder="Explain about the Item" required></textarea>
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Enter Item Price <i>(*Offer a considerable price for the item to sell faster)</i></label>
                        <input type="number" className="form-control" name="name" id="exampleFormControlInput1" onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter price"/>
                    </div>
                    <div className="submitError">
                        <Link to='/'><button type='button' className="btn btn-info">&larr;</button></Link>
                        <button type='button' className="btn btn-info" onClick={Next}>&rarr;</button>
                    </div>
                </div>
            <div className="card-body sect2">
                <div className="mb-3">
                    {invalidError}
                    <label for="exampleFormControlInput1" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" name="number" id="exampleFormControlInput1" onChange={(e)=>{setPhone(e.target.value)}} placeholder="Enter phone number that will pay for this service..(prefer safaricom number)" required/>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="defaultCheck1" onChange={()=>{setTag('new')}}/>
                    <label className="form-check-label" for="defaultCheck1">
                        Add a Tag
                    </label>
                </div><br/>
                    <div className="submitError">
                        <button type='button' className="btn btn-info" onClick={back}>&larr;</button>
                        <button className="btn btn-light">submit ✔</button>
                    </div>
            </div>
           </form>
           </div>
        </>
    );
}

export default Sell;