const {User} = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    let data = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    data = JSON.parse(JSON.stringify(data));
    const newData = data.map((item) => {
      return {
        id: item.id,
        email: item.email,
        userName: item.userName,
        gender: item.gender,
        phone: item.phone,
        address: item.address,
      };
    });

    res.send({
      status: "success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};
