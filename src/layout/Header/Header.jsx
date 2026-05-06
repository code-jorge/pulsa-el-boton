import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import styles from './Header.module.css'

const ListIcon = ({ className })=> (
  <svg className={className} viewBox="-31 -31 200 200">
    <rect height="8" width="64" x="53" y="17"/>
    <rect height="8" width="64" x="53" y="60"/>
    <rect height="8" width="64" x="53" y="103"/>
    <path d="M21,121c7.7,0,14-6.3,14-14s-6.3-14-14-14S7,99.3,7,107S13.3,121,21,121z M21,101c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6   S17.7,101,21,101z"/>
    <path d="M21,78c7.7,0,14-6.3,14-14s-6.3-14-14-14S7,56.3,7,64S13.3,78,21,78z M21,58c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6   S17.7,58,21,58z"/>
    <path d="M21,35c7.7,0,14-6.3,14-14S28.7,7,21,7S7,13.3,7,21S13.3,35,21,35z M21,15c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6   S17.7,15,21,15z"/>
  </svg>
)

const RandomIcon = ({ className })=> (
  <svg className={className} viewBox="20 20 160 160">
    <path d="M73.3,130.05H54.8a1.8,1.8,0,1,1,0-3.6H73.3a7.91,7.91,0,0,0,6.38-3.24l35.43-48.54A11.52,11.52,0,0,1,124.39,70h20.15a1.8,1.8,0,1,1,0,3.6H124.39A7.91,7.91,0,0,0,118,76.79L82.59,125.33A11.53,11.53,0,0,1,73.3,130.05Z"/>
    <path d="M133.41,88a1.77,1.77,0,0,1-1.15-.42A1.8,1.8,0,0,1,132,85l11.08-13.24L132,58.51a1.8,1.8,0,1,1,2.76-2.31l11.65,13.93a2.63,2.63,0,0,1,.08,3.15l-11.73,14A1.78,1.78,0,0,1,133.41,88ZM143.6,72.33h0Z"/>
    <path d="M144.54,130.05H124.39a11.52,11.52,0,0,1-9.28-4.72L79.68,76.79a7.91,7.91,0,0,0-6.38-3.24H54.8a1.8,1.8,0,0,1,0-3.6H73.3a11.53,11.53,0,0,1,9.29,4.72L118,123.21a7.91,7.91,0,0,0,6.37,3.24h20.15a1.8,1.8,0,1,1,0,3.6Z"/>
    <path d="M133.41,144.45a1.77,1.77,0,0,1-1.15-.42,1.8,1.8,0,0,1-.23-2.54l11.08-13.24L132,115a1.8,1.8,0,1,1,2.76-2.31l11.65,13.92a2.63,2.63,0,0,1,.08,3.15l-11.73,14A1.78,1.78,0,0,1,133.41,144.45Z"/>
  </svg>
)

const Header = ()=> (
  <header className={styles.header}>
    <Link className={styles.link} to='/'>
      <Button className={styles.logo} type='element' />
      <h1 className={styles.title}>
        Pulsa
        <br/>
        el botón
      </h1>
    </Link>
    <div className={styles.links}>
      <Link className={styles.sectionLink} to='/aleatorio'>
        <RandomIcon className={styles.icon} />
      </Link>
      <Link className={styles.sectionLink} to='/dilemas'>
        <ListIcon className={styles.icon} />
      </Link>
    </div>
  </header>
)

export default Header