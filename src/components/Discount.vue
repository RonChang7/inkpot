<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid bg">
            <div class="row justify-content-center">
                <div class="col-md-8 mt-4 mb-4 text-title">
                    <p class="h3 mt-5 font-weight-bold text-center text-monospace">-</p>
                    <p class="h2 text-center text-monospace">coupon</p>
                    <div class="discount-alert">
                        <img src="static/pictures/alert.png" alt="">
                    </div>    
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-8 text-center">
                    <!-- <h5 class="text-danger text-center">開幕慶祝</h5> -->
                    <p class="mt-3 mb-4 px-2 text">刮開並輸入以下代碼，即可獲得全館優惠</p>
                    <div class="scratcher text-center">
                        <div class="scratcher-area">
                            <canvas id="canvas"></canvas>
                            <div class="scratcherBack" style="display: none;">
                                <div class="font">至購物車輸入以下代碼</div>
                                <div class="num">8888</div>
                                <div class="font">獲得全館八折優惠</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
        <app-footer></app-footer>
    </div>
</template>
<script>
import $ from 'jquery'
import Header from './home/Header'
import Footer from './home/Footer'
export default {
    mounted(){
        var isDrawing, lastPoint;
        var canvas       = document.getElementById('canvas'),
            ctx          = canvas.getContext('2d'),
            brush        = new Image(),
            grd=ctx.createLinearGradient(0,0,175,50);
        var w = canvas.parentNode.offsetWidth;
        var h = canvas.parentNode.offsetHeight;
        canvas.width = w;
        canvas.height = h;
        var scratcherBack = document.getElementsByClassName("scratcherBack");
        scratcherBack[0].style.display = "block";
        grd.addColorStop(0,"#fff");
        grd.addColorStop(1,"#aaa");
                // 画一个矩形, 遮住背景
        ctx.fillStyle = grd;
        ctx.fillRect(0,0,w,h+30);
        ctx.fillStyle = "#767676";
        ctx.font = "400 37px SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace";
        ctx.textAlign = "center";
        ctx.fillText("iNKPOT", w / 2, (h - 20) / 2);
        ctx.font = "700 37px microsoft yahei"
        ctx.fillText("開 幕 優 惠", w / 2, (h + 70) / 2);
        brush.src = 'data:image/png;base64,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';
        
        canvas.addEventListener('mousedown', handleMouseDown, false);
        canvas.addEventListener('touchstart', handleMouseDown, false);
        canvas.addEventListener('mousemove', handleMouseMove, false);
        canvas.addEventListener('touchmove', handleMouseMove, false);
        canvas.addEventListener('mouseup', handleMouseUp, false);
        canvas.addEventListener('touchend', handleMouseUp, false);

        const distanceBetween = (point1, point2) => {
            return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
        }
        const angleBetween = (point1, point2) => {
            return Math.atan2( point2.x - point1.x, point2.y - point1.y );
        }        
        const getMouse = (e, canvas) => {
            var offsetX = 0, offsetY = 0, mx, my;
            if (canvas.offsetParent !== undefined) {
                do {
                offsetX += canvas.offsetLeft;
                offsetY += canvas.offsetTop;
                } while ((canvas = canvas.offsetParent));
            }
            mx = (e.pageX || e.touches[0].clientX) - offsetX;
            my = (e.pageY || e.touches[0].clientY) - offsetY;
            return {x: mx, y: my};
        }
        function handleMouseDown(e) {
            isDrawing = true;
            lastPoint = getMouse(e, canvas);
        }
        function handleMouseMove(e) {
            if (!isDrawing) { return; }
            e.preventDefault();
            var currentPoint = getMouse(e, canvas),
                dist = distanceBetween(lastPoint, currentPoint),
                angle = angleBetween(lastPoint, currentPoint),
                x, y;
            for (var i = 0; i < dist; i++) {
                x = lastPoint.x + (Math.sin(angle) * i) - 25;
                y = lastPoint.y + (Math.cos(angle) * i) - 25;
                ctx.globalCompositeOperation = 'destination-out';
                ctx.drawImage(brush, x, y);
            }
            lastPoint = currentPoint;
            }
        const handleMouseUp = ( e ) => {
            isDrawing = false;
        }
  

        
        
        
        // var canvas = document.getElementById('canvas');
        // var ctx = canvas.getContext('2d');
        // var w = canvas.parentNode.offsetWidth;
        // var h = canvas.parentNode.offsetHeight;
        // canvas.width = w;
        // canvas.height = h;
        // var grd=ctx.createLinearGradient(0,0,175,50);
        // grd.addColorStop(0,"#fff");
        // grd.addColorStop(1,"#aaa");
        // // 画一个矩形, 遮住背景
        // ctx.fillStyle = grd;
        // ctx.fillRect(0,0,w,h);
        //  //*写字*/
        // // const img = new Image();
        // // img.src ="static/pictures/alert.png";
        // // ctx.drawImage( img,30,20,200,214);
        // ctx.fillStyle = "#767676";
        // ctx.font = "400 37px SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace";
        // ctx.textAlign = "center";
        // ctx.fillText("iNKPOT", w / 2, (h - 20) / 2);
        // ctx.font = "700 37px microsoft yahei"
        // ctx.fillText("開 幕 優 惠", w / 2, (h + 70) / 2);

        // // 设置合成属性, 重复的地方不渲染(透明)
        // ctx.globalCompositeOperation = 'destination-out';     

        // canvas.ontouchstart = function(){
        //     canvas.ontouchmove = function(e){
        //         // 抓到第一個觸控時的位置
        //         var touchX=e.touches[0].pageX-e.touches[0].target.offsetLeft;
        //         var touchY=e.touches[0].pageY-e.touches[0].target.offsetTop;
 
        //         // var x = e.touches[0].clientX,y = e.touches[0].clientY;
        //         // 画圆
        //         ctx.arc(touchX,touchY,20,0,2 * Math.PI);
        //         // 填充
        //         ctx.fill();
        //     }
        //     canvas.ontouchend = function(){
        //         canvas.ontouchmove = null;
        //         canvas.ontouchend = null;
        //     }
        //     ontouchstart = false;
        //     var num = 0;
        //     var datas = ctx.getImageData(50, 25, w - 110, h - 50);
        //     for (var i = 0; i < datas.data.length; i++) {
        //         if (datas.data[i] == 0) {
        //         num++;
        //         };
        //     };
        //     if (num >= datas.data.length * .7) {
        //         // 达到面积要求时执行的内容    
        //         alert("恭喜獲得優惠！");   
        //     }
        // };
        // canvas.onmousedown = function(){
        //     canvas.onmousemove = function(e){
        //         // 获取鼠标相对于画布左上角的位置
        //         var x = e.offsetX,y = e.offsetY;
        //         // 画圆
        //         ctx.arc(x,y,20,0,2 * Math.PI);
        //         // 填充
        //         ctx.fill();
        //     }
        //     canvas.onmouseup = function(){
        //         canvas.onmousemove = null;
        //         canvas.onmouseup = null;
        //     }
        //     onmousedown = false;
        //     var num = 0;
        //     var datas = ctx.getImageData(50, 25, w - 110, h - 50);
        //     for (var i = 0; i < datas.data.length; i++) {
        //         if (datas.data[i] == 0) {
        //         num++;
        //         };
        //     };
        //     if (num >= datas.data.length * .7) {
        //         // 达到面积要求时执行的内容    
        //         alert("恭喜獲得優惠！");   
        //     }
        // };
        // var scratcherBack = document.getElementsByClassName("scratcherBack");
        // scratcherBack[0].style.display = "block";
    },
    components:{
        'app-header':Header,
        'app-footer':Footer,
    }  
}
</script>
<style scoped>
    @media (min-width: 1200px){
        .discount-alert{
            top: 4rem;
            left: 17rem;
        }
        .scratcher-area {
            width: 350px;
            height: 200px;
        }
        .discount-alert img{
            width: 100px;
        }
        .num{
             font-size: 64px;
         }
        .bg::after{
            animation: slide 2s infinite;
            background: linear-gradient(90deg,hsla(0,0%,100%,0) 0,hsla(0,0%,100%,.65) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0));
            content: "";
            transform: translateX(100%);
            z-index: -1;
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
    @media (min-width: 992px) and (max-width: 1199px){
        .discount-alert{
            top: 4rem;
            left: 9rem;
        }
        .scratcher-area {
            width: 350px;
            height: 200px;
        }
        .discount-alert img{
            width: 100px;
        }
         .num{
             font-size: 64px;
         }
        .bg::after{
            animation: slide 2s infinite;
            background: linear-gradient(90deg,hsla(0,0%,100%,0) 0,hsla(0,0%,100%,.65) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0));
            content: "";
            transform: translateX(100%);
            z-index: -1;
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
    @media (min-width: 768px) and (max-width: 991px){
        .discount-alert{
            top: 4rem;
            left: 3rem;
        }
        .scratcher-area {
            width: 350px;
            height: 200px;
        }
        .discount-alert img{
            width: 100px;
        }
         .num{
             font-size: 64px;
         }
        .bg::after{
            animation: slide 2s infinite;
            background: linear-gradient(90deg,hsla(0,0%,100%,0) 0,hsla(0,0%,100%,.65) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0));
            content: "";
            transform: translateX(100%);
            z-index: -1;
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
    @media (max-width: 767px) { 
        .discount-alert{
            top: 5rem;
            left: 2rem;
        }
        .scratcher-area {
            width: 290px;
            height: 165px;
        }
        .discount-alert img{
            width: 65px;
        }
        .num{
            font-size: 50px;
        }
    }
    .text-title{
    color: #007bff;
    animation: change 2s infinite;
    }
    @keyframes change{
        from{ color: #007bff; }
        to{ color: #dc3545; }
    }
    .bg{
        height: 73vh;
        background:linear-gradient(63deg,#ffd741,#ffe532 48%,#ffd741) ;
        opacity: .85;
    }
    @keyframes shake {
        from{transform: translateY(-10px)}
        to{transform: translateY(8px)}
    }
    .discount-alert{
        animation: shake 1.5s alternate infinite;
        position: absolute;
    }
    .scratcher-area {
        position: relative;
        margin: 0 auto;
        text-align: center;
        color: #c42d2d;
        border-radius: 20px;
        border: 8px solid #ee8a42;
    }
    #canvas {
        position: absolute;
        left: -8px;
        top: -8px;
        background: transparent;
        user-select: none;
    }
    .scratcher-area .font {
        color: #767676;
        font-size: 1rem;
        margin-top: .5rem;
        margin-bottom:.5rem;
    }

    .scratcher-area .num {
        font-weight: 700;
        color: #fff;
        text-align: center;
        text-shadow: 0 3px 5px #bdbdbd;
    }
    .text{
        color: #495057;
    }
    @keyframes slide {
        from{ transform: translateX(0%);}
        to{ 
            transform: translateX(100%);
            opacity: 0;}
    }
</style>