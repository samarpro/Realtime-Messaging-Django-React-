import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    state = { hasError: false }

    // this function runs when error is catched but it is used to update the state
    static getDerivedStateFromError(err) {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.log(error, info)
    }
    render() {
        if (this.state.hasError) return this.props.fallback
        return this.props.children
    }
}
