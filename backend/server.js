import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'
import User from './models/userModel.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import bodyParser from 'body-parser';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
connectDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready'));


app.post('/api/users/uploadImage/:emailId', upload.single('image'), async (req, res) => {
    try {
        console.log("hereee")
        const userId = req.params.emailId;
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).send('User not found');
        }
    
        user.profileImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype
        };
        await user.save();
        res.status(200).send('Image uploaded successfully!');
      } catch (error) {
        res.status(500).send(error.message);
      }
})

app.use(notFound);
app.use(errorHandler); 

app.listen(port, () => console.log(`Server started on port ${port}`));