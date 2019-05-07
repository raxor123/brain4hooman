import React from 'react';
import PropTypes from 'prop-types'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import { Pets, ExitToApp, AccountCircle } from '@material-ui/icons/'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './header.scss'

class Header extends React.Component {
  renderContent() {
    switch(this.props.currentUser) {
      case null:
        return
      case false:
        return (
          <Link href="/auth/google">
            <Button color="inherit">Login With Google <AccountCircle/></Button>
          </Link>
        )
      default:
        return (
          <Link href="/auth/logout">
            <Button color="inherit">Log Out <ExitToApp/></Button>
          </Link>
        )
    }
  }

  logoRedirection = () => {
    console.log(this.props)
    this.props.history.push(this.props.currentUser ? '/exercises' : '/')
  }

  render () {
    return (
      <div className={'header'}>
        <AppBar position="static">
          <Toolbar onClick={this.logoRedirection}>
              <IconButton className={'menu-button'} color="inherit" aria-label="Menu">
                <Pets />
              </IconButton>
              <Typography variant="h6" color="inherit" className={'grow'}>
                Brain4Hooman
              </Typography>
            {this.renderContent()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {

};

function mapStateToProps(state) {
  return { ...state }
}

export default withRouter(connect(mapStateToProps)(Header));
