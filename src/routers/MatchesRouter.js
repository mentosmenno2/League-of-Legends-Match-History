import {Router} from 'backbone';

/**
 * Router for the matches URL's
 *
 * @constructor
 */
const MatchesRouter = Router.extend({
    routes: {
        'matches/:user': 'matchesAction'
    },

    /**
     * Route callback, used to trigger global event
     *
     * @param league
     */
    matchesAction: function (user)
    {
        App.events.trigger('searchUser', {
            user: user
        });
    }
});

export default MatchesRouter;
