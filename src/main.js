import _ from 'underscore';
import {Events} from 'backbone';
import SearchButton from './views/SearchButton'
import PersonMatches from './views/PersonMatches'

(function ()
{
    /**
     * Run after dom is ready
     */
    let init = function ()
    {
        new SearchButton(document.getElementById("searchButton"));
        new PersonMatches(document.getElementById("matchesContainer"));
    };

    window.addEventListener('load', init);
})();
