$(document).ready(function() {
    
    $(".btn-cancel").on("click", function() {
        window.location.replace("http://127.0.0.1:3000");
    });
    
    $(".btn-confirm").on("click", function() {
        if ($("#txtName").val()=='' || $("#txtEmail").val()=='' || $("#txtPwd1").val()=='' || $("#txtPwd2").val()=='') {
            alert("SignUp data not complete!");
            return false;
        }

        if ($("#txtPwd1").val()!=$("#txtPwd2").val()) {
            alert("Password error!");
            return false;
        }

        email = $("#txtEmail").val();
        username = $("#txtName").val();
        password = $("#txtPwd1").val();

        $.ajax({
            url: "http://127.0.0.1:5000/api/members",
            data: {email: email, username: username, password: password},
            method: "post",
            beforeSend: function(xhr) {

            },
            statusCode: {
                400: function(responseObject, textStatus, jqXHR) {
                    // User email already exist (400)
                    // This code will be executed if the server returns a 404 response
                    alert("Email already registered!");
                    return false;
                },
                404: function(responseObject, textStatus, jqXHR) {
                    // No content found (404)
                    // This code will be executed if the server returns a 404 response
                    alert("Content not found!");
                    return false;
                },
                503: function(responseObject, textStatus, errorThrown) {
                    // Service Unavailable (503)
                    // This code will be executed if the server returns a 503 response
                    alert("Service Unavailable!");
                    return false;
                }
            }, 
            success: function(data) {
                if (data['msg']=='ok') {
                    window.location.replace("http://127.0.0.1:3000");
                }
                
            }
        });        

    });
});