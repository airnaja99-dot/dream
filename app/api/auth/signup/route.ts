import { NextResponse } from 'next/server';import { supabase } from '@/lib/supabase';import bcrypt from 'bcryptjs';
export async function POST(req: Request){const {email,password,display_name}=await req.json();if(!email||!password)return NextResponse.json({error:'missing'},{status:400});
const password_hash=await bcrypt.hash(password,10);const {data,error}=await supabase.from('users').insert({email,password_hash,display_name}).select('*').single();
if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({ok:true});}
