window.onload = function () {
    $(this.document).ready(function () {
        $("input").click(function () {
            //alert("Hi");
            //$("H1").text("Hello");
            /*$("H1").text($("li:first").text());
            $("H1").text($("li:last").text());
            $("H1").text($("li").eq(1).text());*/
            let numberOFListItem = $("#sel li").length;
            let randomChildNumber = Math.floor(Math.random() * numberOFListItem);
            let pictures = [
                "https://d1grca2t3zpuug.cloudfront.net/2017/11/ramen01-870x500.jpg",
                "https://1.bp.blogspot.com/-7G48Y99yc-s/XWPOFD_3DWI/AAAAAAABh2c/1MZ1eC0kHjgT-_IEKKJlyzxMV_NLOgZ3wCLcBGAs/s1600/carol%2B%25E9%25A6%2599%25E8%258F%2587%25E6%25BB%25B7%25E8%2582%2589%25E9%25A3%25AF05.jpg",
                "https://d.ecimg.tw/items/QFAHF7A9009FE73/000001_1560766982.jpg"
            ];
            $("#word").text($("#sel li").eq(randomChildNumber).text());
            $("#pic").attr("src", pictures[randomChildNumber]);
        });
    });
}