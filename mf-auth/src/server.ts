import 'dotenv/config'
import app from "./app";


app.listen(process.env.PORT, () => {
  console.log(`Server is runnig on port ${process.env.PORT}`);
});
