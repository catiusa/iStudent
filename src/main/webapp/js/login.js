function authenticate() {
    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var phone = $("#phone-number").val();
    var address = $("#address").val();
    var gender = $("#genderSelect").val();
    var age = $("#age").val();
    var roles = ["ADMIN"];
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneRe = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(!(username && email && password && phone && address && gender && age)) {
        alert("None of the fields can be left empty!");
    }

    else if (!re.test(email)){
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
            url: "/user/save",
            data: JSON.stringify(params),
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                alert("Success");
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            }
        });

    }
}


function login() {
    var username = $("#loginUsername").val();
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!(username && email && password)) {
        alert("None of the fields can be left empty!");
    }
    else if (!re.test(email)){
        alert("Please enter a valid email address");
    }
    else {
        var params = {
            "userName": username,
            "email": email,
            "password": password
        };


        console.log(JSON.stringify(params));


        $.ajax({
            type: "POST",
            url: "/login",
            data: JSON.stringify(params),
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                alert("Success");
                console.log(data);

                //go to add teacher as admin
                //TO DO : go to this page just as admin
                window.localStorage.setItem("token", data['token']);
                var location = window.location.href.split("/");
                location.pop();
                window.location.href = location.join("/") + "/html/addTeacher.html";
            },
            error: function (data, textStatus) {
                alert(data.responseText);
            }
        });
    }
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
        if( $this.val() === '' ) {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if( $this.val() === '' ) {
            label.removeClass('highlight');
        }
        else if( $this.val() !== '' ) {
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