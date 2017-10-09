import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import displayWikiData from './../action/action';
import {bindActionCreators} from 'redux';

class WikiDataComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            wikiSearch : '',
            flag: true,
            data: ''
        }
        this.getWikiSearchData = this.getWikiSearchData.bind(this);
        this.getWikiSearchInput = this.getWikiSearchInput.bind(this);
        this.disableButton = this.disableButton.bind(this);
    }

    getWikiSearchData(){
        this.props.displayWikiData(this.state.wikiSearch);
    }

    getWikiSearchInput(event){
        this.setState({
            wikiSearch: event.target.value
        })
    }

    disableButton(){
        if(this.state.wikiSearch.length > 0){
            this.setState({
                flag: false
            })
        }else{
            this.setState({
                flag: true
            })
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps
        })
    }

    render(){
        var responseData = " ";
        if(this.state.data.successData){
            var temp = this.props.successData.getIn(['unameArray']);
            if(temp.size > 0){
                responseData = temp.map((repo) => {
                    if(repo.getIn(['pageid'])){
                        var url = 'https://en.wikipedia.org/?curid='+repo.getIn(['pageid']);
                        return <div key={repo} className='data-wrapper'>
                                <a target='_blank' href={url}>
                                    <h3>{repo.getIn(['title'])}</h3>
                                    <p>{repo.getIn(['extract'])}</p>
                                </a>
                            </div>
                        }
                    })
            } 
        } else if (this.state.data.errorData){
            responseData = <div>not foundd</div>
        }else if (this.state.data.wikiNoData){
            responseData = <div>Please enter valid search string wiki do not have related data</div>
        }

        return(
            <div> 
                <h1>Enter string for wiki search</h1>
                <input type="text" maxLength="20" value={this.state.wikiSearch} onChange={this.getWikiSearchInput} onKeyUp={this.disableButton}/>
                <button disabled={this.state.flag} onClick={this.getWikiSearchData}>get wiki</button>
                <div>
                    {responseData}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        successData: state.getIn(['repoName']),
        errorData: state.getIn(['error']),
        wikiNoData: state.getIn(['wikiNoData'])
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({displayWikiData: displayWikiData}, dispatch)
}

export default connect(mapStateToProps,matchDispatchToProps)(WikiDataComponent);