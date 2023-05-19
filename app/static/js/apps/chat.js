
var token = null;

$(document).ready(function() {
    
    token = localStorage.getItem('jwt-token');

    if (token) {
        loadRooms(token);
    } else {
        logOut();
    }

    $("#logoutid").on("click", function() {
        logOut();
    });
});

function logOut() {
    localStorage.removeItem("jwt-token");
    window.location.replace("http://127.0.0.1:3000");
}

function loadRooms(token) {

    var member_id = localStorage.getItem("member_id");

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
            for (var i=0; i<dat.length; i++) {
                str = str + "<li class='list-group-item d-flex justify-content-between align-items-center' id='"+dat[i][0]+"'>";
                str = str + "<h4><b>" +dat[i][1]+"</b>";
                str = str + "<span class='badge bagde-spill badge-secondary'>0</span></li></h4>";
            }
            $("#groupList").html(str);
        }
    });        


}

function loadRoomMessage(room_id, token) {

}

function messageDelete(room_id, conversation_id, token) {

    $.ajax({
        url:"http://127.0.0.1:5000/api/member/message",
        data: {room_id: room_id, conversation_id: conversation_id},
        method:"delete",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
        },
        statusCode: {
            404: function(responseObject, textStatus, jqXHR) {
                // No content found (404)
                // This code will be executed if the server returns a 404 response
                alert("Content not found!");
            },
            503: function(responseObject, textStatus, errorThrown) {
                // Service Unavailable (503)
                // This code will be executed if the server returns a 503 response
                alert("Service Unavailable!");
            },
            401: function(responseObject, textStatus, errorThrown) {
                // Unauthorized
                alert("Unauthorized User!");
                logOut();
            }           
        }, 
        success: function(data) {
            loadTodos(token);
        }
    });        

}

function messageAdd(token) {

    const title = $("#modalAddEditTodo #txtTitle").val();
    const desc = $("#modalAddEditTodo #txtDesc").val();

    $.ajax({
        url:"http://127.0.0.1:5000/api/todo",
        data: {title: title, desc: desc},
        method:"post",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
        },
        statusCode: {
            404: function(responseObject, textStatus, jqXHR) {
                // No content found (404)
                // This code will be executed if the server returns a 404 response
                alert("Content not found!");
            },
            503: function(responseObject, textStatus, errorThrown) {
                // Service Unavailable (503)
                // This code will be executed if the server returns a 503 response
                alert("Service Unavailable!");
            },
            401: function(responseObject, textStatus, errorThrown) {
                // Unauthorized
                alert("Unauthorized User!");
                logOut();
            }           
        }, 
        success: function(data) {
            loadTodos(token);
        }
    });        

}









