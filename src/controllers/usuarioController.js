import { Usuario } from "../models/Usuario";

class UsuarioController {
  static criar = async (req, res) => {
    // desestruturação do body para acessar os atributos
    const { nome, idade, ativo, email } = req.body;
    // crio o objeto usuario copiado do objeto body
    const usuario = { nome, idade, ativo, email };

    //cria o usuario através do mongoose
    const usuarioDB = await Usuario.create(usuario);
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

    await Usuario.updateOne({ _id: id }, usuario);
    res.status(204).json("Usuário atualizado com sucesso!");
  };

  static buscarTodos = async (req, res) => {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  };

  static buscarPorId = async (req, res) => {
    const id = req.params.id;

    const usuario = await Usuario.findOne({ _id: id });

    res.status(200).json(usuario);
  };

  static excluir = async (req, res) => {
    const id = req.params.id;

    //Busca o usuário, antes de deletar, com as suas informações
    const usuarioBD = await Usuario.findOne({ _id: id });

    //Deleta o usuário do banco
    await Usuario.deleteOne({ _id: usuarioBD.id });

    //Pego a data atual, new Date(), e coloco no formato 27/07/2023 20:06:55
    let date = moment(new Date()).format("DD/MM/YYYY hh:mm:ss");

    //Mensagem para exibir
    let msg = `O usuário ${usuarioBD.nome} foi excluído com sucesso às ${date} !`;
    res.status(200).json({ msg });
  };
}

export default UsuarioController