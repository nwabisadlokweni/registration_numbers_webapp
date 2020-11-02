-- --database name reg_number 
-- create table towns(
-- 	id serial not null primary key,
-- 	registration text not null,
--     town_name text not null 
-- );

-- create table regNumbers(
-- 	id serial not null primary key,
-- 	reg text not null,
-- 	startsWith int not null,
--     foreign key (startsWith) references regNumbers(id)
-- );

-- INSERT INTO towns (registration, town_name) VALUES ('CA', 'Cape Town');
-- INSERT INTO towns (registration, town_name) VALUES ('CY', 'Bellville');
-- INSERT INTO towns (registration, town_name) VALUES ('CJ', 'Paarl');



create table towns(
	id serial not null primary key,
	town_name text not null,
	startsWith text not null
);

create table regNumbers(
	id serial not null primary key,
	reg text not null,
	key_name int not null,
	foreign key (key_name) references towns(id)
);
-- INSERT INTO towns (startsWith, town_name) VALUES ('CA, CY, CJ', 'Select All');
INSERT INTO towns (startsWith, town_name) VALUES ('CA', 'Cape Town');
INSERT INTO towns (startsWith, town_name) VALUES ('CY', 'Bellville');
INSERT INTO towns (startsWith, town_name) VALUES ('CJ', 'Paarl');




-- INSERT INTO regNumbers (reg, startsWith) VALUES ('CA', 1);

