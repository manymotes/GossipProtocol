

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




            wait(3000);
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
