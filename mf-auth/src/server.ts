import 'dotenv/config'
import app from "./app";


app.listen(process.env.PORT, () => {
  console.log(`Server is runnig on port ${process.env.PORT}`);
});

app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  console.log('Request Headers:', req.headers);
  next();
});
