import React from 'react';
import TypeEffect from '../common/TypeEffect/TypeEffect';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Button } from 'common-ui';
import useStyles from './SearchBar.style';
import clsx from 'clsx';

import { Subject } from 'rxjs'
import { debounceTime, flatMap, map } from 'rxjs/operators';

class SearchBar extends React.Component {
    suggestionsKey = "Harel_SearchSuggestions";

    constructor(props) {
        super(props);

        this.state = {
            searchStringId: '',
            searchString: '',
            typingSuggestions: JSON.parse(localStorage.getItem(this.suggestionsKey)) || [],
            focus: false,
            searchSuggestions: null,
            keyboardSelect: -1,
        }

        this.searchBoxRef = React.createRef();
        this.typingRef = React.createRef();

        this.keyPress = this.keyPress.bind(this);
        this.searchIt = this.searchIt.bind(this);
        this.searchBoxClick = this.searchBoxClick.bind(this);
        this.searchBlur = this.searchBlur.bind(this);
        this.searchTextChange = this.searchTextChange.bind(this);
        this.getTypingSuggestions = this.getTypingSuggestions.bind(this);
        this.suggestionClick = this.suggestionClick.bind(this);
        this.searchBlurBtn=this.searchBlurBtn.bind(this);
    }
    componentDidMount() {
        this.searchStringSubject = new Subject();

        this.suggestionsSubscription = this.searchStringSubject.pipe(
            debounceTime(500),
            map(str => encodeURIComponent(str)),
            flatMap(str => axios.get(`${process.env.REACT_APP_BASE_URL}/_vti_bin/webapi/SearchSuggestions?SearchText=${str}`)),
            map(res => res.data)
        ).subscribe(sug => this.setState({ searchSuggestions: sug }));

        this.getTypingSuggestions();
    }
    componentWillUnmount() {
        this.suggestionsSubscription.unsubscribe();
    }
    getTypingSuggestions() {
        //get list הצעות מוקדלדות and field Title
        const url = `${process.env.REACT_APP_BASE_URL}/_vti_bin/webapi/GeneralAccessor?id=SearchTypingSuggestions&cacheKey=SearchTypingSuggestions`;

        axios.get(url)
            .then(res => {
                //Get only the title values
                if (Array.isArray(res.data)) {
                    let suggestions = res.data.map(i => i.Title);

                    localStorage.setItem(this.suggestionsKey, JSON.stringify(suggestions));
                    this.setState({
                        typingSuggestions: suggestions
                    });
                }
            })
            .catch(error => console.log(error));
    }
    keyPress(e) {
        let suggestionsNum = 0;
        let pSuggestionsNum = 0;
        if (this.state.searchSuggestions) {
            if (this.state.searchSuggestions.Suggestions)
                suggestionsNum = this.state.searchSuggestions.Suggestions.length;

            if (this.state.searchSuggestions.PersonalSuggestions)
                pSuggestionsNum = this.state.searchSuggestions.PersonalSuggestions.length;
        }

        if (e.keyCode === 13) {
            this.searchIt(e);
        }
        else if (e.keyCode === 38) {
            e.preventDefault();
            let select = (this.state.keyboardSelect ? this.state.keyboardSelect : suggestionsNum + pSuggestionsNum) - 1;
            let str = select < suggestionsNum ? this.state.searchSuggestions.Suggestions[select].ExpressionOrg : this.state.searchSuggestions.PersonalSuggestions[select - suggestionsNum].ExpressionOrg;
            this.setState({ keyboardSelect: select, searchString: str });
        }
        else if (e.keyCode === 40) {
            e.preventDefault();
            let select = (this.state.keyboardSelect + 1) % (suggestionsNum + pSuggestionsNum);
            let str = select < suggestionsNum ? this.state.searchSuggestions.Suggestions[select].ExpressionOrg : this.state.searchSuggestions.PersonalSuggestions[select - suggestionsNum].ExpressionOrg;
            this.setState({ keyboardSelect: select, searchString: str });
        }
    }

    searchIt(e) {
   
        let searchString = this.state.searchString;
        if (!searchString && this.typingRef.current && this.typingRef.current.offsetWidth > 3)
            searchString = this.typingRef.current.innerText;
        if (searchString) {
            this.setState({ searchString: searchString });

            e.preventDefault();
            window.location.href = `/Search/Pages/SearchResultPage.aspx?k=${searchString}&as=NotSuggestion&referrer=${window.location.protocol}//${window.location.host}${window.location.pathname}`
        }
        else {
            e.preventDefault();
            this.setState({ focus: true });
            this.searchBoxRef.current.focus();
        }
    }
    searchBoxClick() {
        this.setState({ focus: true });
        this.searchBoxRef.current.focus();
    }
    searchBlur(e) {
        if (this.state.focus) {
            this.setState({ focus: false });
        }      
    }
   
    searchBlurBtn(e) {
        if(e.keyCode == 9){
        if (this.state.focus) {
            this.setState({ focus: false });
        }
        if(document.querySelector('[aria-label="סגירת חלונית חיפוש"]')){
            setTimeout(() => {
                document.querySelector('[aria-label="סגירת חלונית חיפוש"]').focus();
        }, 100);   
    } 
       } 
    }
    searchTextChange(event) {
        if(document.querySelector('[aria-labelledby="what exemples"]'))
            document.querySelector('[aria-labelledby="what exemples"]').setAttribute("aria-labelledby","what");
        this.setState({ searchString: event.target.value });
        this.searchStringSubject.next(event.target.value);
    }
    suggestionClick(str,id) {

        this.setState({ searchString: str, focus: true, searchSuggestions: null});
        this.searchBoxRef.current.focus();
    }
    renderSearchSuggestions(classes) {
        if (this.state.focus && this.state.searchSuggestions) {
            let general = null;
            let sugNum = 0;
            if (this.state.searchSuggestions.Suggestions && this.state.searchSuggestions.Suggestions.length > 0) {
                sugNum = this.state.searchSuggestions.Suggestions.length;
                // /Search/Pages/SearchResultPage.aspx?k=ביטוח%20בריאות%20פרטי&as=General&referrer=
                let genItems = this.state.searchSuggestions.Suggestions.map((item, i) => (
                    <li key={item.DocId} onClick={() => this.suggestionClick(item.ExpressionOrg,i+"gen")}  role="option" aria-selected="false" id={item.Expression}>
                        <a dangerouslySetInnerHTML={{ __html: item.Expression }}
                            className={this.state.keyboardSelect === i ? "keyboardSelect" : null}
                            tabIndex="-1" href={`/Search/Pages/SearchResultPage.aspx?k=${item.ExpressionOrg}&as=General&referrer=${window.location.protocol}//${window.location.host}${window.location.pathname}`}></a>
                    </li>)
                );
                general = (
                    <React.Fragment>
                        {this.props.suggestionsTitle ? <span>{this.props.suggestionsTitle}</span> : null}
                        <ul>
                            {genItems}
                        </ul>
                    </React.Fragment>
                );
            }

            let forYou = null;
            if (this.state.searchSuggestions.PersonalSuggestions && this.state.searchSuggestions.PersonalSuggestions.length > 0) {
                let forYouItems = this.state.searchSuggestions.PersonalSuggestions.map((item, i) => (
                    <li key={item.ExpressionOrg} onClick={() => this.suggestionClick(item.ExpressionOrg,i+"you")} role="option" aria-selected="false" id={item.Expression}>
                        <a dangerouslySetInnerHTML={{ __html: item.Expression }}
                            className={this.state.keyboardSelect - sugNum === i ? "keyboardSelect" : null}
                           tabIndex="-1" href={`/Search/Pages/SearchResultPage.aspx?k=${item.ExpressionOrg}&as=Personalized&referrer=${window.location.protocol}//${window.location.host}${window.location.pathname}`}></a>
                    </li>));
                forYou = (
                    <React.Fragment >
                        <hr />
                        
                        {this.props.personalSuggestionsTitle ? <span>{this.props.personalSuggestionsTitle}</span> : null}
                        <ul>
                            {forYouItems}
                        </ul>
                    </React.Fragment>
                );
            }

            if (general || forYou) {
                return (
                    <div className={classes.suggestions} role="listbox">   
                        {general}                                             
                        {forYou}
                      
                    </div>
                );
            }
            else
                return null;
        }
        else
            return null;
    }
    render() {
        const classes = this.props.classes;

        let typing = '';
        if (!this.state.focus && !this.state.searchString && this.state.typingSuggestions && this.state.typingSuggestions.length > 0)
            typing = (
                <TypeEffect ref={this.typingRef} strings={this.state.typingSuggestions} className={classes.typing} />
            );

        let suggest = this.renderSearchSuggestions(classes);
        return (
           
            <ClickAwayListener onClickAway={this.searchBlur} >
                <div className={classes.root} >
                    <div className={clsx(classes.control, suggest ? classes.controlPop : null)}>
                        <div  onfocus={this.searchBoxClick} onClick={this.searchBoxClick} className={classes.textArea}>
                            {typing}
                            <input
                                onFocus={this.searchBoxClick}
                                id="searchBox"
                                ref={this.searchBoxRef}
                                className={classes.textField}
                                margin="none"
                                variant="outlined"
                                value={this.state.searchString}
                                aria-activedescendant={this.state.searchString}
                                placeholder={this.state.focus || !this.state.typingSuggestions || this.state.typingSuggestions.length === 0 ? this.props.placeholder : ''}
                                onChange={this.searchTextChange}
                                onKeyDown={this.keyPress}
                                autoComplete="off"
                                data-hrl-bo="atm-searchBar"
                                inputProps={{role: 'combobox', 'aria-autocomplete': 'list','aria-expanded':suggest!=null?true:false,'aria-activedescendant':this.state.searchString, 'aria-labelledby': 'what exemples'}}
                                aria-autocomplete="list"
                                aria-labelledby="what exemples"
                                //aria-expanded={suggest!=null?true:false}
                            />
                        </div> 
                        <span id="what" className={classes.srOnlyText}>מה תרצה לחפש?</span>
                        <span id="exemples"  className={classes.srOnlyText}>
                                              לדוגמא:
                                             {this.state.typingSuggestions}
                        </span>
                     
                        
                    </div>
                      {suggest}
                      <Button variant='contained' color='secondary' onClick={this.searchIt} onKeyDown={this.searchBlurBtn}  className={classes.button} aria-haspopup='dialog' aria-label='חיפוש' data-hrl-bo="atm-buttonSearchBar">
                            {this.props.searchContent || 'חפש'}
                        </Button>
                </div>
            </ClickAwayListener>
           
        );
    }
}

export default useStyles(SearchBar);