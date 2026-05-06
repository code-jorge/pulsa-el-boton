import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import styles from './Layout.module.css'

const Layout = ({ children })=> (
  <>
  <Header />
  <main className={styles.main}>
    {children}
  </main>
  <Footer />
  </>
)

export default Layout