import { Usuario } from "../models/Usuario.js";
import moment from "moment/moment.js";

class UsuarioController {
  static inserir = async (req, res) => {
    // desestruturação do body para acessar os atributos
    const { nome, idade, ativo, email } = req.body;

    // crio o objeto usuario copiado do objeto body
    const usuario = { nome, idade, ativo, email };

    Object.keys(usuario).forEach((key) => {
      // console.log('chave:', key, 'valor:', usuario[key])

      if (!usuario[key]) {
        console.log("validar");
        res.status(422).json({ msg: `O campo ${key}, é vazio!` });
        //interrompe a criação, ou seja, abaixo dele não executa a inserção
        return
      }
    });

    

    console.log("inserir");

    //cria o usuario através do mongoose e retorna o usuário criado com o id preenchido
    const usuarioDB = await Usuario.create(usuario);

    console.log("consultou");
    res.status(201).json({
      data: usuarioDB,
      msg: "Usuário criado com sucesso!",
    });
  };

  static atualizar = async (req, res) => {
    const id = req.params.id;

    // desestruturação do body para acessar os atributos
    const { nome, idade, ativo, email } = req.body;

    // crio o objeto usuario copiado do objeto body
    const usuario = { nome, idade, ativo, email };

    const updatedUsuario = await Usuario.updateOne({ _id: id }, usuario);
    console.log(updatedUsuario)

    if(updatedUsuario.matchedCount === 0) {
      res.status(422).json(`Usuário ${usuario.nome} não foi atualizado!`);
    }

    res.status(204).json("Usuário atualizado com sucesso!");
  };

  static buscarTodos = async (req, res) => {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  };

  static buscarPorId = async (req, res) => {
    const id = req.params.id;

    if (id.length < 24 || id.length > 24) {
      res.status(422).json({ message: "Tamanho inválido do Id!" });
      return;
    }

    const usuario = await Usuario.findOne({ _id: id });

    console.log(usuario);

    if (!usuario) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json(usuario);
  };

  static excluir = async (req, res) => {
    const id = req.params.id;

    if (id.length < 24 || id.length > 24) {
      res.status(422).json({ message: "Tamanho inválido do Id!" });
      return;
    }

    //Busca o usuário, antes de deletar, com as suas informações
    const usuarioBD = await Usuario.findOne({ _id: id });

    if (!usuarioBD) {
      res.status(422).json({ message: "Usuário não encontrado!" });
      return;
    }

    //Deleta o usuário do banco
    await Usuario.deleteOne({ _id: usuarioBD.id });

    //Pego a data atual, new Date(), e coloco no formato 27/07/2023 20:06:55
    let date = moment(new Date()).format("DD/MM/YYYY hh:mm:ss");

    //Mensagem para exibir
    let msg = `O usuário ${usuarioBD.nome} foi excluído com sucesso às ${date} !`;
    res.status(200).json({ msg });
  };
}

export default UsuarioController;
