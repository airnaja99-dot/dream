'use client';import {useState} from 'react';
export default function Signup(){const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [display_name,setDisplayName]=useState('');const [msg,setMsg]=useState('');
async function onSubmit(e:any){e.preventDefault();const r=await fetch('/api/auth/signup',{method:'POST',body:JSON.stringify({email,password,display_name})});const j=await r.json();setMsg(r.ok?'Signup OK':j.error||'Signup failed');if(r.ok) window.location.href='/login';}
return(<main><h2>Signup</h2><form onSubmit={onSubmit} style={{display:'grid',gap:8,maxWidth:360}}><input placeholder="Display name" value={display_name} onChange={e=>setDisplayName(e.target.value)}/>
<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
<button>Create account</button><div>{msg}</div></form></main>);}
