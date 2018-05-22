$(document).ready(function() {

console.log(document.cookie);
	// var username = getCookie("username");
    // if (username != "") {
    //     console.log("Welcome again " + username);
	// }
		console.log(document.URL);
	   var allcookies = document.cookie;
	   //document.write ("All Cookies : " + allcookies );
	   console.log("All Cookies : " + allcookies )

	   // Get all the cookies pairs in an array
	   cookiearray = allcookies.split(';');

	   // Now take key value pair out of this array
	   for(var i=0; i<cookiearray.length; i++){
	      name = cookiearray[i].split('=')[0];
	      value = cookiearray[i].split('=')[1];
	     // document.write ("Key is : " + name + " and Value is : " + value);
		  console.log("Key is : " + name + " and Value is : " + value);
	   }


	  // var now = new Date();
	  //now.setMonth( now.getMonth() + 1 );
	 // cookievalue = escape(document.myform.customer.value) + ";"


	  //document.cookie = "expires=" + now.toUTCString() + ";"
	 // document.write ("Setting Cookies : " + "name=" + "BOB" );
	// console.log
	var accs = "blah";
	var nameMap = new Map();
	$("#nameSubmit").click(function(e) {
		e.preventDefault();
		var value = $("#nameInput").val();
		//document.cookie="name=" + value;
	    console.log(value);
		document.cookie="name=" + value;

			if (nameMap.has(value))
			{
				console.log("name in map!!!");
			}
			else
			{

			console.log("name not in map!!!");
			nameMap.set(value, '0');
			}


		var myJSON;

	var foursquareApi = {

		clientId: "VQHLRGUBJF1PZRNJSPIQID5JNZQ1E0XU4V5UE45HJ540CQSM",
    	clientSecret: "2EX1IFCJB0DBB0LIUV3CBT1OTUYYDMGPS5QSKLMD0FCZYVAD",
	    redirectUrl : "http://localhost:3001/profile.html",
	}

	var url = "https://foursquare.com/oauth2/authenticate";
           url += "?client_id="+foursquareApi.clientId;
           url += "&response_type=token";
           url += "&redirect_uri="+foursquareApi.redirectUrl;
           window.location = url;



		// var myurl= "https://foursquare.com/oauth2/authenticate"
		$.ajax({
			type: 'get',
		    url : url,
		    dataType : "json",
			success : function(JSON) {
				console.log(win.location.pathname);
				myJSON = JSON;
				console.log(JSON);
				console.log(myJSON);
				console.log(myJSON.access_token);
				document.cookie = "name=" + value;
				document.cookie = "access_token=" + JSON.access_token;
				document.cookie = "loggedIn=" +"true";


	  	}}).done(function(){
			console.log(myJSON);
	  	  console.log(myJSON.access_token);
       callback(true);
    });



      });




  //kendalls link
	$("#kendall").click(function(e) {
		e.preventDefault();

		var value = "kendall";
		document.cookie = "name=" + value;
	//	document.cookie = "access_token=" + JSON.access_token;
		document.cookie = "loggedIn=" +"false";
		var foursquareApi = {

			clientId: "VQHLRGUBJF1PZRNJSPIQID5JNZQ1E0XU4V5UE45HJ540CQSM",
	    	clientSecret: "2EX1IFCJB0DBB0LIUV3CBT1OTUYYDMGPS5QSKLMD0FCZYVAD",
		    redirectUrl : "http://localhost:3001/profile.html",
		}

		var url = "https://foursquare.com/oauth2/authenticate";
	           url += "?client_id="+foursquareApi.clientId;
	           url += "&response_type=token";
	           url += "&redirect_uri="+foursquareApi.redirectUrl;
	           window.location = url;

		$.ajax({
			type: 'get',
				url : url,
				dataType : "json",
			success : function(JSON) {
				console.log(win.location.pathname);
				myJSON = JSON;
				console.log(JSON);
				console.log(myJSON);
				console.log(myJSON.access_token);

				document.cookie = "name=" + value;
				document.cookie = "access_token=" + JSON.access_token;
				document.cookie = "loggedIn=" +"false";


			}}).done(function(){
			console.log(myJSON);
				console.log(myJSON.access_token);
			 callback(true);
		});


	});//end of kendall

	//start of joe
	$("#joe").click(function(e) {
		e.preventDefault();

		var value = "joe";
		document.cookie = "name=" + value;
		//document.cookie = "access_token=" + JSON.access_token;
		document.cookie = "loggedIn=" +"false";

		var foursquareApi = {

			clientId: "VQHLRGUBJF1PZRNJSPIQID5JNZQ1E0XU4V5UE45HJ540CQSM",
				clientSecret: "2EX1IFCJB0DBB0LIUV3CBT1OTUYYDMGPS5QSKLMD0FCZYVAD",
				redirectUrl : "http://localhost:3001/profile.html",
		}

		var url = "https://foursquare.com/oauth2/authenticate";
						 url += "?client_id="+foursquareApi.clientId;
						 url += "&response_type=token";
						 url += "&redirect_uri="+foursquareApi.redirectUrl;
						 window.location = url;

		$.ajax({
			type: 'get',
				url : url,
				dataType : "json",
			success : function(JSON) {
				console.log(win.location.pathname);
				myJSON = JSON;
				console.log(JSON);
				console.log(myJSON);
				console.log(myJSON.access_token);
				//var value = "joe";
				document.cookie = "name=" + value;
				document.cookie = "access_token=" + JSON.access_token;
				document.cookie = "loggedIn=" +"false";


			}}).done(function(){
			console.log(myJSON);
				console.log(myJSON.access_token);
			 callback(true);
		});


	});
	//end of joe


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
