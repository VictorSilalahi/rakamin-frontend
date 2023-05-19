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
            url:"http://127.0.0.1:5000/api/admin/validate",
            data: {email: email, password: pwd}, 
            dataType:"json",
            method:"post",
            beforeSend: function() {
    
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
                }           
            }, 
            success: function(data) {
                // console.log(data['token']);
                localStorage.setItem("jwt-token", data['token']);
                window.location.replace("http://127.0.0.1:3000/admin/members");
            }
        });


    });


});

