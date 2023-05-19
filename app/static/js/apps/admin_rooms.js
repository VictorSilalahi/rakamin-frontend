
var token;

$(document).ready(function() {
    
    token = localStorage.getItem('jwt-token');

    if (token) {
        loadRoomAndMembers(token);
    } else {
        logOut();
    }

    $("#logoutid").on("click", function() {
        logOut();
    });

    $(".btn-input-room").on("click", function() {
        if ($("#txtRoomName").val()=="") {
            alert("type the room name!");
            $("#txtRoomName").focus();
            return false;
        }

        if (confirm("Are you sure to add new room?")==true) {
            var room_name = $("#txtRoomName").val();
            addNewRoom(room_name, token);
            $("#txtRoomName").val("");
        }
    });

    $(".btn-save-member").on("click", function() {

        var room_id = $("#room_id").val();
        var member_list = [];
        var inputLength = $("#divListMember").find(".form-check-input").length;
        
        for (var i=0; i<inputLength; i++) {
            if ($("#divListMember").find(".form-check-input").eq(i).is(":checked")) {
                member_list.push($("#divListMember").find(".form-check-input").eq(i).val());
            }
        }

        $.ajax({
            url: "http://127.0.0.1:5000/api/admin/room/setmember",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({room_id: room_id, member_list: member_list}),
            method: "post",
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
                loadRoomAndMembers(token);
            }
        });        
    
        $("#modalSetMember").modal("hide");

    });

});

function logOut() {
    localStorage.removeItem("jwt-token");
    window.location.replace("http://127.0.0.1:3000/admin");
}

function addNewRoom(room_name, token) {

    $.ajax({
        url:"http://127.0.0.1:5000/api/admin/rooms",
        dataType:"json",
        data: {room_name: room_name},
        method:"post",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
            $("#tblRooms tbody").html("");
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
            loadRoomAndMembers(token);
        }
    });        
}

function loadRoomAndMembers(token) {
    
    $.ajax({
        url:"http://127.0.0.1:5000/api/admin/rooms",
        dataType:"json",
        method:"get",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
            $("#tblRooms tbody").html("");
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

            var str = '';
            for (var i=0; i<data['data'].length; i++) {
                str = str + "<tr id='"+data['data'][i][0]+"'><td>"+(i+1)+"</td><td>"+data['data'][i][1]+"</td><td>"+data['data'][i][2]+"</td><td><button class='btn btn-info btn-set-member'>Set Member</button>&nbsp;<button class='btn btn-danger btn-delete'>Delete</button></td></tr>";
            }
            $("#tblRooms tbody").html(str);
        }
    });        


}

function deleteRoom(room_id, token) {

    $.ajax({
        url:"http://127.0.0.1:5000/api/admin/rooms",
        data: {room_id: room_id},
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
            loadRoomAndMembers(token);
        }
    });        

}

function showMemberInRoom(room_id, token) {

    $.ajax({
        url:"http://127.0.0.1:5000/api/admin/room/members",
        data: {room_id: room_id},
        dataType: "json",
        method: "get",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
            $("#divListMember").html("");
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
            var str="";
            for (var i=0; i<data['data'].length; i++) {
                
                str = str + "<label class='list-group-item'>";
                if (data['data'][i][3]==true) {
                    str = str + "<input class='form-check-input me-1' type='checkbox' value='"+data['data'][i][0]+"' checked>";
                }
                else {
                    str = str + "<input class='form-check-input me-1' type='checkbox' value='"+data['data'][i][0]+"'>";
                }

                str = str + "&nbsp;"+data['data'][i][1]+"</label>";
            }
            $("#divListMember").html(str);
        }
    });        


}

$(document).on("click",".btn-delete", function() {
    if (confirm("Delete this room?")==true) {
        var room_id = $(this).parent().parent().attr("id");
        deleteRoom(room_id, token);
    }

});

$(document).on("click",".btn-set-member", function() {
    var room_id = $(this).parent().parent().attr("id");
    var room_name = $(this).parent().parent().find("td:eq(1)").text();
    $("#room_id").val(room_id);
    $("#modalSetMember .modal-title").html("<h4><b>"+room_name+"</b></h4>");

    // get registered member in room and not-registered member
    showMemberInRoom(room_id, token);
     
    $("#modalSetMember").modal("show");
});