var url = "http://localhost:8080/";

// Classic registration for teacher

function authenticate() {
    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var phone = $("#phone-number").val();
    var address = $("#address").val();
    var gender = $("#genderSelect").val();
    var age = $("#age").val();
    var roles = ["TEACHER"];
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneRe = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!(username && email && password && phone && address && gender && age)) {
        alert("None of the fields can be left empty!");
    }

    else if (!re.test(email)) {
        alert("Please enter a valid email address");
    }
    else if (!phoneRe.test(phone)) {
        alert("Please enter a valid phone number");
    }
    else if (isNaN(age) || age < 15 || age > 100) {
        alert("Age must be between 15 and 100");
    }

    else {
        var params = {
            "userName": username,
            "email": email,
            "password": password,
            "address": address,
            "phoneNumber": phone,
            "age": age,
            "gender": gender,
            "roles": roles
        };

        console.log(JSON.stringify(params));

        $.ajax({
            type: "POST",
            url: "/user/update",
            data: JSON.stringify(params),
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                alert(data);

                console.log("Update success");
            },
            error: function (error) {
                console.log(error);
                console.log("Error");
            }
        });

    }
}

function getUserDataAnRedirect(email, token) {
    $.ajax({
        url: "user/findByEmail/" + email,
        type: 'GET',
        async: true,
        contentType: "application/json; charset=utf-8",
        //headers: {"X-Auth-Token": token},
        dataType: 'json',
        success: function (data) {
            console.log("data in success function : ", data);
            var redirectToAdmin = false;
            for (var key in data) {
                if (key === "roles") {
                    var roles = [];
                    for (var i = 0; i < data[key].length; i++) {
                        var role = data[key][i];
                        roles.push(role);
                        if (role === "ADMIN") {
                            redirectToAdmin = true;
                        }
                    }
                }
                else if (data.hasOwnProperty(key) && data[key]) {
                    window.localStorage.setItem(key, data[key]);
                }
            }

            if (redirectToAdmin === true) {
                go_to_page("addTeacher.html");
            }
            else {
                go_to_page("normalUserHomePage.html");
            }
        },
        error: function () {
            alert("Error retrieving the data, contact the administrator.");
        }
    })
}
function go_to_page(file) {
    var location = window.location.href.split("/");
    location.pop();
    window.location.href = location.join("/") + "/html/" + file;
}

$('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
        }
        else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

});

$('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});