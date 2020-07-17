document.write("<script type='text/javascript' src='./js/html2canvas.js'></script>");

window.onload = function() {
    let t1 = "2021/01/01 00:00:00";
    let dateEnd = new Date(t1);
    let dateBegin = new Date();
    
    let dateDiff = dateEnd.getTime() - dateBegin.getTime();
    day = parseInt(dateDiff/(24 * 3600 * 1000));

    let time_view = document.querySelector('.day');
    time_view.innerHTML = day;

    let input_content = document.querySelector('.input-content');
    let input_img_url = document.querySelector('.input-img-url');

    input_content.addEventListener('input', (e)=>{
        let subcontent = document.querySelector('.subcontent span');
        subcontent.innerHTML = e.target.value;
    });

    input_img_url.addEventListener('input', (e)=>{
        let img = document.querySelector('.container');
        img.style.backgroundImage = 'url('+ e.target.value +')';
    });

    // 选择本地图片

    let select_local_image_btn = document.querySelector('#select-local-image');
    select_local_image_btn.addEventListener('click', selectImage);

    // 下载

    let download_btn = document.querySelector('#download');
    download_btn.addEventListener('click', snapshoot);

    let content = document.querySelector('.container');
    let width = content.offsetWidth,//canvasContent.offsetWidth || document.body.clientWidth; //获取dom 宽度
    height = content.offsetHeight;//canvasContent.offsetHeight; //获取dom 高度
    // canvas = document.createElement("canvas"), //创建一个canvas节点
    // scale = 4; //定义任意放大倍数 支持小数
    // canvas.width = width * scale; //定义canvas 宽度 * 缩放
    // canvas.height = height * scale; //定义canvas高度 *缩放
    // canvas.style.width = content.offsetWidth * scale + "px";
    // canvas.style.height = content.offsetHeight * scale + "px";
    // canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
    const scale = 2;
    let opts = {
        scale: scale, // 添加的scale 参数
        // canvas: canvas, //自定义 canvas
        logging: false, //日志开关，便于查看html2canvas的内部执行流程
        // width: width, //dom 原始宽度
        // height: height,
        useCORS: true // 【重要】开启跨域配置
    };

    function snapshoot(){
        html2canvas(content, opts).then(function(canvas){
           let imgUrl = canvas.toDataURL('image/png');
           // window.location.href = imgUrl;
           var dlLink = document.createElement('a');
           dlLink.download = day;
           dlLink.href = imgUrl;
           dlLink.dataset.downloadurl = ['image/png', dlLink.download, dlLink.href].join(':');
           document.body.appendChild(dlLink);
           dlLink.click();
           document.body.removeChild(dlLink);
        }) 
     }
}

function selectImage(fileDOM) {
    var file = fileDOM.files[0], // 获取文件
        imageType = /^image\//,
        reader = '';

    // 文件是否为图片
    if (!imageType.test(file.type)) {
        alert("请选择图片！");
        return;
    }
    // 判断是否支持FileReader    
    if (window.FileReader) {
        reader = new FileReader();
    }
    // IE9及以下不支持FileReader
    else {
        alert("您的浏览器不支持图片预览功能，如需该功能请升级您的浏览器！");
        return;
    }
    // 读取完成    
    reader.onload = function (e) {
        let img = document.querySelector('.container');
        console.log(e.target.result);
        img.style.backgroundImage = 'url('+ e.target.result +')';
    };
    reader.readAsDataURL(file);
}