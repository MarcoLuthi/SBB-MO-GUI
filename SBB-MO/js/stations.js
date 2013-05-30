
    $(function () {

        var station = '008503000';

    	function refresh() {
        	if (station) {
        		$.get('http://transport.opendata.ch/v1/stationboard', {id: station, limit: 15}, function(data) {
        		    $('#ulmain li').empty();
        			$(data.stationboard).each(function () {
        			    var prognosis, departure, delay, line = '<li>';
        			    departure = moment(this.stop.departure);
        			    if (this.stop.prognosis.departure) {
        			        prognosis = moment(this.stop.prognosis.departure);
        			        delay = (prognosis.valueOf() - departure.valueOf()) / 60000;
        			        line += departure.format('HH:mm') + ' <strong>+' + delay + ' min </strong>';
        			    } else {
        			        line += departure.format('HH:mm');
        			    }
        			    line += '<span>'+ this.name + ' </span><span> ' + this.to + ' </span></li>';
        			    $('#ulmain').append(line);
        			});
        		}, 'json');
        	}
    	}

        /*$('#station').autocomplete({
            source: function (request, response) {
                $.get('http://transport.opendata.ch/v1/locations', {query: request.term, type: 'station'}, function(data) {
                    response($.map(data.stations, function(station) {
                        return {
                            label: station.name,
                            station: station
                        }
                    }));
                }, 'json');
            },
            select: function (event, ui) {
                station = ui.item.station.id;
                refresh();
            }
        });*/

    	setInterval(refresh, 30000);
    	refresh();
    });