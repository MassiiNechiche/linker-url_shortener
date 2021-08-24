const express = require("express");

const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

const shortUrl = require("./model/short");

const userRouter = require("./routes/user");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

const PORT = process.env.PORT || 5000;

// db
mongoose
  .connect(
    "mongodb+srv://admin:ASoXe81kCnFO8Yv5@cluster0.etvc2.mongodb.net/linker?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongo connected");
    app.listen(PORT, () => {
      console.log("Server up and running");
    });
  })
  .catch((err) => console.log(err));

// End points
// return the shortened URL
app.post("/", (req, res) => {
  url = {
    owner: req.body.id,
    full: req.body.url,
  };
  const short = new shortUrl(url);

  short
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

// return all short links
app.post("/shorts", (req, res) => {
  shortUrl.find({ owner: req.body.id }).then((data) => res.send(data));
});

//  delete a url
app.delete("/", (req, res) => {
  id = req.body.id;
  shortUrl.deleteOne({ short: id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Redirection from the short url
app.get("/:id", (req, res) => {
  id = req.params.id;
  shortUrl.findOne({ short: id }).then((data) => res.redirect(data.full));
});

// Routes
app.use("/user", userRouter);
