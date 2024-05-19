// Файл middlewares/categories.js

// Импортируем модель
const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
  console.log("GET /categories");
  req.categoriesArray = await categories.find({});
  next();
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
  // Проверяем наличие жанра у игры
  if (!req.body.categories || req.body.categories.length === 0) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Выбери хотя бы одну категорию" }));
  } else {
    next();
  }
};

const checkIsCategoryExists = async (req, res, next) => {
  // Среди существующих в базе категорий пытаемся найти категорию с тем же именем,
  // с которым хотим создать новую категорию
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  // Если нашли совпадение, то отвечаем кодом 400 и сообщением
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Категория с таким названием уже существует",
      })
    );
  } else {
    // Если категория, которую хотим создать, действительно новая, то передаём управление дальше
    next();
  }
};

const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Введите название категории" }));
  } else {
    next();
  }
};

const findCategoryById = async (req, res, next) => {
  console.log("GET /categories/:id");
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Категория не найдена" }));
  }
};

const createCategory = async (req, res, next) => {
  console.log("POST /categories");
  try {
    req.category = await categories.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания категории" }));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    // В метод передаём id из параметров запроса и объект с новыми свойствами
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка обновления категории" });
  }
};

const deleteCategory = async (req, res, next) => {
  console.log("DELETE /categories/:id");
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления категории" }));
  }
};

// Экспортируем функцию поиска всех категорий
module.exports = {
  findAllCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  checkIsCategoryExists,
  checkIfCategoriesAvaliable,
  checkEmptyName,
};
