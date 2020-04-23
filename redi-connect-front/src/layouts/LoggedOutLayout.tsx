import React from 'react'

interface Props {
  children: React.ReactNode
  modifier?: string
}

export const LoggedOutLayout = ({ children, modifier }: Props) => (
  // this will be done in a more elegant way when the layout wrapper is done
  <div className={`page ${modifier}`}>{children}</div>
)
