import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  };

class InfiniteScroll extends React.Component {
    componentWillReceiveProps(nextProps){
        if (nextProps.characters != null) {
        }

    }

    
     render(){
        const {fetchData} = this.props;

        let items = fetchData();

        

        return(
            <div>
                {this.props.children}
            </div>

        )
    }
}

export default withStyles(styles)(InfiniteScroll);