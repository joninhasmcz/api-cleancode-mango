const Empregado = require("../models/Empregado");

exports.listarEmpregados = async (req, res) => {
  try {
    const empregados = await Empregado.find();
    res.json(empregados);
  } catch (erro) {
    res.status(500).json({
      error: "Falha ao tentar buscar os empregados",
    });
  }
};

exports.obterEmpregado = async (req, res) => {
  try {
    const empregado = await Empregado.findById(req.params.id);
    if (!empregado) {
      return res.status(404).json({
        erro: "Empregado não encontrado",
      });
    }
    res.json(empregado);
  } catch (erro) {
    if (erro.kind === "ObjectId") {
      return res.status(400).json({
        erro: "Id Inválido",
      });
    }
    res.status(500).json({
      erro: "Falha ao tentar buscar o empregado",
    });
  }
};

exports.criarEmpregado = async (req, res) => {
  try {
    const empregado = new Empregado(req.body);
    await empregado.save();
    res.status(201).json(empregado);
  } catch (erro) {
    res.status(400).json({
      erro: "Falha ao tentar criar um empregado",
    });
  }
};

exports.atualizarEmpregado = async (req, res) => {
  try {
    const empregado = await Empregado.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!empregado) {
      return res.status(404).json({
        erro: "Empregado não encontrado",
      });
    }
  } catch (erro) {
    if (erro.kind === "ObjectId") {
      return res.status(402).json({
        erro: "Id inválido",
      });
    }
    res.status(500).json({
      erro: "Falha ao tentar atualizar um empregado",
    });
  }
};

exports.excluirEmpregado = async (req, res) => {
  try {
    const empregado = await Empregado.findByIdAndDelete(req.params.id);
    if (!empregado) {
      return res.status(404).json({
        erro: "Empregado não encontrado",
      });
    }
  } catch (erro) {
    if (erro.kind === "ObjectId") {
      return res.status(400).json({
        erro: "ID inválido",
      });
    }
    res.status(500).json({
      erro: "Falha ao tentar exlcuir um empregado",
    });
  }
};
