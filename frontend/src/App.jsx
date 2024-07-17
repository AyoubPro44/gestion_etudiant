import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import SignUp from './pages/signup'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Acceuil from './pages/acceuil'
import Layout from './components/layout'
import ProfPlanning from './pages/profPlanning'
import ProfClasses from './pages/profClasses'
import EtudiantList from './pages/etudiantList'
import GradesEntry from './pages/gradesEntry'
import ProfProfile from './pages/profProfile'
import ProfReport from './pages/profReport'
import EtudiantPlanning from './pages/etudiantPlanning'
import EtudiantProgram from './pages/etudiantProgram'
import EtudiantGrades from './pages/etudiantGrades'
import NotFoundPage from './pages/notFoundPage'
import YearsChoosing from './pages/yearsChoosing'
import EtudiantProfile from './pages/etudiantProfile'
import ChooseEtudiant from './pages/chooseEtudiant'
import ParentProfile from './pages/parentProfile'
import FilieresGestion from './pages/filieresGestion'
import FiliereDetails from './pages/filiereDetails'
import ProfsGestion from './pages/profsGestion'
import ParentsGestion from './pages/parentsGestion'
import ReportGestion from './pages/reportGestion'
import FilieresPage from './components/gestionEtudiants/filieresPage'
import SemestresPage from './components/gestionEtudiants/semestresPage'
import AdminProfile from './pages/adminProfile'
import ChatBotPage from './pages/chatBotPage'

function App() {
  const client = new QueryClient()

  return (
    <>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/acceuil' element={<Layout><Acceuil /></Layout>} />
            <Route path='/professeur/planning' element={<Layout><ProfPlanning /></Layout>} />
            <Route path='/professeur/classes' element={<Layout><ProfClasses /></Layout>} />
            <Route path='/professeur/classes/:id_filiere/:semestre' element={<Layout><EtudiantList /></Layout>} />
            <Route path='/professeur/grades' element={<Layout><GradesEntry /></Layout>} />
            <Route path='/professeur/profile' element={<Layout><ProfProfile /></Layout>} />
            <Route path='/professeur/report' element={<Layout><ProfReport /></Layout>} />
            <Route path='/etudiant/planning' element={<Layout><EtudiantPlanning /></Layout>} />
            <Route path='/etudiant/program' element={<Layout><EtudiantProgram /></Layout>} />
            <Route path='/etudiant/grades' element={<Layout><YearsChoosing /></Layout>} />
            <Route path='/etudiant/grades/:year' element={<Layout><EtudiantGrades /></Layout>} />
            <Route path='/etudiant/profile' element={<Layout><EtudiantProfile /></Layout>} />
            <Route path='/parent/chooseEtudiant' element={<ChooseEtudiant />} />
            <Route path='/parent/etudiantPlanning' element={<Layout><EtudiantPlanning /></Layout>} />
            <Route path='/parent/etudiantProgram' element={<Layout><EtudiantProgram /></Layout>} />
            <Route path='/parent/etudiantGrades' element={<Layout><YearsChoosing /></Layout>} />
            <Route path='/parent/etudiantGrades/:year' element={<Layout><EtudiantGrades /></Layout>} />
            <Route path='/parent/profile' element={<Layout><ParentProfile /></Layout>} />
            <Route path='/admin/filieres' element={<Layout><FilieresGestion /></Layout>} />
            <Route path='/admin/filieres/:id_filiere' element={<Layout><FiliereDetails /></Layout>} />
            <Route path='/admin/professeurs' element={<Layout><ProfsGestion /></Layout>} />
            <Route path='/admin/parents' element={<Layout><ParentsGestion /></Layout>} />
            <Route path='/admin/reports' element={<Layout><ReportGestion /></Layout>} />
            <Route path='/admin/etudiants/filieres' element={<Layout><FilieresPage /></Layout>} />
            <Route path='/admin/etudiants/semestres/:id_filiere' element={<Layout><SemestresPage /></Layout>} />
            <Route path='/etudiants/list/:id_filiere/:semestre' element={<Layout><EtudiantList /></Layout>} />
            <Route path='/admin/profile' element={<Layout><AdminProfile /></Layout>} />
            <Route path='/chatBot' element={<Layout><ChatBotPage /></Layout>} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
