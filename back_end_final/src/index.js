import express, { request, response } from 'express';
const app = express();
app.use(express.json());

app.get('/', (request, response) => {
    return response.json('Servidor iniciado!');

});

//USER

let users = []
let contador = 1
let contadorRecados = 1

app.get('/users', (request, response) => {
    return response.json(users);

});

//CONTA

app.post('/users', (request, response) => {
    let infoRequest = request.body;

    let newUser = {
        id: contador++,
        name: infoRequest.name,
        email: infoRequest.email,
        password: infoRequest.password,
        recados: []
    }

    users.push(newUser)

    return response.status(201).json(newUser);

});

//CRIAR

app.post('/users/recados/:id', (request, response) => {
    let infoRequest = request.body;
    const parametroId = request.params.id

    let novoRecado = {
        id: contadorRecados++,
        titulo: infoRequest.titulo,
        descricao: infoRequest.descricao
    }

    const buscarIndice = users.findIndex((usuario) => usuario.id == parametroId)


    if (buscarIndice == -1) {
        return response.json("Usuário não encontrado")
    }


    const usuario = users[buscarIndice]

    usuario.recados.push(novoRecado)

    return response.status(201).json(novoRecado)
})


//LER

app.get('/users/recados/:id', (request, response) => {
    const parametroId = request.params.id

    const buscarIndice = users.findIndex((usuario) => usuario.id == parametroId)


    if (buscarIndice === -1) {
        return response.status(404).json("Usuário não encontrado");
    }


    const usuarioRecados = users[buscarIndice].recados;
    return response.status(200).json(usuarioRecados);
})


//ATUALIZAR 

app.put('/users/recados/:id/:idRecado', (request, response) => {
    const parametroId = request.params.id

    const userToAlterIndex = users.findIndex((usuario) => {
        return usuario.id == parametroId

    });

    const usuario = users[userToAlterIndex]
    const recados = usuario.recados
    const idRecado = request.params.idRecado

    const indiceRecado = recados.findIndex((item) => {
        return item.id == idRecado
    })

    const body = request.body

    let editarRecado = {
        id: idRecado,
        titulo: body.titulo,
        descricao: body.descricao
    }

    recados[indiceRecado] = editarRecado

    return response.json(recados[indiceRecado]);

});

//EXCLUIR

app.delete('/users/recados/:id/:idRecado', (request, response) => {
    const parametroId = request.params.id
    console.log(parametroId);

    const indiceUsuario = users.findIndex((user) => {
        return user.id == parametroId
    });

    console.log(indiceUsuario);

    if (indiceUsuario === -1) {
        return response.status(400).json("Erro!");
    }

    const recadosUsuario = users[indiceUsuario].recados

    const idRecado = request.params.idRecado

    const indiceRecado = recadosUsuario.findIndex((recado) => {
        return recado.id == idRecado
    })

    recadosUsuario.splice(indiceRecado, 1)
    return response.json("Recado apagado com sucesso.");
})




app.listen(8080, () => console.log("Servidor iniciado"));