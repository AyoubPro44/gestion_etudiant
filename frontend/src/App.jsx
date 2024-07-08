import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import './App.css'
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
            <Route path='/etudiant' element={<div>etudiant</div>} />
            <Route path='/parent' element={<div>parent</div>} />
            <Route path='/admin' element={<div>administrateur</div>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App
