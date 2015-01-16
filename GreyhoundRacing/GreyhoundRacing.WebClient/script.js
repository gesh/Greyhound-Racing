/// <reference path="C:\Users\gesh\Documents\GitHub\Greyhound-Racing\GreyhoundRacing\GreyhoundRacing.WebClient\libs/jquery-2.1.3.min.js" />

(function () {
    jQuery.support.cors = true;
    var responseData;
    var wrapper = $('#wrapper');
    var filter = $('#filter');
    wrapper.on('click', "#load-races", function () {
        
        $.getJSON("http://localhost:2549/api/races")
            .then(function (data) {
                responseData = data;
                showData(responseData);
            })
        .fail(function () { alert('error') });
    })

    filter.on('click', "#sort-asc-by-name", function () {
        if (responseData) {
            $(".entries li").sort(asc_sortByName).appendTo('.entries');
        }
    })

    filter.on('click', "#sort-desc-by-name", function () {
        if (responseData) {
            $(".entries li").sort(dec_sortByName).appendTo('.entries');
        }
    })

    filter.on('click', "#sort-asc-by-odds", function () {
        if (responseData) {
            asc_sortByOdds();
        }
    })

    filter.on('click', "#sort-desc-by-odds", function () {
        if (responseData) {
            desc_sortByOdds();
        }
    })

    // ascending sort by name
    function asc_sortByName(a, b) {
        return ($(b).text()) < ($(a).text()) ? 1 : -1;
    }

    // decending sort by name
    function dec_sortByName(a, b) {
        return ($(b).text()) > ($(a).text()) ? 1 : -1;
    }

    // ascending sort by odds
    function asc_sortByOdds() {
        var dataToSort = responseData[0].Entries;
        var sorted = responseData[0].Entries.sort(function (a, b) {
            return a.Odds - b.Odds;
        });
        showData(responseData);
    }

    // descending sort by odds
    function desc_sortByOdds() {
        var dataToSort = responseData[0].Entries;
        var sorted = responseData[0].Entries.sort(function (a, b) {
            return b.Odds - a.Odds;
        });
        showData(responseData);
    }

    function showData(data) {
        wrapper.text('');
        for (var i = 0; i < data.length; i++) {
            var race = data[i];
            showRace(race);
            showEntries(race);
        }
    }

    function showRace(race) {
        var eventTime = race.EventTime.replace('T', ' ');
        var finishTime = race.FinishTime.replace('T', ' ');
        var raceText = 'Race name: ' + race.Name + ' Distance: ' + race.Distance
               + ' Event number: ' + race.EventNumber + ' Event Time: ' + eventTime
               + ' Finish Time: ' + finishTime
        wrapper.append($("<h3>").text(raceText));
        wrapper.append($("<ul>").addClass("entries"));
    }

    function showEntries(race){
        for (var j = 0; j < race.Entries.length; j++) {
            var entry = race.Entries[j];
            $(".entries").append('<li>' + entry.Name + ' [' + entry.Odds + ']' + '</li>');
        }
    }
}());