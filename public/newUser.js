

var kendallID = getRandom(10);
var randomUserID = getRandom(11);
var nunMessages = 0;

$(document).ready(function() {
    console.log("top");

    
   
    $("#rumorSubmit").click(function(e) {
            e.preventDefault();

            console.log("in RomorSubmit");

            ///begin post
            var nameInput = $("#nameInput").val();
            var value = $("#rumorInput").val();
            console.log("after input RomorSubmit");
            var myurl= "http://localhost:3001/api/newbyrumor"
    				$.ajax({
    					type: 'POST',
                        dataType: 'json',
                        url : myurl,
                        headers: {"X-HTTP-Method-Override": "put"},
                        data: {
                        	'user' : randomUserID,
                            'id':kendallID + ':' + nunMessages,
                            'originator':nameInput,
                            'text':value
                        },
                        async: false,
    					success : function(JSON2) {
    						console.log(JSON2);

    					}
    				});
           
      
                    nunMessages += 1;
            });

            setInterval(function() {
                shareMessages()
                displayMessages();
                console.log("while loop");
            }, 5000);




});


function getRandom(length) {

return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));

}


//begin message sharing

function shareMessages()
{

	var myurl2= "http://localhost:3001/api/newby"
                    $.ajax({
                        url : myurl2,
                        type: "POST",
                        dataType : "json",
                        data: {
                        	'user' : randomUserID
                        },
                        async: false,
                        success : function(JSON2) {
                            //console.log(JSON2); 
                           bobMessageList(JSON2);
                        }
                    });
}

function bobMessageList(myJSON)
{
    //console.log("in joeMessageList");
    //console.log(kJSON);
    var myurl2= "http://localhost:3001/api/bob"
                    $.ajax({
                        url : myurl2,
                        type: "GET",
                        dataType : "json",
                        async: false,
                        success : function(JSON2) {
                        //console.log(JSON2); 
                        compareJSON(myJSON, JSON2);
                            
                        }
                    });



}

function compareJSON(myJSON, bob)
{
    console.log("in compareJSON");
    console.log(myJSON.length);
    console.log(bob.length);


    //chekc bob messages
    for (var i = 0; i < bob.length; i++)
    {
        var tripmine = 1;
        for (var k = 0; k < myJSON.length; k++)
        {
            if (bob[i].id == myJSON[k].id)
            {
                console.log("found match");
                tripmine = 0;
            }
        }
        if (tripmine == 1)
        {
            console.log("found missing message");
            console.log(bob[i]);
            sendJoeMessage(bob[i]);
        }
    }

    //check joe messages

    for (var i = 0; i < myJSON.length; i++)
    {
        var tripmine = 1;
        for (var k = 0; k < bob.length; k++)
        {
            if (myJSON[i].id == bob[k].id)
            {
                console.log("found match");
                tripmine = 0;
            }
        }
        if (tripmine == 1)
        {
            console.log("found missing message");
            console.log(myJSON[i]);
            sendBobMessage(myJSON[i]);
        }
    }
}

function sendJoeMessage(message)
{

    var myurl= "http://localhost:3001/api/newbyrumor"
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url : myurl,
                        headers: {"X-HTTP-Method-Override": "put"},
                        data: {
                        	'user' : randomUserID,
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

function sendBobMessage(message)
{
    
    var myurl= "http://localhost:3001/api/bobrumor"
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

//end message sharing


function displayMessages()
{
    var myurl2= "http://localhost:3001/api/newby"
                    $.ajax({
                        url : myurl2,
                        type: "POST",
                        dataType : "json",
                        data: {
                        	'user' : randomUserID
                        },
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




    
