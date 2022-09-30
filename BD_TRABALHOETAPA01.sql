-- Criação da base por comando SQL
create database "TRABALHOETAPA01";

-- criação da tabela prédios
create table predios (
	codigo serial primary key, 
	nome varchar(40) not null, 
	descricao varchar(40) not null, 
	sigla varchar(4) not null 	
);

-- criação da tabela donos
-- 54999439158
create table donos (
	codigo serial primary key, 
	nome varchar(40) not null, 
	endereco varchar(30) not null, 
	telefone char(11) not null	 	
);

-- inserindo registros na tabela prédios
insert into donos (nome, endereco, telefone) 
values ('Joao Silva', 'Rua Brasil', '54999124578')
returning codigo, nome, endereco, telefone;

-- atualizando registros na tabela prédios
UPDATE predios SET  nome='Prédio 5', descricao='Prédio da computação', sigla='P5'
	WHERE codigo=1
returning codigo, nome, descricao, sigla;
	
-- removendo registros da tabela prédios
DELETE from predios where codigo = 9;

-- selecionando registros na tabela prédios
select codigo, nome, descricao, sigla from predios order by nome;

select codigo, nome, descricao, sigla 
from predios 
where codigo = 1 order by nome;

select codigo, nome, descricao, sigla 
from predios 
where nome like 'P%' order by nome;

-- criação da tabela salas
-- create table salas (
-- 	codigo serial primary key, 
-- 	numero integer not null, 
-- 	descricao varchar(40) not null, 
-- 	capacidade integer not null, 
-- 	predio integer not null, 
-- 	foreign key (predio) references predios (codigo)
-- );

-- criação da tabela pets
create table pets (
	codigo serial primary key, 
	nome varchar(40) not null, 
	raca varchar(40) not null, 
	porte varchar(40) not null, 
	dono integer not null, 
	foreign key (dono) references donos (codigo)
);

-- -- inserindo alguns registros na tabela salas
-- insert into salas (numero, descricao, capacidade, predio) 
-- values (511, 'Laboratório', 12, 1)
-- returning codigo, numero, descricao, capacidade, predio;

-- inserindo alguns registros na tabela salas
insert into pets (nome, raca, porte, dono) 
values ("Tobias", 'Caramelo', "Pequeno", 1)
returning codigo, nome, raca, porte, dono;

-- atualizando um registro na tabela salas 
UPDATE salas
	SET numero=301, descricao='Sala de aula da mecânica', capacidade=32, predio=2
	WHERE codigo=2
returning codigo, numero, descricao, capacidade, predio;
	
-- apagando registros 
delete from salas where codigo = 4;
	
-- selecionando registros na tabelas salas relacionando com o prédio
select s.codigo as codigo, s.numero as numero, s.descricao as descricao, s.capacidade as capacidade, 
s.predio as predio, p.nome as nomepredio
from salas s
join predios p on s.predio = p.codigo
order by s.numero;

select s.codigo as codigo, s.numero as numero, s.descricao as descricao, s.capacidade as capacidade, 
s.predio as predio, p.nome as nomepredio
from salas s
join predios p on s.predio = p.codigo
where s.codigo = 1;

select s.codigo as codigo, s.numero as numero, s.descricao as descricao, s.capacidade as capacidade, 
s.predio as predio, p.nome as nomepredio
from salas s
join predios p on s.predio = p.codigo
where s.numero = 511;

select s.codigo as codigo, s.numero as numero, s.descricao as descricao, s.capacidade as capacidade, 
s.predio as predio, p.nome as nomepredio
from salas s
join predios p on s.predio = p.codigo
where s.predio = 1;
