
import mongoose from "mongoose"; //importa a biblioteca do mongoose

const connetcDatabase = () => {
    mongoose.connect(
        process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}
    )
    //exibi no terminal
    .then(() => console.log("MongoDB conect"))
    .catch((error) => console.log(error))
}

export default connetcDatabase;