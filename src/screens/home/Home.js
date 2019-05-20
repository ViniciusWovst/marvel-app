import React from 'react';

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//actions
import {getCharacters} from './redux';

//components
import CustomCard from '../../components/CustomCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { withStyles, Grid } from '@material-ui/core';
import SearchBar from '../../components/searchBar';
import {NavLink} from "react-router-dom";

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop:30
    },

    card: {
        maxWidth: 345,
        },
    });

class Home extends React.Component {

    constructor(){
        super();
        this.state = {
            hasMore:true,
            total:0,
            listCharacters:[],
            isLoading:false,
            spacing:40,
            nameStartsWith:null
            };
        }

    fetchMoreData = () => {
        if ((this.state.listCharacters.length > 0)&&(this.state.listCharacters.length >= this.state.total)){
            this.setState({
                hasMore: false
            })
            return
        }
        this.props.getCharacters(this.state.listCharacters.length, this.state.nameStartsWith)
    }

    searchCharacters = (text) => { 
        var nameStartsWith = null;

        if (text.trim().length > 0)  {
            nameStartsWith = text;
        }
        
        this.setState({
            nameStartsWith:nameStartsWith,
            listCharacters:[],
            hasMore:true
        });

        this.fetchMoreData();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.listCharactersReducer != null && !nextProps.isLoadingReducer) {
            this.setState({
                listCharacters:this.state.listCharacters.concat(nextProps.listCharactersReducer),
                total:nextProps.totalReducer,
                hasMore: true
            })
        }
    }

    componentDidMount(){
        this.props.getCharacters();
    }

    renderCharacters(){
        if (!this.state.isLoading) {
            var items = this.state.listCharacters.map((i, index) => (
                <div key={index}>
                    <NavLink 
                        to={{
                            pathname:`/heroPage/${i.id}`,
                            state:{
                                characterImage:i.thumbnail.path+'/landscape_medium.jpg',
                                characterDescription:i.description,
                                characterName:i.name
                            }
                        }}>  

                        <Grid key={index} item>
                            <CustomCard 
                                characterName={i.name} 
                                characterDescription={i.description}
                                characterImage={i.thumbnail.path+'/landscape_medium.jpg'}/>
                        </Grid>
                    </NavLink>
                </div>
            ))
        }
        return items
    }

    render(){
        const { classes } = this.props;
        const { spacing } = this.state;

        return(
            <div>
                <SearchBar fetchSearchCharacter={this.searchCharacters}/>
                <InfiniteScroll 
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                    dataLength={this.state.listCharacters.length}>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid item xs={12}>
                            <Grid container justify="center"  spacing={Number(spacing)}>
                                {this.renderCharacters()}
                            </Grid>
                        </Grid>
                    </Grid>
                </InfiniteScroll>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listCharactersReducer: state.characters.listCharacters,
        isLoadingReducer:state.characters.isLoading,
        totalReducer:state.characters.total
        
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getCharacters
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));