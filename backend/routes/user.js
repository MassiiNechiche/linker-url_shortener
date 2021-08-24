const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const user = require("../model/user");

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = await bcrypt.hash(req.body.password, 10);

  userData = {
    username,
    password,
  };

  const newUser = new user(userData);
  newUser
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  user.findOne({ username: username }, (err, obj) => {
    if (obj) {
      dbpassword = obj.password;

      if (!bcrypt.compareSync(password, dbpassword)) {
        res.send("Invalid");
      } else {
        res.send({ id: obj._id, username });
      }
    } else {
      res.send("No user");
    }
  });
});

module.exports = router;
