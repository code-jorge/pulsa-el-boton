import { createContext, useState, useContext, useEffect } from 'react'
import { Alert, AlertTitle } from '@mui/material'
import styles from './NotificationManager.module.css'

const Context = createContext()

const Notification = ({ type, title, message }) => (
  <div className={styles.notification}>
    <Alert className={styles.alert} severity={type} variant='filled'>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  </div>
)

export const NotificationManager = ({ children }) => {

  const [notification, setNotification] = useState({})

  const success = ({ title, message, timeout=4000 })=> {
    setNotification({ type: 'success', title, message, timeout })
  }

  const info = ({ title, message, timeout=4000 })=> {
    setNotification({ type: 'info', title, message, timeout })
  }

  const warning = ({ title, message, timeout=4000 })=> {
    setNotification({ type: 'warning', title, message, timeout })
  }

  const error = ({ title, message, timeout=4000 })=> {
    setNotification({ type: 'error', title, message, timeout })
  }

  useEffect(() => {
    if (notification.timeout && notification.timeout > 0) {
      const timeout = setTimeout(() => {
        setNotification({})
      }, notification.timeout)
      return () => clearTimeout(timeout)
    }
    return () => {}
  }, [notification.timeout])

  return (
    <Context.Provider value={{ success, info, warning, error }}>
      {children}
      {notification.title && notification.message && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
        />
      )}
    </Context.Provider>
  )
}

export const useNotification = () => useContext(Context)