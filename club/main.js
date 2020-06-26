$(this.document).ready(function(){
    //一次產生固定標題列
    $("#courseTable").append(
        "<tr><th>場次</th><th>時間</th><th>主題</th></tr>"
    );
    //反覆產生資料列
    let topicCount = topicsArray.length;

    //計算一天有多少毫秒
    let oneDayMilliseconds = 24*60*60*1000;

    for(let x=0; x<topicCount; x++){
        let thisDate = new Date(startDate.getTime()+7*x*oneDayMilliseconds);
        $("#courseTable").append(
            "<tr>"+
            "<td>"+ (x+1) + "</td>" +
            "<td>"+ thisDate.toLocaleDateString().slice(5) +"</td>"+
            "<td>"+ topicsArray[x] +"</td>"+
            "</tr>"
        );//每一列有場次、預計日期、主題
    }
});
