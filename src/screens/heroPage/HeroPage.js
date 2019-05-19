import React from "react";

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//actions
import {getCharacter} from './redux';

import { withStyles } from '@material-ui/core/styles';
import HeaderBar from '../../components/headerBar';

import CustomCard from '../../components/card';
import Grid from '@material-ui/core/Grid';

import EditIcon from '@material-ui/icons/Edit'
import  Button  from "@material-ui/core/Button";

import Modal from '@material-ui/core/Modal';

import TextField from '@material-ui/core/TextField';




import ModalEditCharacter from '../../components/modalEditCharacter';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop:30
        },
    

    rightIcon: {
        marginLeft: theme.spacing.unit
        },

    button: {
        margin: theme.spacing.unit,
        },

    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 30,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

        },  
});

class HeroPage extends React.Component{
    
    constructor(){
        super();
        this.state = {
            total:0,
            listSeries:[],
            characterName:'',
            characterDescription:'',
            isLoading:false,
            spacing:40,
            modalOpen:false
            };
        }
    
    componentDidMount(){
        this.props.getCharacter(this.props.match.params.id);
    };

    getModalStyle() {
        const top = 50;
        const left = 50;


        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
            flexDirection:'column'
            };
        }

    handleEditCharacter(){
        this.setState({ modalOpen: true });

    }

    handleClose = () => {
        this.setState({ modalOpen: false });
      };

    //handleSaveInfo(nameCharacter, characterDescription) {
        handleSaveInfo = (characterName, characterDescription) => {
            this.setState({ 
            characterDescription:characterDescription,
            characterName:characterName,
            modalOpen: false,
         });

    }

    componentWillReceiveProps(nextProps){
        if (nextProps.listSeriesReducer != null && !nextProps.isLoadingReducer) {

            const {characterDescription, characterName} = this.props.location.state;

            this.setState({
                listSeries:nextProps.listSeriesReducer,
                isLoading:nextProps.isLoadingReducer,
                characterDescription:characterDescription, 
                characterName:characterName
                //total:nextProps.totalReducer,
                //hasMore: true
            })
        }
    }

    

    render(){
        
        const {characterImage, spacing} = this.props.location.state;
        const { classes } = this.props;
    //if (!this.state.listSeries.length > 0 || characterReducer.isLoading) {
      //  return this.renderLoading();
      //}

        if (!this.state.isLoading) {
            var items = this.state.listSeries.map((i, index) => (
                <div key={index}>
                    <Grid key={index} item>
                        <CustomCard 
                            characterName={''} 
                            subTitle={i.title}
                            characterImage={i.thumbnail.path+'/landscape_medium.jpg'}/>
                    </Grid>
                    
                </div>
            ))
        }
        return(
            <div>
                <HeaderBar/>
                <div style={{marginTop:10, display: 'flex', justifyContent: 'center'}}>
                    <img style={{width:350, height:300}} alt='' src={characterImage}/>
                </div>
                <div style={{textAlign:'center'}}>
                    <Button onClick={() => this.handleEditCharacter()} 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}>
                        edit
                        <EditIcon className={classes.rightIcon} />
                    </Button>
                    <h3>
                        {this.state.characterName}
                    </h3>
                    <p>
                        {this.state.characterDescription}
                    </p>
                </div>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container justify="center"  spacing={Number(spacing)}>
                            {items}
                        </Grid>
                    </Grid>
                </Grid>
                <ModalEditCharacter 
                    modalOpen={this.state.modalOpen} 
                    onClose={this.handleClose} 
                    onSave={this.handleSaveInfo}
                    characterName={this.state.characterName}
                    characterDescription={this.state.characterDescription}
                    
                    />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listSeriesReducer: state.character.listSeries,
        isLoadingReducer:state.character.isLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCharacter
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeroPage));