const express = require('express')
const cors = require('cors')

const upload = require('./middleware/upload')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const articlesRoutes =require('./routes/articlesRoutes')
const categoriesRoutes = require('./routes/categoryRoutes')

const app = express()

app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json())
app.use("/uploads", express.static("uploads"));

app.use('/api/auth', authRoutes) //semua route di authRoutes akan di awali '/api/auth'
app.use('/api/users', userRoutes)
app.use('/api/articles', articlesRoutes)
app.use('/api/categories', categoriesRoutes)

app.post("/upload-test",
  upload.single("image"),
  async (req, res) => {
    console.log(req.file);

    res.json({
      message: "Upload success",
      file: req.file,
    });
  }
);




module.exports = app