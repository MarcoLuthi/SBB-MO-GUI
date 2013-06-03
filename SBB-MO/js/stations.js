 
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
                $.get('http://transport.opendata.ch/v1/stationboard?station=Zurich&limit=15&transportations[]=ec_ic&transportations[]=ice_tgv_rj&transportations[]=ir&transportations[]=s_sn_r', {}, function(data) {
                    $('#ulmain li').empty();
                    $(data.stationboard).each(function () {

                        var prognosis, departure, delay, 
                        line = '<li destination='+this.to+'><span class="gleis">3</span> <span class="destination">'+ this.to + ' </span><span class="zug"> ' + this.name + ' </span><span>';
                        line += '<span class="time">';

                        departure = moment(this.stop.departure);
                        if (this.stop.prognosis.departure) {
                            prognosis = moment(this.stop.prognosis.departure);
                            delay = (prognosis.valueOf() - departure.valueOf()) / 60000;
                            line += departure.format('HH:mm ') + ' <strong>+' + delay + ' min </strong></span></li>';
                        } else {
                            line += departure.format('HH:mm </span></li>');
                        }


                        $('#ulmain').append(line);
                    });

                        $("#ulmain").each(function(){
                        $(this).click(function(e){
                        
                        var destination=$(e.target).attr("destination");
                        var currentElement=$(e.target);
                        while(destination==undefined){
                            currentElement=currentElement.parent()
                            destination=currentElement.attr("destination");

                            if(currentElement.id=="ulmain"){
                                break;

                                
                            }

                        }

                        alert(destination);

                        $(".leftanimation").toggleClass("hide") //toggleClass
                        $(".rightanimation").toggleClass("hide") //toggleClass
                        $(".fadein").toggleClass("active")
                        $(".downdetailanimation").toggleClass("active")
                        $(".leftdetailanimation").toggleClass("active")
                        $(".rightdetailanimation").toggleClass("active")
                    });
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

// <<<<<<< HEAD
//         // setInterval(refresh, 300000);Fuck that
// =======
// >>>>>>> c066cf8212d961eca49e46143d1974ac1bc63b5f
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
        $(".fadein").toggleClass("active") //toggleClass
        $(".leftdetailanimation").toggleClass("active")
        $(".rightdetailanimation").toggleClass("active")
        $(".downdetailanimation").toggleClass("active")
    });

});



