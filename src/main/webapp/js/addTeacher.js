url = "http://localhost:8080"
function add()
{
    var email = $('#email').val();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
        alert("Please enter a valid email address");
    }
    else {
        var params = {
            "userName": "teacher",
            "email": email,
            "password": "no",
            "address": "no",
            "phoneNumber": "0000000000",
            "age": 99,
            "gender": "F",
            "roles": ["TEACHER"]
        };
        $.ajax({
            type: "POST",
            url: "../teacher/add",
            data: JSON.stringify(params),
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log(data);
                $('#email').val("");
            },
            error: function (data, textStatus) {
                alert(data.responseText);
            }
        });
    }

}