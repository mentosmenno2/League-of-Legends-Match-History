import {Collection} from 'backbone';
import Match from '../models/Match';

/**
 * Collection for the matches endpoint
 *
 * @constructor
 */
const Matches = Collection.extend({
    model: Match,
    url: 'https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/'+ $("#searchBox").val() +'?api_key=04011e5e-7d14-4b33-ad24-c3f6655a72f5'
});

export default Matches;