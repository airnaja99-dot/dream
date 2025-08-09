'use client';import {useState} from 'react';
export default function Login(){const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [msg,setMsg]=useState('');
async function onSubmit(e:any){e.preventDefault();const r=await fetch('/api/auth/login',{method:'POST',body:JSON.stringify({email,password})});const j=await r.json();setMsg(r.ok?'Login OK':j.error||'Login failed');if(r.ok) window.location.href='/dreams';}
return(<main><h2>Login</h2><form onSubmit={onSubmit} style={{display:'grid',gap:8,maxWidth:360}}><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
<input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><button>Login</button><div>{msg}</div></form></main>);}
