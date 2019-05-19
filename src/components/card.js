import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';



const styles = {
    card: {
    maxWidth: 345,
    width:350,
    height: 350,
    //marginLeft:20,
    //paddingRight:10,
    margin:10,
    marginBottom:20,
    borderRadius:2,
    display: 'flex', 
    justifyContent: 'center'

    },
    area: {
        textAlign:'center',
        //width:350,
    },
};


class CustomCard extends React.Component {
    render(){
    const { characterName, characterImage, characterDescription, classes, subTitle } = this.props;
        
    return (
        <div>
            <Card className={classes.card}>
                <CardActionArea className={classes.area} >
                    <div>
                        <img style={{
                            width:350, 
                            //height:200, 
                            borderRadius:2
                            
                            }} 
                            title={characterDescription} 
                            src={characterImage}
                            alt=''
                            />
                    </div>
                    <CardContent className={classes.media}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {characterName}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h5">
                            {subTitle}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );    
    }
}

export default withStyles(styles)(CustomCard);