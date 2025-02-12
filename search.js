const search = document.getElementById("search");
search.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        var search_text = search.value
        search.value = ''
        window.location.href = `http://google.com/search?q=${search_text}`
    }
});

window.addEventListener("DOMContentLoaded", function() {
    search.value = ''
});
