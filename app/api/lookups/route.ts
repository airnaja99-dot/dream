import { NextResponse } from 'next/server';import { supabase } from '@/lib/supabase';
export async function GET(req: Request){const {searchParams}=new URL(req.url);const table=searchParams.get('table')||'locations';
const {data,error}=await supabase.from(table).select('*').order('id',{ascending:true});if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({data});}
