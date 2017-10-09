function displayWikiData(username) {
    return dispatch => {
        return new Promise(function(resolve, reject) {
            let req = new XMLHttpRequest();
            
            
            let api = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=5&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
            let cb = '&callback=JSON_CALLBACK&origin=*';
            let url = api+username+cb;
            req.open("GET", url, true);
            req.onload = function() {
                if (req.status === 200) {
                    resolve(req.response);
                    let filteredResponse = req.response.replace('/**/JSON_CALLBACK(','');
                    let filteredResponsefinal = filteredResponse.replace(/.$/, '');
                    let wikiData = JSON.parse(filteredResponsefinal);
                    if(wikiData.query){
                        let wikiDataWrapper = wikiData.query.pages;
                        dispatch(succFun(wikiDataWrapper))
                    } else {
                        let wikiDataWrapper = wikiData;
                        dispatch(succFunNoData(wikiDataWrapper))
                    }
                } else {
                   let error = req.statusText
                   dispatch(errFun(req.statusText))
                }
            };
            req.send();
        });
    }
}

const succFun = (unameArray) => ({
    type: 'WIKI_SUCCESS',
    payload: {
        unameArray
    }
});

const succFunNoData = (wikiNoData) => ({
    type: 'WIKI_SUCCESS_NO_DATA',
    payload: {
        wikiNoData
    }
});

const errFun = (error) => ({
    type: 'WIKI_ERROR',
    payload: {
        error
    }
});

export default displayWikiData;
