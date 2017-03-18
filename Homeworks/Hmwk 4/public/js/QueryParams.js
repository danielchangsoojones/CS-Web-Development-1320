//Purpose: takes a query parameter (name, room, etc.) in the form of a string, then it will return the value for that parameter. So, if it was passed name, it might return Daniel
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    
    return undefined;
}