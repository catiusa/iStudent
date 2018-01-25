var url = "http://localhost:8080/";



var x = document.cookie;
console.log(x);

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