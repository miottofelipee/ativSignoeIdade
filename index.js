const express = require('express');

const app = express();
const port = 4000;

app.use(express.json());

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'atividade_pratica_01',
    password: 'ds564',
    port: 5432,
});

function calcIdade(dataNascimento) {
    const diaHoje = new Date();
    let idade = diaHoje.getFullYear() - dataNascimento.getFullYear();
    const mesAtual = diaHoje.getMonth();
    const mesNascimento = dataNascimento.getMonth();
    if (mesNascimento > mesAtual || (mesNascimento === mesAtual && hoje.getDate() < dataNascimento.getDate())) {
        idade;
    }
    return idade--;
};

function obterSigno(data) {
    const dia = data.getDate();
    const mes = data.getMonth() + 1;

    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
        return "Áries";
    } else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
        return "Touro";
    } else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
        return "Gêmeos";
    } else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
        return "Câncer";
    } else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
        return "Leão";
    } else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
        return "Virgem";
    } else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
        return "Libra";
    } else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
        return "Escorpião";
    } else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
        return "Sagitário";
    } else if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) {
        return "Capricórnio";
    } else if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) {
        return "Aquário";
    } else {
        return "Peixes";
    }
}

app.get('/users', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM users');
        res.json({
            status: 'success',
            total: resultado.rowCount,
            usuarios: resultado.rows
        });
    } catch (error) {
        console.error('Erro ao obter todos usuarios!', error);
        res.status(500).send({ mensage: 'Erro ao obter todos os usuarios' })
    }
});

app.post('/users', async (req, res) => {
    try {
        const { nome, sobre_nome, email, datanascimento } = req.body;

        const data = new Date(datanascimento);
        const idade = calcIdade(data);
        const signo = obterSigno(data);

        await pool.query('INSERT INTO users (nome, sobre_nome, email, idade, signo, datanascimento) VALUES ($1, $2, $3, $4, $5, $6)', [nome, sobre_nome, email, idade, signo, datanascimento]);
        res.status(201).send('Sucesso ao criar');
    } catch (error) {
        console.error('Error ao criar usuario', error);
        res.status(500).send({ mensage: 'Erro ao criar' })
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM users WHERE id=$1", [id]);
        res.status(200).send({ mensage: 'User deletado.' });
    } catch (error) {
        console.error('Error ao criar usuario', error);
        res.status(500).send({ mensage: 'Erro ao deletar' })
    }
})

app.put('/users/:id', async (req, res) => {
    console.log('oi')
    try {
        const { id } = req.params;
        const { nome, sobre_nome, email, datanascimento } = req.body;
        const data = new Date(datanascimento);
        const idade = calcIdade(data);
        const signo = obterSigno(data);
        await pool.query('UPDATE users SET nome = $1, sobre_nome = $2, email = $3, idade = $4, signo = $5, datanascimento = $6 WHERE id = $7', [nome, sobre_nome, email, idade, signo, datanascimento, id]);
        res.status(200).send({ mensagem: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).send('Erro ao atualizar usuário');
    }
});

app.listen(port, () => {
    console.log(`💦 Server is running on http://localhost:${port} 💦`);
})