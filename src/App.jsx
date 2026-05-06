import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout/Layout'
import CreateDilemma from './views/CreateDilemma/CreateDilemma'
import Dilemma from './views/Dilemma/Dilemma'
import DilemmaList from './views/DilemmaList/DilemmaList'
import Endgame from './views/Endgame/Endgame'
import Home from './views/Home/Home'
import Random from './views/Random/Random'
import Statistics from './views/Statistics/Statistics'

const App = () => (
  <Layout>
    <Routes>
      <Route path='/dilema/:slug' element={<Dilemma />} />
      <Route path='/estadisticas/:slug' element={<Statistics />} />
      <Route path='/dilemas' element={<DilemmaList />} />
      <Route path='/aleatorio' element={<Random />} />
      <Route path='/final' element={<Endgame />} />
      <Route path='/nuevo-dilema' element={<CreateDilemma />} />
      <Route path='/' element={<Home />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  </Layout>
)

export default App
