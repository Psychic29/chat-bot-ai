import app from "./app";
import { connectToDatabase } from "./db/connection";

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to database successfully");
    });
  })
  .catch((error) => {
    console.log(error);
  });
