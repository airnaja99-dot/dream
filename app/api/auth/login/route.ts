import { NextResponse } from 'next/server';import { supabase } from '@/lib/supabase';import bcrypt from 'bcryptjs';import jwt from 'jsonwebtoken';
export async function POST(req: Request){const {email,password}=await req.json();const {data:user,error}=await supabase.from('users').select('*').eq('email',email).single();
if(error||!user)return NextResponse.json({error:'not found'},{status:404});const ok=await bcrypt.compare(password,user.password_hash);if(!ok)return NextResponse.json({error:'invalid'},{status:401});
const token=jwt.sign({uid:user.id},process.env.JWT_SECRET!,{expiresIn:'7d'});const res=NextResponse.json({ok:true});res.cookies.set('session',token,{httpOnly:true,path:'/',maxAge:60*60*24*7});return res;}
