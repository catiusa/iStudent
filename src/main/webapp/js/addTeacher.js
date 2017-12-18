url = "localhost:8080"
add()
{
    var email = $('#email').val();
    $.post({
        url: url + "/addTeacher",
        async: true,
        contentType: "application/json",
        headers: {"X-Auth-Token": window.localStorage.getItem("token")},
        data: JSON.stringify({
            "email": email
        }),
        success: function () {
            alert("Add teacher done successfully!");
            getAllTechnologies();
        },
        error: function () {
            alert('Error, cannot add teacher!');
        }
    });
}