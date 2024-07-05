const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const filiereRoutes = require('./routes/filiereRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const sousModuleRoutes = require('./routes/sousModuleRoutes');
const etudiantRoutes = require('./routes/etudiantRoutes');
const profRoutes = require('./routes/profRoutes');

const app = express();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
