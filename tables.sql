--database name reg_number 
create table towns(
	id serial not null primary key,
	registration text not null,
    town_name text not null 
);

create table regNumbers(
	id serial not null primary key,
	reg text not null,
	startsWith int not null,
    foreign key (startsWith) references regNumbers(id)
);

INSERT INTO towns (registration, town_name) VALUES ('CA', 'Cape Town');
INSERT INTO towns (registration, town_name) VALUES ('CY', 'Bellville');
INSERT INTO towns (registration, town_name) VALUES ('CJ', 'Paarl');

-- -- INSERT INTO regNumbers (reg, startsWith) VALUES ('CA', 1);

-- create table towns(
-- 	id serial not null primary key,
-- 	startsWith int not null,
--     town_name text not null 
-- );
-- create table regNumbers(
-- 	id serial not null primary key,
-- 	reg text not null,
-- 	key_name text not null,
--     foreign key (key_name) references regNumbers(id)
-- );

-- INSERT INTO towns (startsWith, town_name) VALUES ('CA', 'Cape Town');
-- INSERT INTO towns (startsWith, town_name) VALUES ('CY', 'Bellville');
-- INSERT INTO towns (startsWith, town_name) VALUES ('CJ', 'Paarl');


