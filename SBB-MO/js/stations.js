 
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

        function refresh() {
            if (station) {
                $.get('http://transport.opendata.ch/v1/stationboard?station=Zurich&limit=15&transportations[]=ec_ic&transportations[]=ice_tgv_rj&transportations[]=ir&transportations[]=s_sn_r', {}, function(data) {
                    $('#ulmain li').empty();
                    $(data.stationboard).each(function () {
                        var prognosis, departure, delay, line = '<li><a href="#test"><span class="time">';
                        departure = moment(this.stop.departure);
                        if (this.stop.prognosis.departure) {
                            prognosis = moment(this.stop.prognosis.departure);
                            delay = (prognosis.valueOf() - departure.valueOf()) / 60000;
                            line += departure.format('HH:mm ') + ' <strong>+' + delay + ' min </strong>';
                        } else {
                            line += departure.format('HH:mm ');
                        }
                        line += '</span><span class="zug">'+ this.name + ' </span><span class="destination"> ' + this.to + ' </span></a></li>';
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

        refresh();
    });
  
$(document).ready(function() {

    $('#rightmain')
        .css({"opacity":0})   // Set to 0 as soon as possible – may result in flicker, but it's not hidden for users with no JS (Googlebot for instance!)
        .delay(4000)           // Wait for a bit so the user notices it fade in
        .css({"opacity":1}
        );

        $("#buttonSprache").on("click", function(e){
        $(".sprachauswahl").toggleClass("active") //toggleClass
    });

        $("#zuruck").on("click", function(e){
        $(".sprachauswahl").toggleClass("active") //toggleClass

    });

        $("#to").on("click", function(e){
        $(".tastatur").toggleClass("active") //toggleClass
    });
        $("#zuruck2").on("click", function(e){
        $(".tastatur").toggleClass("active") //toggleClass
    });
           $("#btnsuchen").on("click", function(e){
        $(".leftanimation").toggleClass("hide") //toggleClass
        $(".rightanimation").toggleClass("hide") //toggleClass
    });

          $("#ulmain").each(function(){
            $(this).click(function(e){
                $(".leftanimation").toggleClass("hide") //toggleClass
    $(".rightanimation").toggleClass("hide") //toggleClass
            });
    });
});



