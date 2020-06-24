<template>
    <div>
        <div class="container-fluid mb-5">
            <div class="row mt-5">
                <div class="col-md-3">
                    <div class="list-group" role="tablist">
                        <a href="javacript:;" @click="changeTab('itemList')" class="list-group-item list-group-item-action active" data-toggle="list" role="tab">全部</a>
                        <a href="javacript:;" @click="changeTab('inks')" class="list-group-item list-group-item-action" data-toggle="tab" role="tab">墨水</a>
                        <a href="javacript:;" @click="changeTab('pens')" class="list-group-item list-group-item-action" data-toggle="tab" role="tab">鋼筆</a>
                        <a href="javacript:;" @click="changeTab('paper')" class="list-group-item list-group-item-action" data-toggle="tab" role="tab">紙張</a>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="row">
                        <app-item v-for="(item, index) in itemList" :item="item" :imIndex="index" :key="index" @openModal="openModal"></app-item>
                    </div>
                    <div v-show="show"> 
                        <nav aria-label="page navigation " class="my-3 mt-4">
                            <ul class="pagination justify-content-center">
                                <li class="page-item previous disabled">
                                    <a class="page-link" href="javacript:;" 
                                     @click="changeTab('itemList')" aria-disabled="true" tabindex="-1" >
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li class="page-item active" aria-current="page">
                                    <a class="page-link " href="javacript:;" 
                                    @click="changeTab('itemList')">1<span class="sr-only">(current)</span></a>
                                </li>
                                <li class="page-item page2">
                                    <a class="page-link" href="javacript:;"
                                    @click="changeTab('page2')">2</a>
                                </li>
                                <li class="page-item next">
                                    <a class="page-link" href="javacript:;" 
                                    @click="changeTab('page2')" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header ">
                                <h5 class="modal-title text-primary" id="exampleModalLabel">{{selectedItem.name}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">X</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="productImg">                                
                                    <img :src="selectedItem.imgUrl" alt="商品" class="img-fluid">
                                </div>
                                <p style="color:#767676">{{selectedItem.text}}</p>
                                <div class="d-flex justify-content-between align-items-baseline mt-4">
                                    <small><del class="ogPrice">原價:NT${{selectedItem.ogPrice}}</del></small>
                                    <div class="h5 text-primary">NT${{selectedItem.price}}</div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <div class="btn-group countBtn-group d-flex justify-content-start">
                                    <button class="btn" @click="minus">-</button>
                                    <input type="text" class="btn" v-model="qty">
                                    <button class="btn" @click="add">+</button>
                                </div>
                                <button class="btn btn-outline-info btn-cart align-self-top justify-content-center"
                                        @click="buyItems()">
                                    <i class="fas fa-shopping-cart d-inline-block"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import $ from 'jquery';
import item from '../items/item';
export default {
    components:{
        appItem:item,
    },
    mounted(){
        this.itemList = this.pens.concat(this.inks).concat(this.paper).slice(0,6);
        this.show=true;
    },
    data(){
        return{
            show:false,
            qty:1,
            selectedItem:{},
            //被選到的item
            itemList:[],
            //現在畫面上要顯示的items
            inks:[
                {   id:1,
                    imgUrl:'static/pictures/ink01.png',
                    name:'J. HERBIN 1670 銀灰 ',
                    ogPrice:870,
                    text:'J. Herbin 為國際知名的古老墨水品牌，成立於西元1670年法國波旁王朝時期，其封臘及墨水為太陽王路易十四以及著名文學家－維特雨果所愛用；J. Herbin 特別推出了 "1670” 340 週年 50ml 瓶裝限量紀念墨水 以慶祝其卓越的歷史。',
                    price:650,
                    count:10,
                    badge:'暢銷墨水',
                },  
                {   id:2,
                    imgUrl:'static/pictures/ink02.png',
                    name:' Pilot Iroshizuku 色彩雫夕燒',
                    ogPrice:620,
                    text:'日本有許多美麗的自然風光，並有非常美麗的名字。Iroshizuku系列是從其美麗的場景中創作的彩色墨水。給您寫的更多的樂趣和樂趣。',
                    price:580,
                    count:5,
                    badge:'暢銷墨水',

                },  
                {   id:3,
                    imgUrl:'static/pictures/ink03.png',
                    name:"Caran D'ache Orange 卡達橘",
                    ogPrice:1280,
                    text:'瑞士卡達經典款12色墨水瑞士製造玻璃瓶身,金屬瓶蓋50ml容量,瓶底斜面特殊設計。',
                    price:950,
                    count:8,                    
                    badge:'暢銷墨水',
                },  
                {   id:4,
                    imgUrl:'static/pictures/ink04.png',
                    name:'Montblanc Pink 萬寶龍粉',
                    ogPrice:2200,
                    text:'萬寶龍隆重呈獻全新粉色系列，致力實踐對書寫文化和書寫樂趣矢志不移的追求。',
                    price:990,
                    count:3,
                    badge:'暢銷墨水',
                },
                {   id:5,
                    imgUrl:'static/pictures/ink05.png',
                    name:'Pelikan 4001 百利金綠 ',
                    ogPrice:315,
                    text:'百利金著名的4001墨水，至今已超過一百多年，百利金一直經過測試與實際使用後的品質肯定，百利金4001墨水在鋼筆書寫文化中成為最經典眾多著名的產品之一。',
                    price:240,
                    count:2,
                    badge:'暢銷墨水',
                },
            ],
            pens:[
                {
                    id:6,
                    imgUrl:'static/pictures/pen01.png',
                    name:'LAMY safari 狩獵者霧黑 F ',
                    ogPrice:1200,
                    text:' LAMY創建於1930年於德國美麗的古都海德堡。LAMY公司由C.JOSET(C.約瑟夫)創立屬於獨立家庭擁有的企業。LAMY品牌自1952 年以來就證明了它的獨特和設計創新，LAMY起初於1952發表第一支全新異於不同設計的筆款LAMY 27鋼筆系列。LAMY 2000系列就是紀念當時發表於出生1966設計款的特別樣式。',
                    price:900,
                    count:5,
                    badge:'新手推薦',
                },
                {
                    id:7,
                    imgUrl:'static/pictures/pen02.png',
                    name:'Kawec SKYLINE Sport 薄荷綠 F',
                    ogPrice:1200,
                    text:'J. Herbin 為國際知名的古老墨水品牌，成立於西元1670年法國波旁王朝時期，其封臘及墨水為太陽王路易十四以及著名文學家－維特雨果所愛用；J. Herbin 特別推出了 "1670” 340 週年 50ml 瓶裝限量紀念墨水 以慶祝其卓越的歷史。',
                    price:1160,
                    count:7,
                    badge:'新手推薦',
                },    
            ],
            paper:[
                {
                    id:8,
                    imgUrl:'static/pictures/paper01.png',
                    name:'Traveler’s Notebook ',
                    ogPrice:1300,
                    text:' MIDORI的Traveler’s Notebook每一本都是在泰國清邁手工製作，使用越久皮革的質感越好。內頁更換簡單方便。不僅可以拿來記錄旅行的點滴，也適合用於平日生活及工作的紀錄。Traveler’s Notebook，可更換的內頁用紙是在日本生產--MD PAPER提供柔和的觸感和舒適的書寫感，另有多項不同選擇的收納內頁，是喜愛旅行的您的首選。',
                    price:1150,
                    count:10,
                    badge:'熱賣中',
                }
            ],            
        }
    },
    methods:{
        ...mapActions('cart', ['addItem']),
        changeTab(tabItem){
            switch (tabItem) {
                case 'itemList':
                    this.show=true;
                    this.itemList = this.pens.concat(this.inks).concat(this.paper).slice(0,6);
                    document.getElementsByClassName('page-item')[0].classList.add("disabled");
                    document.getElementsByClassName('page-item')[1].classList.add("active");
                    document.getElementsByClassName('page-item')[2].classList.remove("active");
                    document.getElementsByClassName('page-item')[3].classList.remove("disabled");
                    break;
                case 'inks':
                    this.itemList = this.inks.concat([]);
                    this.show=false;
                    break;
                case 'paper':
                    this.itemList = this.paper.concat([]);
                    this.show=false;
                    break;
                case 'pens':
                    this.itemList = this.pens.concat([]);
                    this.show=false;
                    break;
                case 'page2':
                    this.itemList = this.pens.concat(this.inks).concat(this.paper).slice(-2);
                    this.show=true;
                    document.getElementsByClassName('page-item')[0].classList.remove("disabled");
                    document.getElementsByClassName('page-item')[1].classList.remove("active");
                    document.getElementsByClassName('page-item')[2].classList.add("active");
                    document.getElementsByClassName('page-item')[3].classList.add("disabled");
                    break;
                default:
                    break;
            }
        },
        // aaa({p:price, name, id}) {
        //     if(p > 1000) {
                
        //     }
        // },
        openModal(item){
            this.selectedItem = item;
            $('#myModal').modal('show');
        },
        //被選到的item是從父層傳到子層再傳回父層去取被點的this.item
        minus(){
            if(this.qty>1){
                this.qty--;
            }
        },
        add(){
            if(this.qty<this.selectedItem.count){
                this.qty++;
            }else{
                alert("抱歉，商品購買量超過庫存量");
            }
        },
        buyItems(){
            const items = {
                ...this.selectedItem,
                quantity: this.qty,
            };
            this.addItem(items);
        }
    },
}
</script>
<style scoped>
   @media (min-width: 1200px){
        .container-fluid{
            max-width: 1110px;
        }
    }
    @media (min-width: 992px) and  (max-width: 1199px){
        .container-fluid{
            max-width: 960px;
        }
    }
    @media (min-width: 768px) and  (max-width: 991px){
          .container-fluid{
            max-width: 738px;
        }
        .col-md-4{
            max-width: 50%;
        }
    }
    @media (min-width: 320px) and  (max-width: 767px){
       .col-md-3{
           width: 95%;
           margin: auto;
       }
       .col-md-4{
           width: 95%;
           margin: auto;
       }
    }
    .list-group-item.active{
        background-color:#EE8A42;
        border-color: #EE8A42;
        opacity: .9;
        border-radius: 5px;
    }  
    .list-group-item{
        border: NONE;
        box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,.05);
        /* background: rgba(234, 234, 234, .5) */
    }
    .page-item.active .page-link{
        background-color:#EE8A42;
        border-color: #EE8A42;
        color: #fff;
        z-index: 1;
    }
    .page-link{
        color: #ee8a42;
    }
    /* .productImg{
        width: 400px;
        height: 400px;
        margin: auto;
    } */
   img{
      width: 100%;
   }
   .ogPrice{
    font-size: 1rem;
    color: #b6b3b3;
}
    .countBtn-group {
        border: 1px solid #ced4da;
        border-radius: 25px;
        overflow: hidden;
    }
    .btn-cart{
        border-radius: 50%;
        margin-left: 30px;
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        color: orange;
        background-image:none;
        border-color:orange;
    }
    .btn-cart:hover{
        background-color: orange;
        color: white
    }
</style>
