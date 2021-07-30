import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Layout from './layout/Layout/Layout'
import Dilemma from './views/Dilemma/Dilemma'
import DilemmaList from './views/DilemmaList/DilemmaList'
import Statistics from './views/Statistics/Statistics'

const App = ()=> (
  <Layout>
    <Switch>
      <Route exact path='/dilema/:slug' component={Dilemma} />
      <Route exact path='/estadisticas/:slug' component={Statistics} />
      <Route exact path='/dilemas' component={DilemmaList} />
    </Switch>
  </Layout>
)

export default App