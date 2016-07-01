import BaseView from './BaseView';

/**
 * Object representing the ClickA element
 *
 * @param el
 * @constructor
 */
class SearchButton extends BaseView {
    constructor(el)
    {
        super(el);
        this.event = new CustomEvent("nameSubmit");

        //Add a click listener to the element.
        this.el.addEventListener('click', (e) => this.clickHandler(e));
    }

    /**
     * @param e
     */
    clickHandler(e)
    {
        e.preventDefault();
        document.dispatchEvent(this.event);
    }
}

export default SearchButton;
