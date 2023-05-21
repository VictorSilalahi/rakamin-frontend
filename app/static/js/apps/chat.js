
var token = null;
var sio;
var room_name = '';

$(document).ready(function() {
    
    token = localStorage.getItem('jwt-token');
    var username = localStorage.getItem("username");

    if (token) {
        loadRooms(token);
    } else {
        logOut();
    }

    $("#logoutid").on("click", function() {
        logOut();
    });

    $("#txtMessage").on("keyup", function(e) {
        if (e.keyCode == 13) {

            if (room_name == '') {
                alert("Choose a room for conversation!");
                return false;
            }
    
            if ($(this).val()=='') {
                alert("Please type your sentence!");
                $(this).focus();
            } else {
                let msg = $(this).val();
                msg_to_send = msg.trim();
    
                sio.emit("send_message", {
                    "username": username,
                    "room_name": room_name,
                    "message": msg_to_send
                });
    
                $(this).val("");
                $(this).focus();
    
            }
    
        }
    });

    $("#txtMessage").focus();

});

function logOut() {
    localStorage.removeItem("jwt-token");

    var all_rooms = findAllRoom();
    
    for (var i=0; i<all_rooms.length; i++) {
        sio.emit("left_room", {
            "room_name": all_rooms[i],
            "username": localStorage.getItem("username")
        });
    }
    sio.close();
    window.location.replace("http://127.0.0.1:3000");
}

function loadRooms(token) {

    var member_id = localStorage.getItem("member_id");
    var username = localStorage.getItem("username");

    $("#lblUsername").html("<h4><b>"+username+"</b></h4>");

    $.ajax({
        url:"http://127.0.0.1:5000/api/member/rooms",
        dataType:"json",
        method:"get",
        data:{member_id: member_id},
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
            $("#divTodos").html("");
        },
        statusCode: {
            404: function(responseObject, textStatus, jqXHR) {
                // No content found (404)
                alert("Content not found!");
            },
            503: function(responseObject, textStatus, errorThrown) {
                // Service Unavailable (503)
                alert("Service Unavailable!");
            },
            401: function(responseObject, textStatus, errorThrown) {
                // Unauthorized
                alert("Unauthorized User!");
                logOut();
            }           
        }, 
        success: function(data) {

            var dat = data['data'];
            var str = "";
            var rooms = [];


            for (var i=0; i<dat.length; i++) {
                str = str + "<li class='list-group-item d-flex justify-content-between align-items-center' id='"+dat[i][0]+"'>";
                str = str + "<h4><b>"+dat[i][1]+"</b>";
                str = str + "<span class='badge badge-error'></span></li></h4>";
                rooms.push(dat[i][1]);

                var new_div = document.createElement("div");
                new_div.setAttribute("id",dat[i][1]);
                new_div.style.width = "100%";
                new_div.style.maxHeight = "600px";
                new_div.style.overflowY = "auto";
                new_div.style.display = "none";

                $("#divConversation").append(new_div);

            }
            $("#groupList").html(str);

            sio = io.connect("http://127.0.0.1:5000");

            sio.emit("join_room", {
                room: rooms,
                member_id: member_id,
                username: username
            });

            sio.on("join_room_announcement", function(data) {
                console.log(data);
                findRoomInList(data["room_name"], "join_room", data["username"], "");
            });

            sio.on("receive_message", function(data) {
                console.log(data);
                findRoomInList(data["room_name"], "message", data["username"], data["message"]);
            });

            sio.on("has_left", function(data) {
                console.log(data);
                findRoomInList(data["room_name"], "left_room", data["username"], data["message"]);
            });

        }
    });        


}
function findRoomInList(room_name, event_type, username, msg) {

    $(".room-list").find("li").each(function() {
        var temp_room_name = $(this).text();
        var li_room_name;
        if (temp_room_name.includes("!")==true) {
            li_room_name = temp_room_name.replace("!","");
        } else {
            li_room_name = temp_room_name;
        }
        if (li_room_name==room_name) {
            $(this).find(".badge").html("<b>!</b>");

            var childDiv = document.createElement("div");
            if (event_type=="join_room") {
                childDiv.innerHTML = "<i><b>"+username+ "</b> has joined the room.</i>";
            }
            if (event_type=="message") {
                childDiv.innerHTML = "<b>["+username+ "]</b>&nbsp;"+msg;
            }
            if (event_type=="left_room") {
                childDiv.innerHTML = msg;
            }
            $("#"+room_name).append(childDiv);
            $("#"+room_name).scrollTop(20000);
        }
    });
}

function loadRoomMessage(room, token) {

}

function messageDelete(room_id, conversation_id, token) {


}

function messageAdd(token) {

}

$(document).on("click", ".list-group-item", function() {

    $(".list-group-item").removeClass("active");
    $(this).addClass("active");
    var c = $(this).find(".badge");
    c.text("");

    room_name = $(this).text();

    var choosen_room = $(this).text();

    $(".room-list li").each(function() {
        var new_room_name;
        var room_name = $(this).text();
        if (room_name.includes("!")) {
            new_room_name = room_name.replace("!","");
        } else {
            new_room_name = room_name; 
        }
        $("#"+new_room_name).hide();
    });    

    $("#spanRoom").html("<b>"+choosen_room+"</b>");
    $("#"+choosen_room).show();
});

function findAllRoom() {
    var all_rooms = [];

    $(".room-list li").each(function() {
        var new_room_name;
        var room_name = $(this).text();
        if (room_name.includes("!")) {
            new_room_name = room_name.replace("!","");
        } else {
            new_room_name = room_name; 
        }
        all_rooms.push(new_room_name);
    });
    
    return all_rooms;
}






