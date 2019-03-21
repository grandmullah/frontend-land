import React from 'react';
 

export default class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError (nextProps, prevState) {
    return { hasError: true }
  }
//   componentDidCatch (error, info) {
//     logErrorToMyService(error, info)
//   }

  render () {
    if (this.state.hasError) {
      return <h1> something went wrong</h1>
    }
    return this.props.children
  }
}

