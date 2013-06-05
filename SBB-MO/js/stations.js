
 
    var fromhere;
    var tohere;
    var price=38;
    var gleis;
    var gleisinfo;
    var klasse;
    var weg;
    var startingprice;
    var classp=1;
    var half;
    var fullcount=1;
    var halfcount=0;
    var a=38;
    var b=35;
    var c=22;
    var charge=0;
    var now;



function getDate()
{

}

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
                        var gleis = random = Math.ceil(Math.random() * 18);
                        var gleisinfo;

                        var prognosis, departure, delay, 
                        line = '<li destination='+this.to+' gleis='+gleis+' ><span class="gleis">'+gleis+'</span> <span class="destination">'+ this.to + ' </span><span class="zug"> ' + this.name + ' </span><span>';
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

                        var gleisinfo=$(e.target).attr("gleis");

                        
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


                        var gleis=random = Math.ceil(Math.random() * 18);
                        
                        var weg="Nur Hinweg"
                        var klasse="2. Klasse"
                        $('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
                        $('#weg').text(weg);
                        $('#price').text(price + ".00 CHF");
                        
                        $('#gleisa').text(gleis);
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

    $("#ulmain").on("click", function(e){

        now = moment().format('L');
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
        startingprice=price;
        klasse=1;
        half=0;
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

        $("#2klasse").on("click", function(e){
            classp=1;    
            klasse="2. Klasse"
            
            $('#price').text(price*classp +half+ charge+ ".00 CHF");
            $('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");




    });

        $("#1klasse").on("click", function(e){
            classp=2;               
            klasse="1. Klasse"
            $('#price').text(price*classp +half+ charge+ ".00 CHF");
            $('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");




    });

        $("#hin").on("click", function(e){
             charge=0;           
            weg="Nur Hinweg"
            $('#weg').text(weg);
            $('#price').text(price*classp +half+ charge+ ".00 CHF");




    });

        $("#back").on("click", function(e){
             charge=5;           
            weg="Hin- und Rückweg"
            $('#weg').text(weg);
            $('#price').text(price +classp+half+ charge+ ".00 CHF");




    });

        $("#zero0").on("click", function(e){
            halfcount=0;
            $('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                half=a*classp*0;
                $('#price').text(price +half+ charge+ ".00 CHF");
            }
            else if (startingprice==35) {
                half=b*classp*0;
                $('#price').text(price + half+ charge+ ".00 CHF");

            }
            else if (startingprice==22) {
                half=c*classp*0;
                $('#price').text(price +half+ charge+".00 CHF");

            }
    });
        $("#one1").on("click", function(e){
            halfcount=1;
            $('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                half=a+charge*classp*0.5;
                $('#price').text(price +half+ charge+".00 CHF");
            }
            else if (startingprice==35) {
                half=b+charge*classp*0.5;
                $('#price').text(price + half+ charge+".00 CHF");

            }
            else if (startingprice==22) {
                half=c+charge*classp*0.5;
                $('#price').text(price +half+ charge+".00 CHF");

            }
    });


$("#two2").on("click", function(e){
            halfcount=2;
            $('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                half=a*2*classp*0.5;
                $('#price').text(price +half+ charge+".00 CHF");
            }
            else if (startingprice==35) {
                half=b*2*classp*0.5;
                $('#price').text(price +half+charge+ ".00 CHF");

            }
            else if (startingprice==22) {
                half=c*2*classp*0.5;
                $('#price').text(price +half+charge+ ".00 CHF");

            }
    });

$("#three3").on("click", function(e){
halfcount=3;
$('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                half=a*3*classp*0.5;
                $('#price').text(price +half+charge+ ".00 CHF");
            }
            else if (startingprice==35) {
                half=b*3*classp*0.5;
                $('#price').text(price +half+ charge+".00 CHF");

            }
            else if (startingprice==22) {
                half=c*3*classp*0.5;
                $('#price').text(price +half+charge+".00 CHF");

            }
    });

$("#four4").on("click", function(e){
halfcount=4;
$('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                half=a*4*classp*0.5;
                $('#price').text(price + half+charge+".00 CHF");
            }
            else if (startingprice==35) {
                half=b*4*classp*0.5;
                $('#price').text(price + half+charge+".00 CHF");

            }
            else if (startingprice==22) {
                half=c*4*classp*0.5;
                $('#price').text(price +half+charge+ ".00 CHF");

            }
    });

$("#five5").on("click", function(e){
halfcount=5;
$('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                half=a*5*classp*0.5;
                $('#price').text(price +half+ charge+".00 CHF");
            }
            else if (startingprice==35) {
                half=b*5*classp*0.5;
                $('#price').text(price +half+charge+ ".00 CHF");

            }
            else if (startingprice==22) {
                half=c*5*classp*0.5;
                $('#price').text(price +half+ charge+".00 CHF");

            }
    });

$("#six6").on("click", function(e){
halfcount=6;
$('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                half=a*6*classp*0.5;
                $('#price').text(price +half+charge+ ".00 CHF");
            }
            else if (startingprice==35) {
                half=b*6*classp*0.5;
                $('#price').text(price +half+ charge+".00 CHF");

            }
            else if (startingprice==22) {
                half=c*6*classp*0.5;
                $('#price').text(price +half+ charge+".00 CHF");

            }
    });


// THIS IS CRAZY AS BUTTONS
       $("#zero").on("click", function(e){
fullcount=0;
$('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                price=a*classp*0;
                $('#price').text(price +half+ charge+".00 CHF");
            }
            else if (startingprice==35) {
                price=b*classp*0;
                $('#price').text(price + half+charge+".00 CHF");

            }
            else if (startingprice==22) {
                price=c*classp*0;
                $('#price').text(price +half+charge+ ".00 CHF");

            }
    });


        $("#one").on("click", function(e){
fullcount=1;
$('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                price=a*classp;
                $('#price').text(price +half+charge+ ".00 CHF");
            }
            else if (startingprice==35) {
                price=b*classp;
                $('#price').text(price + half+charge+".00 CHF");

            }
            else if (startingprice==22) {
                price=c*classp;
                $('#price').text(price +half+ charge+".00 CHF");

            }
    });



$("#two").on("click", function(e){
fullcount=2;
$('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                price=a*2*classp;
                $('#price').text(price +half+ charge+".00 CHF");
            }
            else if (startingprice==35) {
                price=b*2*classp;
                $('#price').text(price +half+ charge+".00 CHF");

            }
            else if (startingprice==22) {
                price=c*2*classp;
                $('#price').text(price +half+ charge+".00 CHF");

            }
    });

$("#three").on("click", function(e){
fullcount=3;
$('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                price=a*3*classp;
                $('#price').text(price +half+charge+ ".00 CHF");
            }
            else if (startingprice==35) {
                price=b*3*classp;
                $('#price').text(price +half+charge+ ".00 CHF");

            }
            else if (startingprice==22) {
                price=c*3*classp;
                $('#price').text(price +half+charge+".00 CHF");

            }
    });

$("#four").on("click", function(e){
fullcount=4;
$('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                price=a*4*classp;
                $('#price').text(price + half+charge+".00 CHF");
            }
            else if (startingprice==35) {
                price=b*4*classp;
                $('#price').text(price + half+charge+".00 CHF");

            }
            else if (startingprice==22) {
                price=c*4*classp;
                $('#price').text(price +half+ charge+".00 CHF");

            }
    });

$("#five").on("click", function(e){
fullcount=5;
$('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                price=a*5*classp;
                $('#price').text(price +half+ charge+".00 CHF");
            }
            else if (startingprice==35) {
                price=b*5*classp;
                $('#price').text(price +half+charge+ ".00 CHF");

            }
            else if (startingprice==22) {
                price=c*5*classp;
                $('#price').text(price +half+charge+ ".00 CHF");

            }
    });

$("#six").on("click", function(e){
fullcount=6;
$('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
            if (startingprice==38) {
                price=a*6*classp;
                $('#price').text(price +half+charge+ ".00 CHF");
            }
            else if (startingprice==35) {
                price=b*6*classp;
                $('#price').text(price +half+ charge+".00 CHF");

            }
            else if (startingprice==22) {
                price=c*6*classp;
                $('#price').text(price +half+ charge+".00 CHF");

            }
    });







        $("#express").on("click", function(e){
                        price= 38.00;
                        $('#price').text(price + ".00 CHF");
                        $('#via').val("Olten - Bern");
                        $('#viainfo').text("Olten - Bern");

    });

         $("#tourismo").on("click", function(e){
                        price= 35;
                        $('#price').text(price + ".00 CHF");
                        $('#via').val("Zermatt");
                        $('#viainfo').text("Zermatt");
    });


    $("#spar").on("click", function(e){
                        price= 22.00;
                        $('#price').text(price + ".00 CHF");
                        $('#via').val("Aarau");
                        $('#viainfo').text("Aarau");
    });





        $("#btnabbrechen").on("click", function(e){


        $(".fadein").toggleClass("active") //toggleClass
        $(".leftdetailanimation").removeClass("active")
        $(".leftdetailanimation2").removeClass("active")
        $(".leftdetailanimation3").removeClass("active")
        $(".rightdetailanimation").toggleClass("active")
        $(".downdetailanimation").toggleClass("active")
        $(".tabs").removeClass("active")
        $(".tabs2").removeClass("active")
        $(".tabs3").removeClass("active")
        setTimeout(function(){    
        $(".leftanimation").toggleClass("hide") //toggleClass
        $(".rightanimation").toggleClass("hide") //toggleClass
           }, 800);

    });



        $("#zuruck2").on("click", function(e){
        $(".tastatur").toggleClass("active") //toggleClass
    });
           $("#btnsuchen").on("click", function(e){
            
            fromhere = $("#fromhere").val();
             tohere=$("#tohere").val();
            $('#via').val("Olten - Bern");
          now = moment().format('L');
            $('#date').text(now);

             klasse="2. Klasse"
            $('#klasseinfo').text(klasse+" - "+fullcount+"x ganze - "+halfcount+"x halbe");
             weg="Nur Hinweg"
            $('#weg').text(weg);

            $("#fromhere2").val(fromhere);
            $("#tohere2").val(tohere);
            $('#price').text(price);
            $('#update').text(fromhere +" - "+tohere);

             price= 38.00;
            $('#price').text(price + ".00 CHF");

        $(".leftanimation").toggleClass("hide") //toggleClass
        $(".rightanimation").toggleClass("hide") //toggleClass
        $(".fadein").toggleClass("active") //toggleClass
        $(".leftdetailanimation").toggleClass("active")
        $(".rightdetailanimation").toggleClass("active")
        $(".downdetailanimation").toggleClass("active")
        $(".tabs").addClass("active")



    });

   
        $("#tohere").keyup(function () {
         value = $(this).val();
        $("p").text(value);
        }).keyup();


        
    });


       $(function() {
    $( "#datepicker" ).datepicker({
      onSelect: function(date, evt) {
        $('#date').text(date);
      },
      dateFormat: 'dd.mm.yy'
    });
  });





