    function startTime()
    {
        var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        // add a zero in front of numbers<10
        m=checkTime(m);
        s=checkTime(s);
        document.getElementById('timedisplay').innerHTML=h+":"+m+":"+s;
        t=setTimeout(function(){startTime()},500);
        }

        function checkTime(i)
            {
                if (i<10)
                    {
                        i="0" + i;
                    }
            return i;
           }

  


    $(function () {

        var station = 'Zürich HB';


//  Changed Syntax to dest. train and time
        function refresh() {
            if (station) {
                $.get('http://transport.opendata.ch/v1/stationboard?station=Zurich&transportations[]=ec_ic&transportations[]=ice_tgv_rj&transportations[]=ir&transportations[]=s_sn_r', {}, function(data) {
                    $('#ulmain li').empty();
                    $(data.stationboard).each(function () {
                        var prognosis, departure, delay, 
                        line = '<li><span class="gleis">3</span> <span class="destination">'+ this.to + ' </span><span class="zug"> ' + this.name + ' </span><span>';
                        line += '<span class="time">';
                        departure = moment(this.stop.departure);
                        if (this.stop.prognosis.departure) {
                            prognosis = moment(this.stop.prognosis.departure);
                            delay = (prognosis.valueOf() - departure.valueOf()) / 60000;
                            line += departure.format('HH:mm ') + ' <strong>+' + delay + ' min </strong></span></li>';
                        } else {
                            line += departure.format('HH:mm </span></li>');
                        }
                        line+=
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

        // setInterval(refresh, 300000);Fuck that
        refresh();
    });