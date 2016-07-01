import BaseView from './BaseView';
import {View} from 'backbone';
import _ from 'underscore';

/**
 * Object representing the BoxBlock element
 *
 * @param el
 * @constructor
 */
const API_KEY = "04011e5e-7d14-4b33-ad24-c3f6655a72f5";

class PersonMatches extends BaseView {

    constructor(el)
    {
        super(el);
        this.templateMatches = _.template($('#template-matches').html());
        this.templateError = _.template($('#template-error').html());
        //Add event listener to the Dom. If a boxchange event is triggered fire changeColor
        document.addEventListener("nameSubmit", () => this.getUser(this));
    };

    getUser(instance) {
        $("#matchesContainer").empty();
        $("#matchesContainer").text('Loading... please wait. This can take a while. It is possible your browser freezes for a few seconds.')
        let userName = $("#searchBox").val().trim();
        $.getJSON( "https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/"+ encodeURIComponent(userName) +"?api_key=" + API_KEY, function() {
            console.log( "request started" );
        })
        .done(function(data) {
            console.log( "success" );
            if (!data["status"]) {
                console.log(data[userName]);
                console.log(data[userName].id);
                instance.getMatches(data[userName].id, instance);
            }
            else {
                alert(data["status"].message);
            }
        })
        .fail(function() {
            alert("Not Found");
            console.log("Error; Not Found");
        })
    };

    getMatches(id, instance) {
        let date = new Date();
        date.setMonth(date.getMonth() - 1);
        let millis = date.getTime();
        $.getJSON( "https://euw.api.pvp.net/api/lol/euw/v1.3/game/by-summoner/" + id + "/recent?api_key=" + API_KEY, function() {
            console.log( "request started" );
        })
        .done(function(data) {
            console.log( "success" );
            if (!data["status"]) {
                console.log(data["games"]);
                $("#matchesContainer").empty();
                $.each(data["games"], function(index, value) {
                    if (index < 10) {
                        instance.displayMatch(value, instance);
                    };
                });
            }
            else {
                alert("Match data " + data["status"].message);
            }
        })
        .fail(function() {
            alert("Retreiving data failed");
        })
    };

    displayMatch(match, instance) {
        instance.getChampionImage(match.championId);

        let champImageSrc = instance.getChampionImage(match.championId);
        let spell1ImageSrc = instance.getSpellImage(match.spell1);
        let spell2ImageSrc = instance.getSpellImage(match.spell2);
        let timeString = new Date(match.createDate);

        let winOrLose = "";
        if (match["stats"].win) {
            winOrLose = " green";
        }
        else {
            winOrLose = " red";
        }

        let matchContainer = " \
        <a class='matchContainerLink' href='#'> \
            <div class='matchContainer " + winOrLose + "'> \
                <img class='matchChampImg' src='" + champImageSrc + "' /> \
                <div class='matchSpells'> \
                    <img class='matchSpellpellImg' src='" + spell1ImageSrc + "' /> \
                    <img class='matchSpellpellImg' src='" + spell2ImageSrc + "' /> \
                </div> \
                <div class='matchDate'>" + timeString.toLocaleDateString() + "</div> \
            </div> \
        </a>"
        $("#matchesContainer").append(matchContainer);
    };

    getChampionImage(id) {
        let imageSrc = "";
        var data= $.ajax({ 
            url: "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion/" + id + "?champData=image&api_key=" + API_KEY, 
            async: false
        }).responseText;

        var dataDecoded = $.parseJSON(data);

        if (!dataDecoded["status"]) {
            imageSrc = "http://ddragon.leagueoflegends.com/cdn/6.13.1/img/champion/" + dataDecoded["image"].full;
        }

        console.log(imageSrc);
        return imageSrc;
    }

    getSpellImage(id) {
        let imageSrc = "";
        var data= $.ajax({ 
            url: "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/summoner-spell/" + id + "?spellData=image&api_key=" + API_KEY, 
            async: false
        }).responseText;

        var dataDecoded = $.parseJSON(data);

        if (!dataDecoded["status"]) {
            imageSrc = "http://ddragon.leagueoflegends.com/cdn/6.13.1/img/spell/" + dataDecoded["image"].full;
        }

        console.log(imageSrc);
        return imageSrc;
    }
}

export default PersonMatches;
