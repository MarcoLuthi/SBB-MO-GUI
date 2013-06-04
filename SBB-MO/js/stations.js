 
    var fromhere;
    var tohere;
    var price;

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

                        
                        $('#tohere2').val(destination);
                        $('#fromhere2').val('Zürich HB');
                        $('#via').val("Olten - Bern");
                        var price= 38 + ".00 CHF";
                        $('#price').text(price);
                        $('#update').text("Zürich HB - "+ destination);

                        
                        $(".tabs").addClass("active")
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





        $("#buttonSprache").on("click", function(e){
        $(".sprachauswahl").toggleClass("active") //toggleClass
    });

        $("#zuruck").on("click", function(e){
        $(".sprachauswahl").toggleClass("active") //toggleClass

    });

        $("#fromhere").on("click", function(e){

        $('#fromhere').val("");
    });

        $("#tohere").on("click", function(e){
        $(".tastatur").toggleClass("active") //toggleClass
        $('#tohere').val("");
    });



        $("#tab1").on("click", function(e){

        $(".tabs").addClass("active")
        $(".tabs2").removeClass("active")
        $(".tabs3").removeClass("active")
        $(".leftdetailanimation").addClass("active")
        $(".leftdetailanimation2").removeClass("active")
        $(".leftdetailanimation3").removeClass("active")


    });

        $("#tab2").on("click", function(e){
        $(".tabs").removeClass("active")
        $(".tabs2").addClass("active")
        $(".tabs3").removeClass("active")
        $(".leftdetailanimation").removeClass("active")
        $(".leftdetailanimation2").addClass("active")
        $(".leftdetailanimation3").removeClass("active")

    });


        $("#tab3").on("click", function(e){
        $(".tabs").removeClass("active")
        $(".tabs2").removeClass("active")
        $(".tabs3").addClass("active")

        $(".leftdetailanimation").removeClass("active")
        $(".leftdetailanimation2").removeClass("active")
        $(".leftdetailanimation3").addClass("active")


    });


        $("#express").on("click", function(e){
                        var price= 38.00 + ".00 CHF";
                        $('#price').text(price);
                        $('#via').val("Olten - Bern");
                        $('#viainfo').text("Olten - Bern");

    });

         $("#tourismo").on("click", function(e){
                        var price= 35 + ".00 CHF";
                        $('#price').text(price);
                        $('#via').val("Zermatt");
                        $('#viainfo').text("Zermatt");
    });


    $("#spar").on("click", function(e){
                        var price= 22.00 + ".00 CHF";
                        $('#price').text(price);
                        $('#via').val("Aarau");
                        $('#viainfo').text("Aarau");
    });





        $("#btnabbrechen").on("click", function(e){
        $(".leftanimation").toggleClass("hide") //toggleClass
        $(".rightanimation").toggleClass("hide") //toggleClass
        $(".fadein").toggleClass("active") //toggleClass
        $(".leftdetailanimation").removeClass("active")
        $(".leftdetailanimation2").removeClass("active")
        $(".leftdetailanimation3").removeClass("active")
        $(".rightdetailanimation").toggleClass("active")
        $(".downdetailanimation").toggleClass("active")
        $(".tabs").removeClass("active")
        $(".tabs2").removeClass("active")
        $(".tabs3").removeClass("active")
    });



        $("#zuruck2").on("click", function(e){
        $(".tastatur").toggleClass("active") //toggleClass
    });
           $("#btnsuchen").on("click", function(e){

            var fromhere = $("#fromhere").val();
            var tohere=$("#tohere").val();
            $('#via').val("Olten - Bern");

            $("#fromhere2").val(fromhere);
            $("#tohere2").val(tohere);
            $('#price').text(price);
            $('#update').text(fromhere +" - "+tohere);

            var price= 22.00 + " CHF";
            $('#price').text(price);

        $(".leftanimation").toggleClass("hide") //toggleClass
        $(".rightanimation").toggleClass("hide") //toggleClass
        $(".fadein").toggleClass("active") //toggleClass
        $(".leftdetailanimation").toggleClass("active")
        $(".rightdetailanimation").toggleClass("active")
        $(".downdetailanimation").toggleClass("active")
        $(".tabs").addClass("active")



    });

   
        $("#tohere").keyup(function () {
        var value = $(this).val();
        $("p").text(value);
        }).keyup();


        
    });


      





