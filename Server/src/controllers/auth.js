const {User} = require("../../models");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register session
exports.register = async (req, res) => {
  const schema = Joi.object({
    userName: Joi.string().min(4).required(),
    email: Joi.string().email().min(8).required(),
    gender: Joi.string().required(),
    password: Joi.string().min(8).required(),
    phone: Joi.string().min(6).required(),
    address: Joi.string().min(6).required(),
  });

  const {error} = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {message: error.details[0].message},
    });
  }

  try {
    const allUser = await User.findAll();
    const userNameExist = allUser.find(
      (item) => req.body.userName === item.userName
    );
    const emailExist = allUser.find((item) => req.body.email === item.email);
    if (userNameExist) {
      return res.status(400).send({
        status: true,
        message: "Username already exist",
      });
    }
    if (emailExist) {
      return res.status(400).send({
        status: true,
        message: "Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const {userName, email, gender, phone, address} = req.body;

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      gender,
      phone,
      address,
      status: "user",
    });

    const token = jwt.sign(
      {id: newUser.id, status: newUser.status},
      process.env.TOKEN_KEY,
      {expiresIn: "1d"}
    );

    res.status(200).send({
      status: "success",
      user: {
        userName: newUser,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  }
};

// login section
exports.login = async (req, res) => {
  const schema = Joi.object({
    userName: Joi.string().min(2).required(),
    password: Joi.string().required(),
  });

  const {error} = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {message: error.details[0].message},
    });
  }

  try {
    const userExist = await User.findOne({
      where: {
        userName: req.body.userName,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "Email or password are incorrect",
      });
    }

    const isPassValid = await bcrypt.compare(
      req.body.password,
      userExist.password
    );
    if (!isPassValid) {
      return res.status(400).send({
        status: "failed",
        message: "Email or password are incorrect",
      });
    }

    const token = jwt.sign(
      {id: userExist.id, status: userExist.status},
      process.env.TOKEN_KEY,
      {expiresIn: "1d"}
    );
    res.status(200).send({
      status: "success",
      user: {
        userName: userExist,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const {id} = req.user;

    const dataUser = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: {
          id: dataUser.id,
          userName: dataUser.userName,
          email: dataUser.email,
          gender: dataUser.gender,
          phone: dataUser.phone,
          address: dataUser.address,
          status: dataUser.status,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};
