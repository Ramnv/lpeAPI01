const {pool} = require('../config');

const getDonos = (request, response) => {
    // para testar um tempo de para recuperar os registros
    // setTimeout(() => { console.log("Esperando para dar o retorno!");
    pool.query('SELECT * FROM donos ORDER BY codigo',
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao consultar a tabela donos: ' + error
                    }
                )
            }
            response.status(200).json(results.rows);
        }
    )
    //}, 3000);

}

const addDono = (request, response) => {
    const { nome, endereco, telefone } = request.body;
    pool.query(`INSERT INTO DONOS (nome, endereco, telefone) 
    VALUES ($1, $2 , $3)
    RETURNING codigo, nome, endereco, telefone`,
        [nome, endereco, telefone],
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao inserir o dono: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'Dono criado',
                    objeto: results.rows[0]
                }
            );
        }
    )
}

const updateDono = (request, response) => {
    const { codigo, nome, endereco, telefone } = request.body;
    pool.query(`UPDATE DONOS SET nome=$1, 
    endereco=$2, telefone=$3
    WHERE codigo = $4
    RETURNING codigo, nome, endereco, telefone`,
        [nome, endereco, telefone, codigo],
        (error, results) => {
            if (error) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao atualizar o dono: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'Dono atualizado',
                    objeto: results.rows[0]
                }
            );
        }
    )
}

const deleteDono = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM donos where codigo = $1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao remover o dono: ' + error
                    }
                )
            }
            response.status(200).json(
                {
                    status: 'success', message: 'Dono removido'
                }
            );
        }
    )
}

const getDonoPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM donos where codigo = $1`,
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(400).json(
                    {
                        status: 'error',
                        message: 'Erro ao recuperar o dono: ' + error
                    }
                )
            }
            response.status(200).json(results.rows[0]);
        }
    )
}

module.exports = {
    getDonos, addDono, updateDono, deleteDono, getDonoPorCodigo
}

