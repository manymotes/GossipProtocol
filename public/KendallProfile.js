

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};


var date = new Date();
date.yyyymmdd();

$(document).ready(function() {
    console.log("top");

    var kendallID = getRandom(10);
    var nunMessages = 0;

    var userName = getCookie("name");
    console.log(userName);

    document.getElementById("name").innerHTML = userName +"'s Profile";

    //console.log(window.location.href);
    var urltemp = window.location.href;
    var accessSplit = urltemp.split("=");
    //console.log(accessSplit[1]);
    var ACCESS_TOKEN = accessSplit[1];

    var date = new Date();
    var checkinIDs = new Array();


    var myurl = "https://api.foursquare.com/v2/users/self/checkins" + "?oauth_token="+ ACCESS_TOKEN + "&v=" + date.yyyymmdd();

	$.ajax({
	    url : myurl,
	    dataType : "json",
        async: false,
		success : function(JSON) {
			//console.log(JSON);
            //console.log(JSON.response.checkins);


            for (var i = 0; i < JSON.response.checkins.items.length; i++)
            {
                //console.log(JSON.response.checkins.items[i].id);
                checkinIDs[i] = JSON.response.checkins.items[i].id;
            }

            $("#stackResults").appendTo('div');
                        document.getElementById("output").innerHTML = "";

            var checkinsTally = 0;

            if(getCookie("loggedIn") =="true")
            {
            for (var i  = 0; i < checkinIDs.length; i++)
            {
                //console.log("in id loop");
                var uri = "https://api.foursquare.com/v2/checkins/" + checkinIDs[i] + "?oauth_token="+ ACCESS_TOKEN + "&v=" + date.yyyymmdd();

                	$.ajax({
                	    url : uri,
                	    dataType : "json",
                        async: false,
                		success : function(JSON) {
                		//	console.log(JSON);
                        //    console.log(JSON.response.checkin.user.firstName);

                            if (JSON.response.checkin.user.firstName == userName)
                            {
                                checkinsTally += 1;
                                //console.log(checkinsTally);
                                //console.log("in if statement");
                                var results = userName + " checked into " + JSON.response.checkin.venue.name +"\n";


                    	          $("div").append(results);
                                  $("div").append("</br>");



                            }

                        }
                    });
            }//end forloop
        }
        else
        {
            //begin
            for (var i  = 0; i < checkinIDs.length - 1; i++)
            {
                //console.log("in id loop");
                var uri = "https://api.foursquare.com/v2/checkins/" + checkinIDs[i] + "?oauth_token="+ ACCESS_TOKEN + "&v=" + date.yyyymmdd();

                	$.ajax({
                	    url : uri,
                	    dataType : "json",
                        async: false,
                		success : function(JSON) {
                		//	console.log(JSON);
                        //    console.log(JSON.response.checkin.user.firstName);

                            if (JSON.response.checkin.user.firstName == userName)
                            {
                                checkinsTally += 1;
                                //console.log(checkinsTally);
                                //console.log("in if statement");
                                var results = userName + " checked into " + JSON.response.checkin.venue.name +"\n";

                                document.getElementById("output").innerHTML = "";
                    	          $("div").append(results);
                                  $("div").append("</br>");

                            }

                        }
                    });
            }//end firloop

            //end
        }




            wait(1000);
            console.log(checkinsTally);
            if (checkinsTally < 1)
            {
                    $("div").append(userName + " doesnt have any checkins");
            }





        }

    });




    //checkin Button
    $("#logout").click(function(e) {
		e.preventDefault();

        function clearListCookies()
        {
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++)
            {
                var spcook =  cookies[i].split("=");
                deleteCookie(spcook[0]);
            }
            function deleteCookie(cookiename)
            {
                var d = new Date();
                d.setDate(d.getDate() - 1);
                var expires = ";expires="+d;
                var name=cookiename;
                //alert(name);
                var value="";
                document.cookie = name + "=" + value + expires + "; path=/acc/html";
            }
            //window.location = ""; // TO REFRESH THE PAGE
            }


          window.location.replace("index.html")


        });



        $("#rumorSubmit").click(function(e) {
            e.preventDefault();

            console.log("in RomorSubmit");

            ///begin post
            var value = $("#rumorInput").val();
            var myurl= "http://localhost:3001/api/kendallrumor"
    				$.ajax({
    					type: 'POST',
                        dataType: 'json',
                        url : myurl,
                        headers: {"X-HTTP-Method-Override": "put"},
                        data: {
                            'id':kendallID + ':' + nunMessages,
                            'originator':'Kendall',
                            'text':value
                        },
                        async: false,
    					success : function(JSON2) {
    						console.log(JSON2);

    					}
    				});
            //end post


        //      //begin get
        //      var myurl2= "http://localhost:3001/api/kendall"
    				// $.ajax({
    				// 	url : myurl2,
        //                 type: "GET",
    				// 	dataType2 : "json",
        //                 async: false,
    				// 	success : function(JSON2) {
    				// 		console.log(JSON2);

    				// 	}
    				// });
        //             //end GET

                    nunMessages += 1;
            });

            setInterval(function() {
                kendallMessageList();
                displayKendallMessages();
                console.log("while loop");
            }, 5000);


    });




function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function getRandom(length) {

return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));

}
 
function kendallMessageList()
{
    
    //console.log("in kendallMessageList");
    var myurl2= "http://localhost:3001/api/kendall"
                    $.ajax({
                        url : myurl2,
                        type: "GET",
                        dataType : "json",
                        async: false,
                        success : function(JSON2) {
                            //console.log(JSON2); 
                            joeMessageList(JSON2);
                        }
                    });
}

function joeMessageList(kJSON)
{
    //console.log("in joeMessageList");
    //console.log(kJSON);
    var myurl2= "http://localhost:3001/api/joe"
                    $.ajax({
                        url : myurl2,
                        type: "GET",
                        dataType : "json",
                        async: false,
                        success : function(JSON2) {
                        //console.log(JSON2); 
                        compareJSON(kJSON, JSON2);
                            
                        }
                    });



}

function compareJSON(ken, joe)
{
    console.log("in compareJSON");
    console.log(ken.length);
    console.log(joe.length);


    //chekc joes messages
    for (var i = 0; i < joe.length; i++)
    {
        var tripmine = 1;
        for (var k = 0; k < ken.length; k++)
        {
            if (joe[i].id == ken[k].id)
            {
                console.log("found match");
                tripmine = 0;
            }
        }
        if (tripmine == 1)
        {
            console.log("found missing message");
            console.log(joe[i]);
            sendKendallMessage(joe[i]);
        }
    }

    //check kendall messages

    for (var i = 0; i < ken.length; i++)
    {
        var tripmine = 1;
        for (var k = 0; k < joe.length; k++)
        {
            if (ken[i].id == joe[k].id)
            {
                console.log("found match");
                tripmine = 0;
            }
        }
        if (tripmine == 1)
        {
            console.log("found missing message");
            console.log(ken[i]);
            sendJoeMessage(ken[i]);
        }
    }
}

function sendKendallMessage(message)
{

    var myurl= "http://localhost:3001/api/kendallrumor"
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url : myurl,
                        headers: {"X-HTTP-Method-Override": "put"},
                        data: {
                            'id':message.id,
                            'originator':message.originator,
                            'text':message.text
                        },
                        async: false,
                        success : function(JSON2) {
                            console.log(JSON2);

                        }
                    });
}

function sendJoeMessage(message)
{
    
    var myurl= "http://localhost:3001/api/joerumor"
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url : myurl,
                        headers: {"X-HTTP-Method-Override": "put"},
                        data: {
                            'id':message.id,
                            'originator':message.originator,
                            'text':message.text
                        },
                        async: false,
                        success : function(JSON2) {
                            console.log(JSON2);

                        }
                    });
}

function displayKendallMessages()
{
    var myurl2= "http://localhost:3001/api/kendall"
                    $.ajax({
                        url : myurl2,
                        type: "GET",
                        dataType : "json",
                        async: false,
                        success : function(JSON2) {
                            //console.log(JSON2); 
                           displayHelper(JSON2);
                        }
                    });

}

function displayHelper(messages)
{
      var ItemsList = document.getElementById("ItemsList");

      var results = ""

      messages.forEach(function(element) {
      results  += ( "<li>" +      "Author: " + element.originator + "</br>  Message: " + element.text+ " </li> </br>");
      }); // end of forEach

      results + "</br>";
      ItemsList.innerHTML = results;
    }









