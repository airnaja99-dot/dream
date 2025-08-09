import { NextResponse } from 'next/server';import { supabase } from '@/lib/supabase';import jwt from 'jsonwebtoken';
function getUID(req: Request){const cookie=req.headers.get('cookie')||'';const m=cookie.match(/session=([^;]+)/);if(!m)return null;try{return (jwt.verify(decodeURIComponent(m[1]),process.env.JWT_SECRET!) as any).uid;}catch{return null;}}
export async function GET(req: Request){const uid=getUID(req);if(!uid)return NextResponse.json({error:'unauthorized'},{status:401});
const {data,error}=await supabase.from('dream_logs').select('*, dream_log_characters(*), dream_log_triggers(*), dream_log_tags(*)').eq('user_id',uid).order('dream_date',{ascending:false});
if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({data});}
export async function POST(req: Request){const uid=getUID(req);if(!uid)return NextResponse.json({error:'unauthorized'},{status:401});const payload=await req.json();
const {data,error}=await supabase.from('dream_logs').insert({...payload,user_id:uid}).select('*').single();if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({data});}
