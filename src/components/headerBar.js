import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
};

//function DenseAppBar(props) {
class HeaderBar extends React.Component {
    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Marvel's heroes
            </Typography>
            <div className={classes.grow} />
            </Toolbar>
        </AppBar>
        </div>
        );
    }
}

HeaderBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderBar);