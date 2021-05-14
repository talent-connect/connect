import React from 'react'
import styles from './app.module.scss'

import { ReactComponent as Logo } from './logo.svg'
import star from './star.svg'

import { Button } from '@talent-connect/shared-atomic-design-components'

export function App() {
  return (
    <div className={styles.app}>
      <Button>Hello Marcus</Button>
    </div>
  )
}

export default App
