import React from 'react';

import { withStyles, Button, TextField, Modal } from '@material-ui/core';

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 30,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',

        },  
    button: {
        margin: theme.spacing.unit,
        },
});

class ModalEditCharacter extends React.Component {

    constructor (){
        super();
        this.state = {
            modalOpen:false,
            characterName:'',
            characterDescription:''
        }
    }


    handleChangeName(text){
        this.setState({
            characterName:text
        })
    };

    handleChangeDescription(text){
        this.setState({
            characterDescription:text
        })
    };


    render(){
        const {classes, onClose, modalOpen, onSave, characterDescription, characterName} = this.props;


        return(
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={modalOpen}
                onClose={this.handleClose}
                >

                <div style={{flexDirection:'column', display:'flex'}}>
                    <div style={{
                        left:'50%',
                        top:'50%',
                        transform: 'translate(-50%, -50%)'
                        }}       
                        className={classes.paper}>
                        Edit character's info
                        <form>
                        
                        <TextField
                            placeholder="Name Character"
                            label="Name Character"
                            value={this.state.characterName||characterName}
                            onChange={text => this.handleChangeName(text.target.value)}
                            //style={{width: 200}}

                            />
                        <TextField
                            id="standard-multiline-static"
                            multiline
                            rowsMax="4"
                            value={this.state.characterDescription||characterDescription}
                            onChange={text => this.handleChangeDescription(text.target.value)}
                            //style={{width: 200}}
                            //onChange={text => this.handleChangeSearch(text.target.value)
                            placeholder="Description"
                            label="Description"

                            />
                        </form>
                        <Button onClick={() => onSave(
                            this.state.characterName, 
                            this.state.characterDescription)} 
                            variant="contained" 
                            color="secondary" 
                            className={classes.button}>
                        Save
                        </Button>
                        <Button onClick={onClose} variant="contained" color="primary" className={classes.button}>
                        cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }

}

export default withStyles(styles)(ModalEditCharacter)