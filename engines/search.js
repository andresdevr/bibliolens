function search()
{
    console.log("gsg");
    var form = document.forms["searchForm"]
    var titulo = form["titulo"].value;
    location.href = __dirname + '\\queryResults.html?titulo=' + titulo + '&' + "page=0";
}