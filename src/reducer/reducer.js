const Immutable = require('immutable')
const INITIAL_STATE = Immutable.fromJS({});

function reducer(state=INITIAL_STATE, action){
    switch(action.type){
        case 'WIKI_SUCCESS': return state.merge({
                repoName : action.payload,
                error: '',
                wikiNoData: ''
            });
        case 'WIKI_ERROR' : return state.merge({
                error : action.payload,
                wikiNoData: '',
                repoName:''
            });
        case 'WIKI_SUCCESS_NO_DATA' : return state.merge({
                wikiNoData : action.payload,
                error: '',
                repoName:''
            });
        default: return state;
    }
}

export default reducer;
