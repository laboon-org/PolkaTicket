import React from 'react'

interface Props {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ element }: Props): React.ReactElement => {
  // v1.1.0-stable: Authentication removed for direct wallet-based access
  return element
}

export default PrivateRoute