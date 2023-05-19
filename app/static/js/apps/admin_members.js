
var token;

$(document).ready(function() {
    
    token = localStorage.getItem('jwt-token');

    if (token) {
        loadMembers(token);
    } else {
        logOut();
    }

    $("#logoutid").on("click", function() {
        logOut();
    });

});

function logOut() {
    localStorage.removeItem("jwt-token");
    window.location.replace("http://127.0.0.1:3000/admin");
}

function loadMembers(token) {

    $.ajax({
        url:"http://127.0.0.1:5000/api/admin/members",
        dataType:"json",
        method:"get",
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer "+token);
            $("#tblMembers tbody").html("");
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
                str = str + "<tr id='"+data['data'][i]['member_id']+"'><td>"+(i+1)+"</td><td>"+data['data'][i]['username']+"</td><td>"+data['data'][i]['email']+"</td><td>"+data['data'][i]['created_at']+"</td><td><button class='btn btn-danger btn-hapus'>Delete</button></td></tr>";
            }
            $("#tblMembers tbody").html(str);
        }
    });        


}

function deleteMember(member_id, token) {

    $.ajax({
        url:"http://127.0.0.1:5000/api/admin/members",
        data: {member_id: member_id},
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
            loadMembers(token);
        }
    });        

}

$(document).on("click",".btn-hapus", function() {
    if (confirm("Delete this member?")==true) {
        var member_id = $(this).parent().parent().attr("id");
        deleteMember(member_id, token);
   
    }

});