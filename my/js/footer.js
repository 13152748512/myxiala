(()=>{
    ajax({
        type:"get",
        url:"footer.html",
    }).then(footer=>{
        document.getElementById("footer").innerHTML=footer;
    })
})();