
var jz=location.search.split("=")[1];
if(jz=="-1"){
ajax({
    type: "get",
    url: "guide/gouwu.html",
    dataType: "text"
}).then(html=>{
    document.getElementById("rightCentlTab").innerHTML = html;
})
}

//新手指南
document.querySelector("[data-guide=xinshou]").onclick=(e)=>
{
    e.preventDefault();
    ajax({
        type: "get",
        url: "guide/xinshou.html",
        dataType: "text"
    }).then(html=>{
        document.getElementById("rightCentlTab").innerHTML = html;
    });
}
//支付方式
document.querySelector("[data-guide=zhifu]").onclick=e=>
{
    e.preventDefault();
    ajax({
        type: "get",
        url: "guide/zhifu.html",
        dataType: "text"
    }).then(html=>{
        document.getElementById("rightCentlTab").innerHTML = html;
    });
}
//配送方式
document.querySelector("[data-guide=peisong]").onclick=e=>{
    e.preventDefault();
    ajax({
        type: "get",
        url: "guide/peisong.html",
        dataType: "text"
    }).then(html=>{
        document.getElementById("rightCentlTab").innerHTML = html;
    });
}
//自提流程
document.querySelector("[data-guide=ziti]").onclick=e=>{
    e.preventDefault();
    ajax({
        type: "get",
        url: "guide/ziti.html",
        dataType: "text"
    }).then(html=>{
        document.getElementById("rightCentlTab").innerHTML = html;
});
}
//积分说明
document.querySelector("[data-guide=jifen]").onclick=e=>{
    e.preventDefault();
    ajax({
        type: "get",
        url: "guide/jifen.html",
        dataType: "text"
    }).then(html=>{
        document.getElementById("rightCentlTab").innerHTML = html;
    });
}
//常见问题
document.querySelector("[data-guide=changjian]").onclick=e=>{
    e.preventDefault();
    ajax({
        type: "get",
        url: "guide/changjian.html",
        dataType: "text"
    }).then(html=>{
        document.getElementById("rightCentlTab").innerHTML = html;
    });
}
//售后服务
document.querySelector("[data-guide=shouhou]").onclick=e=>{
    e.preventDefault();
    ajax({
        type: "get",
        url: "guide/shouhou.html",
        dataType: "text"
    }).then(html=>{
        document.getElementById("rightCentlTab").innerHTML = html;
});
}
//公司介绍
document.querySelector("[data-guide=gongsi]").onclick=e=>{
    e.preventDefault();
    ajax({
        type: "get",
        url: "guide/gongsi.html",
        dataType: "text"
    }).then(html=>{
        document.getElementById("rightCentlTab").innerHTML = html;
});
}
//品牌故事
document.querySelector("[data-guide=pinpai]").onclick=e=>{
    e.preventDefault();
    ajax({
        type: "get",
        url: "guide/pinpai.html",
        dataType: "text"
    }).then(html=>{
        document.getElementById("rightCentlTab").innerHTML = html;
});
}
//公司愿景
document.querySelector("[data-guide=yuanjing]").onclick=e=>{
    e.preventDefault();
    ajax({
        type: "get",
        url: "guide/yuanjing.html",
        dataType: "text"
    }).then(html=>{
        document.getElementById("rightCentlTab").innerHTML = html;
});
}
//客户服务
document.querySelector("[data-guide=kehu]").onclick=e=>{
    e.preventDefault();
    ajax({
        type: "get",
        url: "guide/kehu.html",
        dataType: "text"
    }).then(html=>{
        document.getElementById("rightCentlTab").innerHTML = html;
});
}