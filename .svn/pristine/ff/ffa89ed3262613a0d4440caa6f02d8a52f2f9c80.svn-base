function toast(title, text, type) {
    new PNotify({
        title: title,
        text: text,
        type: type,
        delay: 3000,
        styling: 'fontawesome',
        swipe_dismiss: true,
        animate: {
            animate: true,
            in_class: 'bounceIn',
            out_class: 'bounceOut'
        }
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$g");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function() {
    
})
//'ngBootstrap',