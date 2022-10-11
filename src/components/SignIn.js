import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {Link, useNavigate} from 'react-router-dom';

function SignIn(){
    const navigate=useNavigate();
    const form=document.querySelector('form');
    const [phone,setPhone]=useState('');
    const [firstName,setFirstName]=useState('');
    const [email,setEmail]=useState('');
    const [lastName,setLastName]=useState('');
    const [password,setPassword]=useState('');
    const [location,setLocation]=useState('');
    const [invalidError,setInvalidError]=useState('');
    const [backToStore,setBackToStore]=useState(<button type='button' className="btn btn-info" style={{fontSize:'70%'}} onClick={toSignUp}>I'm new here👇</button>)

    const SignIn=async(e)=>{
        e.preventDefault();
        const validNumber=(userNumber)=>{
            return /^[0]\d{2}\d{3}\d{4}/.test(userNumber);
        }
        let phoneNumber=validNumber(phone)
        if(phoneNumber){
        setInvalidError('')
       try {
        preloader();
            const url='https://tinypesa-biz-api.onrender.com/api/login';
             const response=await fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    number:phone,
                    password:password
                }),
                headers:{
                    'content-type':'application/json'
                }
             })  
             const parseRes=await response.json();
             if(parseRes.token){
                 localStorage.setItem('userId',parseRes._id);
                 localStorage.setItem('name',parseRes.name);
                 localStorage.setItem('number',parseRes.number);
                 localStorage.setItem('location',parseRes.location);
                 localStorage.setItem('token',parseRes.token);
                 navigate('/');
                 toast.success('Login successful')
                preloaderoff();
              }else{
                toast.error('failed..try again!!');
                preloaderoff();
              }
       } catch (error) {
        console.log(error);
        form.reset();
        toast.error('failed..try again!!');
        preloaderoff();
       }
    }else if(!phoneNumber){
        setInvalidError(<div id="errorNumber" style={{color:'orange'}}>☠ Please, enter phone number in this format: 07xxxxxxxx</div>)
    }
}
    const SignUp=async(e)=>{
        e.preventDefault();
        const validNumber=(userNumber)=>{
            return /^[0]\d{2}\d{3}\d{4}/.test(userNumber);
        }
        let phoneNumber=validNumber(phone)
        if(phoneNumber){
        setInvalidError('')
        try {
            preloader();
            const url='https://tinypesa-biz-api.onrender.com/api/register';
            const response=await fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    number:phone,
                    password:password,
                    location:location
                }),
                headers:{
                    'content-type':'application/json'
                }
            })
            const parseRes=await response.json();
             if(parseRes.token){
                 localStorage.setItem('userId',parseRes._id);
                 localStorage.setItem('name',parseRes.name);
                 localStorage.setItem('number',parseRes.number);
                 localStorage.setItem('location',parseRes.location);
                 localStorage.setItem('token',parseRes.token);
                 navigate('/');
                 toast.success('signup successsful')
                preloaderoff();
              }else{
                toast.error('failed..try again!!');
                preloaderoff();
              }
        } catch (error) {
            console.log(error);
            form.reset();
            toast.error('failed..try again!!');
            preloaderoff();
        }
    }else if(!phoneNumber){
        setInvalidError(<div id="errorNumber" style={{color:'orange'}}>☠ Please, enter phone number in this format: 07xxxxxxxx</div>)
    }

    };
    function toSignUp(){
        const form1=document.querySelector('.form1');
        const form2=document.querySelector('.form2');
        form1.classList.add('close');
        form2.classList.add('open');
    };
    const toSignIn=()=>{
        const form1=document.querySelector('.form1');
        const form2=document.querySelector('.form2');
        form1.classList.remove('close');
        form2.classList.remove('open');
        setBackToStore(<Link to='/'><button type='button' style={{fontSize:'80%'}} className="btn btn-info">🛒 Store</button></Link>);
    };
    const Next=()=>{
        if(firstName&&lastName){
            const sect1=document.querySelector('.sect1');
            const sect2=document.querySelector('.sect2');
            sect1.classList.add('close');
            sect2.classList.add('open');
        }else{
            alert('Please, Enter required fields☠☠');
        }
    };
    const back=()=>{
        const sect1=document.querySelector('.sect1');
        const sect2=document.querySelector('.sect2');
       sect1.classList.remove('close');
        sect2.classList.remove('open');
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
        <div className='SignIn'>
           <div className='form1 card'>
            <i style={{color:'green',marginLeft:'20px'}}><strong>Sign In*</strong></i>
           <form onSubmit={SignIn}>
           <div className="card-body">
                <div className="mb-3">
                    {invalidError}
                    <label for="exampleFormControlInput1" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" name="number" id="exampleFormControlInput1" onChange={(e)=>{setPhone(e.target.value)}} placeholder="Enter phone number" required/>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="number" id="exampleFormControlInput1" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" required/>
                </div>
                    <div className="submitError">
                    {backToStore}
                    <button className="btn btn-light" style={{fontSize:'80%'}}>submit ✔</button>
                    </div>
            </div>
           </form>
           </div>

           <div className='form2 card'>
           <i style={{color:'green',marginLeft:'20px'}}><strong>Sign Up*</strong></i>
           <form onSubmit={SignUp} >
            <div className="card-body sect1" style={{}}>
                <i style={{color:'green'}}>Step 1*</i>
                <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">First Name</label>
                        <input type="text" className="form-control" name="name" id="exampleFormControlInput1" onChange={(e)=>{setFirstName(e.target.value)}} placeholder="Enter First Name" required/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Last Name</label>
                        <input type="text" className="form-control" name="name" id="exampleFormControlInput1" onChange={(e)=>{setLastName(e.target.value)}} placeholder="Enter Last Name" required/>
                    </div>
                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Email</label>
                        <input type="email" className="form-control" name="name" id="exampleFormControlInput1" onChange={(e)=>{setEmail(e.target.value)}} placeholder="*Optional"/>
                    </div>
                    <div className="submitError">
                        <button type='button' className="btn btn-info" onClick={toSignIn}>&larr;</button>
                        <button type='button' className="btn btn-info" onClick={Next}>&rarr;</button>
                    </div>
                </div>
            <div className="card-body sect2">
            <i style={{color:'green'}}>Step 2*</i>
                <div className="mb-3">
                    {invalidError}
                    <label for="exampleFormControlInput1" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" name="number" id="exampleFormControlInput1" onChange={(e)=>{setPhone(e.target.value)}} placeholder="Enter your active phone number ..(prefer safaricom number)" required/>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="number" id="exampleFormControlInput1" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" required/>
                </div>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Location</label>
                    <input type="text" className="form-control" name="location" id="exampleFormControlInput1" onChange={(e)=>{setLocation(e.target.value)}} placeholder="Must be around rongo university" required/>
                </div>
                    <div className="submitError">
                        <button type='button' className="btn btn-info" onClick={back}>&larr;</button>
                        <button className="btn btn-light" style={{fontSize:'90%'}}>submit ✔</button>
                    </div>
            </div>
           </form>
           </div>
        </div>
        </>
    );
}

export default SignIn;