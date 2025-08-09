'use client';import {useEffect,useState} from 'react';type Option={id:number;name:string};
export default function NewDream(){const [form,setForm]=useState<any>({});const [msg,setMsg]=useState('');const [lookups,setLookups]=useState<any>({});
useEffect(()=>{(async()=>{const tables=['locations','triggers','intent_modes','control_types','portals','feelings','emotions_after','tags'];const out:any={};
for(const t of tables){const r=await fetch('/api/lookups?table='+t);out[t]= (await r.json()).data||[];}setLookups(out);})();},[]);
function update(k:string,v:any){setForm((s:any)=>({...s,[k]:v}));}
async function submit(e:any){e.preventDefault();const payload={dream_date:form.dream_date,wake_time:form.wake_time||null,summary:form.summary||null,narrative:form.narrative||null,location_id:form.location_id?+form.location_id:null,
vivid_score:form.vivid_score?+form.vivid_score:null,scene_stability:form.scene_stability?+form.scene_stability:null,energy_after:form.energy_after?+form.energy_after:null,lucid_mode:form.lucid_mode?+form.lucid_mode:0,
control_type_id:form.control_type_id?+form.control_type_id:null,intent_mode_id:form.intent_mode_id?+form.intent_mode_id:null,portal_id:form.portal_id?+form.portal_id:null,stabilise_method:form.stabilise_method||null,shadow_signal:form.shadow_signal||null,
outcome_insight:form.outcome_insight||null,micro_action:form.micro_action||null,emotion_during_id:form.emotion_during_id?+form.emotion_during_id:null,emotion_after_id:form.emotion_after_id?+form.emotion_after_id:null};
const r=await fetch('/api/dreams',{method:'POST',body:JSON.stringify(payload)});const j=await r.json();setMsg(r.ok?'Saved':j.error||'Error');if(r.ok) window.location.href='/dreams';}
const L=(t:string)=>(lookups[t]||[]) as Option[];
return(<main><h2>New Dream Log</h2><form onSubmit={submit} style={{display:'grid',gap:8,maxWidth:720}}>
<label>วันที่ <input type="date" onChange={e=>update('dream_date',e.target.value)} required/></label>
<label>เวลาตื่น <input type="time" onChange={e=>update('wake_time',e.target.value)}/></label>
<label>สรุปสั้น <input onChange={e=>update('summary',e.target.value)}/></label>
<label>เล่าเหตุการณ์ <textarea rows={4} onChange={e=>update('narrative',e.target.value)}/></label>
<label>สถานที่ <select onChange={e=>update('location_id',e.target.value)}><option value="">—</option>{L('locations').map(o=><option key={o.id} value={o.id}>{o.name}</option>)}</select></label>
<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
<label>Lucid <select onChange={e=>update('lucid_mode',e.target.value)}><option value="0">0</option><option value="1">1</option><option value="2">2</option></select></label>
<label>Control <select onChange={e=>update('control_type_id',e.target.value)}><option value="">—</option>{L('control_types').map(o=><option key={o.id} value={o.id}>{o.name}</option>)}</select></label>
<label>Intent <select onChange={e=>update('intent_mode_id',e.target.value)}><option value="">—</option>{L('intent_modes').map(o=><option key={o.id} value={o.id}>{o.name}</option>)}</select></label>
<label>Portal <select onChange={e=>update('portal_id',e.target.value)}><option value="">—</option>{L('portals').map(o=><option key={o.id} value={o.id}>{o.name}</option>)}</select></label>
<label>Vivid <input type="number" min="1" max="5" onChange={e=>update('vivid_score',e.target.value)}/></label>
<label>Stability <input type="number" min="1" max="5" onChange={e=>update('scene_stability',e.target.value)}/></label>
<label>Energy <input type="number" min="-2" max="2" onChange={e=>update('energy_after',e.target.value)}/></label>
</div>
<label>อารมณ์ระหว่างฝัน <select onChange={e=>update('emotion_during_id',e.target.value)}><option value="">—</option>{L('feelings').map(o=><option key={o.id} value={o.id}>{o.name}</option>)}</select></label>
<label>อารมณ์หลังตื่น <select onChange={e=>update('emotion_after_id',e.target.value)}><option value="">—</option>{L('emotions_after').map(o=><option key={o.id} value={o.id}>{o.name}</option>)}</select></label>
<label>Shadow Signal <input onChange={e=>update('shadow_signal',e.target.value)}/></label>
<label>Outcome/Insight <textarea rows={3} onChange={e=>update('outcome_insight',e.target.value)}/></label>
<label>Micro-Action <input onChange={e=>update('micro_action',e.target.value)}/></label>
<label>Stabilise วิธี <input onChange={e=>update('stabilise_method',e.target.value)}/></label>
<button>Save</button><div>{msg}</div></form></main>);}
