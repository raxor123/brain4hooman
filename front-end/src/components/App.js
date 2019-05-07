import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import * as actions from '../actions'
import { connect } from 'react-redux'

import Header from './header'
import './App.css'

const Dashboard = () => <h2>Dashboard</h2>
const Questions = () => <h2>Questions</h2>
const Landing = () => <h2>Landing</h2>

class App extends Component {
    componentDidMount () {
        this.props.fetchUser()
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route path="/" component={Landing} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App);