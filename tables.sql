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
 INSERT INTO towns (startsWith, town_name) VALUES ('CA, CY, CJ', 'Select All');
INSERT INTO towns (startsWith, town_name) VALUES ('CA', 'Cape Town');
INSERT INTO towns (startsWith, town_name) VALUES ('CY', 'Bellville');
INSERT INTO towns (startsWith, town_name) VALUES ('CJ', 'Paarl');
