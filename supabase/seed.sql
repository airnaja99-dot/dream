
-- Seed dropdown values
insert into locations(name) values
('บ้านเก่า'),('โรงเรียนเก่า'),('ที่ทำงาน'),('ห้าง/โรงแรม'),('ชายหาด'),('สนามบิน'),('คอนโดปัจจุบัน'),('อื่นๆ')
on conflict do nothing;

insert into triggers(name) values
('บ้านเก่า'),('โรงเรียน'),('กระจก'),('skin touch'),('เสียงประกาศ'),
('นาฬิกาเพี้ยน'),('ไฟ/ลิฟต์เสีย'),('ถูกไล่'),('บิน'),('พายุ/น้ำ'),('อื่นๆ')
on conflict do nothing;

insert into intent_modes(name) values ('Fun'),('Respect')
on conflict do nothing;

insert into control_types(name) values ('Passive'),('Active'),('Full')
on conflict do nothing;

insert into portals(name) values ('None'),('Mirror'),('Free-form')
on conflict do nothing;

insert into feelings(name) values
('อบอุ่น'),('ตื่นเต้น'),('หลอน'),('สงบ'),('เศร้า'),('โกรธ'),('คิดถึง'),('สับสน'),('กลัว'),('เฉยๆ')
on conflict do nothing;

insert into emotions_after(name) values
('พลังมา'),('นิ่งดี'),('ค้างคา'),('เพลีย'),('แบนราบ'),('สดใส'),('ปนคิดถึง')
on conflict do nothing;

insert into tags(name) values
('Shadow'),('False Awakening'),('Multiverse'),('Portal'),('บิน'),('โรงเรียน'),('กระจก'),('Skin Touch'),('ฝันร้าย'),('ฝันดี')
on conflict do nothing;
