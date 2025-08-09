import jwt from 'jsonwebtoken';import { cookies } from 'next/headers';
export function setSession(uid: string){const token = jwt.sign({uid}, process.env.JWT_SECRET!, {expiresIn:'7d'});cookies().set('session', token, {httpOnly:true, path:'/', maxAge:60*60*24*7});}
export function getUID(): string | null {const c=cookies().get('session')?.value; if(!c) return null; try{return (jwt.verify(c, process.env.JWT_SECRET!) as any).uid;}catch{return null;}}
export function clearSession(){cookies().set('session','',{httpOnly:true,path:'/',maxAge:0});}
