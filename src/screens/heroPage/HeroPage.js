import React from "react";

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//actions
import {getCharacter} from './redux';

//components
import { withStyles, Grid, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import HeaderBar from '../../components/headerBar';
import CustomCard from '../../components/CustomCard';
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
            isLoading:true,
            spacing:40,
            modalOpen:false
            };
        }

    componentDidMount(){
        this.props.getCharacter(this.props.match.params.id);
    };

    handleEditCharacter(){
        this.setState({ modalOpen: true });
    }

    handleClose = () => {
        this.setState({ modalOpen: false });
        };

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
            })
        }
    }

    renderEditButton(){
        return (
            <Button onClick={() => this.handleEditCharacter()} 
                variant="contained" 
                color="primary" 
                className={this.props.classes.button}>
                edit
                <EditIcon className={this.props.classes.rightIcon} />
            </Button>
            )
    }

    renderModal(){
        return(
        <ModalEditCharacter 
            modalOpen={this.state.modalOpen} 
            onClose={this.handleClose} 
            onSave={this.handleSaveInfo}
            characterName={this.state.characterName}
            characterDescription={this.state.characterDescription}
            />
        )
    }

    renderSeries(){
        if (this.state.isLoading) {
            items = this.renderLoading();
            }

        if (!this.state.isLoading) {
            var items = this.state.listSeries.map((i, index) => (
                <div key={index}>
                    <Grid key={index} item>
                        <CustomCard 
                            subTitle={i.title}
                            characterImage={i.thumbnail.path+'/landscape_medium.jpg'}/>
                    </Grid>
                </div>
            ))
        }

        return items;
    }

    renderLoading(){
        return(
            <div>
                <h1>
                    Loading...
                </h1>
            </div>
        )
    }

    render(){
        const {characterImage, spacing} = this.props.location.state;
        const { classes } = this.props;

        return(
            <div>
                <HeaderBar/>
                <div style={{marginTop:10, display: 'flex', justifyContent: 'center'}}>
                    <img style={{width:350, height:300}} alt='' src={characterImage}/>
                </div>
                <div style={{textAlign:'center'}}>
                    {this.renderEditButton()}
                    <h3>
                        {this.state.characterName}
                    </h3>
                    <p>
                        {this.state.characterDescription}
                    </p>
                </div>
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container justify="center"  spacing={Number(this.state.spacing)}>
                            {this.renderSeries()}
                        </Grid>
                    </Grid>
                </Grid>
                {this.renderModal()}
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