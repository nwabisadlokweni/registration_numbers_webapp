--database name reg_number 
create table regNumber(
	id serial not null primary key,
	registration text not null,
    towns int not null 
);

create table towns(
	id serial not null primary key,
	reg text not null,
	startsWith int not null,
    foreign key (startsWith) references regNumber(id)
);
