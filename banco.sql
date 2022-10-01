
-- criação da tabela prédios
-- create table predios (
-- 	codigo serial primary key, 
-- 	nome varchar(40) not null, 
-- 	descricao varchar(40) not null, 
-- 	sigla varchar(4) not null 	
-- );

create table donos (
	codigo serial primary key, 
	nome varchar(40) not null, 
	endereco varchar(30) not null, 
	telefone char(11) not null	 	
);

-- inserindo registros na tabela prédios
-- insert into predios (nome, descricao, sigla) 
-- values ('Predio 5', 'Predio da Computação', 'P5');

insert into donos (nome, endereco, telefone) 
values ('Joao Silva', 'Rua Brasil', '54999124578')
returning codigo, nome, endereco, telefone;


-- criação da tabela salas
-- create table salas (
-- 	codigo serial primary key, 
-- 	numero integer not null, 
-- 	descricao varchar(40) not null, 
-- 	capacidade integer not null, 
-- 	predio integer not null, 
-- 	foreign key (predio) references predios (codigo)
-- );

create table pets (
	codigo serial primary key, 
	nome varchar(40) not null, 
	raca varchar(40) not null, 
	porte varchar(40) not null, 
	dono integer not null, 
	foreign key (dono) references donos (codigo)
);

-- inserindo alguns registros na tabela salas
-- insert into salas (numero, descricao, capacidade, predio) 
-- values (511, 'Laboratório', 12, 1);

insert into pets (nome, raca, porte, dono) 
values ('Tobias', 'Caramelo', 'Pequeno', 1)
returning codigo, nome, raca, porte, dono;