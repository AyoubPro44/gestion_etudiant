const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const filiereRoutes = require('./routes/filiereRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const sousModuleRoutes = require('./routes/sousModuleRoutes');
const etudiantRoutes = require('./routes/etudiantRoutes');
const profRoutes = require('./routes/profRoutes');
const postRoutes = require('./routes/postRoutes');
const parentRoutes = require('./routes/parentRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const reportRoutes = require('./routes/reportRoutes');
const chatBotRoutes = require('./routes/chatBotRoutes');
const verifyToken = require('./middlewares/verifyToken'); 
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));

app.use('/api/users', userRoutes);
app.use('/api/filieres', filiereRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/sousModule', sousModuleRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/professeur', profRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/chatBot', chatBotRoutes);

const PORT = process.env.PORT || 5000;

app.use('/secure-uploads/posts', express.static(path.join(__dirname, 'uploads/posts')));
app.use('/secure-uploads/plannings', express.static(path.join(__dirname, 'uploads/plannings')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
