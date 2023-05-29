const db = require("../models");

//Main Model
const Task = db.tasks;

//CRUD

//C -> Create

const addTask = async (req, res) => {
  let info = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
  };

  const task = await Task.create(info);

  res.status(200).send(task);
};

//R -> Read

const getAllTask = async (req, res) => {
  let tasks = await Task.findAll();
  res.status(200).send(tasks);
};

const getOneTask = async (req, res) => {
  let id = req.params.id;
  let task = await Task.findOne({ where: { id: id } });
  res.status(200).send(task);
};

//U -> Update

const updateTask = async (req, res) => {
  let id = req.params.id;
  await Task.update(req.body, {
    where: { id: id },
    plain: true,
  });

  //use updatedTask and another call API because return object is not supported by MySQL (only Postgre)
  const updatedTask = await Task.findByPk(id);

  res.status(200).send(updatedTask);
};

//D- Delete

const deleteOneTask = async (req, res) => {
  let id = req.params.id;
  await Task.destroy({ where: { id: id } });
  res.status(200).send(`Task id:${id} deleted.`);
};

module.exports = {
  getAllTask,
  getOneTask,
  addTask,
  updateTask,
  deleteOneTask,
};
