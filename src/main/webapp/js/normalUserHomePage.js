/**
 * Created by andrapop on 2018-01-25.
 */
var url = "http://localhost:8080";
$( document ).ready(function() {
    if(window.localStorage.getItem("token") === null || window.localStorage.getItem("token") === "") {
        window.location.href = url;
    }
});
function logout() {
    $.get({
        url: "/logoutMe",
        async: true,
        contentType: "application/json",
        headers: {"X-Auth-Token": window.localStorage.getItem("token")},
        success: function () {
            window.localStorage.setItem("token", "");
            window.location.href = "";
        },
        error: function (la) {

            alert(la);
            window.localStorage.setItem("token", "");
            window.location.href = url;
        }
    });
}
