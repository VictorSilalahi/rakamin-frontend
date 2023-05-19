$(document).ready(function() {
    
    $("#btnLogin").on("click", function() {

        if ($("#txtEmail").val()=='') {
            alert("Masukkan email anda!");
            $("#txtEmail").focus();
            return false;
        }
    
        if ($("#txtPwd").val()=='') {
            alert("Masukkan password anda!");
            $("#txtPwd").focus();
            return false;
        }
    
        const email = $("#txtEmail").val();
        const pwd = $("#txtPwd").val();

        $.ajax({
            url:"http://127.0.0.1:5000/api/member/validate",
            data: {email:email, password:pwd}, 
            dataType:"json",
            method:"post",
            beforeSend: function() {
    
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
                }           
            }, 
            success: function(data) {
                // console.log(data);
                localStorage.setItem("jwt-token", data['token']);
                localStorage.setItem("member_id", data['data']['member_id']);
                window.location.replace("http://127.0.0.1:3000/chat");
            }
        });


    });


});

