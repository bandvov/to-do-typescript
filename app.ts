import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import todoRoutes from "./routes"
import path from 'path'
require('dotenv').config()
const app: Express = express()

const PORT: string | number = process.env.PORT || 5000
app.use(express.json())
app.use(cors({origin:'*'}))
app.use(todoRoutes)
if(process.env.NODE_ENV==='production') {
  app.use(express.static(path.join(__dirname + "/client/build")));
app.get('/*',(req,res)=>{
res.sendFile(path.join(__dirname,'/client/build','index.html'))
})
}

const url = process.env.MONGO_URL

const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(url, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })