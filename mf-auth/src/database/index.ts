import 'dotenv/config'
import mongoose from "mongoose"
// import Sequelize from "sequelize"

// import User from "../app/models/User"
// import configDatabase from "../config/database"
// import Products from "../app/models/Products"
// import Category from "../app/models/Category"

// const models = [User, Products, Category]
class Database {
  constructor() {
    this.mongo()
  }
  async mongo() {
    try {
      await mongoose.connect(process.env.MONGODB_URL! || '');
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB', err);
    }
  }
}

export default new Database()