import React from 'react'
import { Switch } from 'react-router'
import { Redirect, Route } from 'react-router-dom'
import Layout from './layout/Layout/Layout'
import CreateDilemma from './views/CreateDilemma/CreateDilemma'
import Dilemma from './views/Dilemma/Dilemma'
import DilemmaList from './views/DilemmaList/DilemmaList'
import Endgame from './views/Endgame/Endgame'
import Home from './views/Home/Home'
import Random from './views/Random/Random'
import Statistics from './views/Statistics/Statistics'

const App = ()=> (
  <Layout>
    <Switch>
      <Route exact path='/dilema/:slug' component={Dilemma} />
      <Route exact path='/estadisticas/:slug' component={Statistics} />
      <Route exact path='/dilemas' component={DilemmaList} />
      <Route exact path='/aleatorio' component={Random} />
      <Route exact path='/final' component={Endgame} />
      <Route exact path='/nuevo-dilema' component={CreateDilemma} />
      <Route exact path='/' component={Home} />
      <Redirect to='/' />
    </Switch>
  </Layout>
)

export default App