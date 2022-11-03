create table donos (
	codigo serial primary key, 
	nome varchar(40) not null, 
	endereco varchar(30) not null, 
	telefone char(11) not null	 	
);

create table pets (
	codigo serial primary key, 
	nome varchar(40) not null, 
	raca varchar(40) not null, 
	porte varchar(40) not null, 
	dono integer not null, 
	foreign key (dono) references donos (codigo)
);


insert into donos (nome, endereco, telefone) 
values ('Joao Silva', 'Rua Brasil', '54999124578')
returning codigo, nome, endereco, telefone;



insert into pets (nome, raca, porte, dono) 
values ('Tobias', 'Caramelo', 'Pequeno', 1)
returning codigo, nome, raca, porte, dono;