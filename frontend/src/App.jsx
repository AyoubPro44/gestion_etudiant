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
            <Route path='/parent/Profile' element={<Layout><ParentProfile /></Layout>} />

            <Route path='/admin' element={<div>administrateur</div>} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
