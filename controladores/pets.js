const { pool } = require('../config');

const getPets = (request, response) => {
    pool.query(`select p.codigo as codigo, p.nome as nome, 
    p.raca as raca, 
    p.porte as porte,
    p.dono as nomedono
    from pets p
    join donos d on p.dono = d.codigo
    order by p.codigo`,
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao consultar a tabela pets: ' + error
                    }
                )
            }
            response.status(200).json(results.rows);
        }
    )
}

const addPet = (request, response) => {
    const { nome, raca, porte, dono } = request.body;
    pool.query(`insert into pets (nome, raca, porte, dono) 
    values ($1, $2, $3, $4)
    returning codigo, nome, raca, porte, dono`,
        [nome, raca, porte, dono],
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao inserir a dono: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'Pet adicionado',
                    objeto: results.rows[0]
                }
            );
        }
    )
}

const updatePet = (request, response) => {
    const { codigo, nome, raca, porte, dono } = request.body;
    pool.query(`UPDATE pets
	SET nome=$1, raca=$2, porte=$3, dono=$4
	WHERE codigo=$5
    returning codigo, nome, raca, porte, dono`,
        [nome, raca, porte, dono, codigo],
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao atualizar dados do pet: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'Pet atualizado',
                    objeto: results.rows[0]
                }
            );
        }
    )
}

const deletePet = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM pets where codigo = $1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao remover pet: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'Pet removido'
                }
            );
        }
    )
}

// Porte? Raca? nome, raca, porte, dono
const getPetPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`select s.codigo as codigo, s.nome as nome, 
    s.raca as raca, 
    s.porte as porte, 
    s.dono as dono, p.nome as nomedono
    from pets s
    join donos p on s.dono = p.codigo
    where s.codigo = $1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao recuperar a pet: ' + error
                    }
                )
            }
            response.status(200).json(results.rows[0]);
        }
    )
}

module.exports = {
    getPets, addPet, updatePet, deletePet, getPetPorCodigo
}
