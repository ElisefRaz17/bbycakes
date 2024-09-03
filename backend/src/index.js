import express from "express";
import cors from "cors";
import customers from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ origin: `https://bbycakes.vercel.app/`, credentials: true }));
app.use(express.json());
app.use("/record", customers);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

module.exports = app;
