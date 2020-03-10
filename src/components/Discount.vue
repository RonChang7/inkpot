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
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var w = canvas.parentNode.offsetWidth;
        var h = canvas.parentNode.offsetHeight;
        canvas.width = w;
        canvas.height = h;
        var grd=ctx.createLinearGradient(0,0,175,50);
        grd.addColorStop(0,"#fff");
        grd.addColorStop(1,"#aaa");
        // 画一个矩形, 遮住背景
        ctx.fillStyle = grd;
        ctx.fillRect(0,0,w,h);
         //*写字*/
        // const img = new Image();
        // img.src ="static/pictures/alert.png";
        // ctx.drawImage( img,30,20,200,214);
        ctx.fillStyle = "#767676";
        ctx.font = "400 37px SFMono-Regular,Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace";
        ctx.textAlign = "center";
        ctx.fillText("iNKPOT", w / 2, (h - 20) / 2);
        ctx.font = "700 37px microsoft yahei"
        ctx.fillText("開 幕 優 惠", w / 2, (h + 70) / 2);

        // 设置合成属性, 重复的地方不渲染(透明)
        ctx.globalCompositeOperation = 'destination-out';     
        var scratcherBack = document.getElementsByClassName("scratcherBack");
        scratcherBack[0].style.display = "block";

        canvas.onmousedown = function(){
            canvas.onmousemove = function(e){
                // 获取鼠标相对于画布左上角的位置
                var x = e.offsetX,y = e.offsetY;
                // 画圆
                ctx.arc(x,y,20,0,2 * Math.PI);
                // 填充
                ctx.fill();
            }
            canvas.onmouseup = function(){
                canvas.onmousemove = null;
                canvas.onmouseup = null;
            }
            onmousedown = false;
            var num = 0;
            var datas = ctx.getImageData(50, 25, w - 110, h - 50);
            for (var i = 0; i < datas.data.length; i++) {
                if (datas.data[i] == 0) {
                num++;
                };
            };
            if (num >= datas.data.length * .7) {
                // 达到面积要求时执行的内容    
                alert("恭喜獲得優惠！");   
            }
        }
        canvas.ontouchstart = () =>{
            canvas.ontouchmove = function(e){
                // 获取鼠标相对于画布左上角的位置
                var x = e.offsetX,y = e.offsetY;
                // 画圆
                ctx.arc(x,y,20,0,2 * Math.PI);
                // 填充
                ctx.fill();
            }
            canvas.ontouchstop = function(){
                canvas.ontouchmove = null;
                canvas.ontouchs = null;
            }
            var num = 0;
            var datas = ctx.getImageData(50, 25, w - 110, h - 50);
            for (var i = 0; i < datas.data.length; i++) {
                if (datas.data[i] == 0) {
                num++;
                };
            };
            if (num >= datas.data.length * .7) {
                // 达到面积要求时执行的内容    
                alert("恭喜獲得優惠！");   
            }
        };
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
        height: 606px;
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