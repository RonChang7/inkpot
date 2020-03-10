<template>
    <div>
        <!-- <app-header></app-header> -->
         <section class="row justify-content-center">
                <div class="col-md-8">
                    <div class="steps d-flex">
                        <div class="step flex-fill">
                            <span class="font-Montserat number">1</span>
                            <p class="step-text">輸入訂單資料</p>
                        </div>
                        <div class="step flex-fill">
                            <span :class="finishPayment === false ? 'active' : ''" class="number">2</span>
                            <p :class="finishPayment === false ? 'text-primary' : ''" class="step-text">金流付款</p>
                        </div>
                        <div class="step flex-fill">
                            <span :class="finishPayment === true ? 'active' : ''" class="number">3</span>
                            <p :class="finishPayment === true ? 'text-primary' : ''" class="step-text ">結帳完成</p>
                        </div>
                    </div>
                </div>
            </section>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="mt-3 mb-4 text-info">
                    <h4>購買資訊</h4>
                </div>
                <table class="table table-sm table-striped">
                    <thead>
                        <tr class="bg-success text-white">
                            <td colspan="2" class="px-2 align-middle">商品資訊</td>
                            <td class="align-middle">數量</td>
                            <td class="align-middle px-2">價格</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cartList" :key="item.id">
                            <td class="align-middle px-2">
                                <img style="width:40px;heihgt:40px" :src="item.imgUrl" alt="商品圖片">
                            </td>
                            <td class="align-middle px-2">
                                <div class="cart-title">
                                    {{ item.name }}
                            </div> 
                                <small v-if="discounted === true ? true : false" 
                                        :style="discounted === true ? 'color:#ee8a42':''">已套用優惠券</small>
                            </td>
                            <td class="align-middle px-2 cart-unit text-info">                                       
                                {{ item.quantity }} 瓶
                            </td>
                            <td v-if="discounted === false ? true : false" class="align-middle px-2">
                                <div class="text-primary">
                                    NT${{ item.price }}
                                </div>

                            </td>
                            <td v-if="discounted === true ? true : false" class="align-middle px-2">
                                <small class="text-primary" style="text-decoration: line-through;" >
                                    NT${{ item.price }}
                                </small>
                                <div style="color:#ee8a42;">
                                    NT${{ item.price*.8}}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-end px-2 pb-3">
                    <span class="pr-3">總計</span>
                    <span v-if="discounted === false ? true : false" class="h4 text-primary">NT${{ totalAmount }}</span>
                    <span v-if="discounted === true ? true : false"  :style="discounted === true ? 'color:#ee8a42;font-weight:bold' : ''"
                            class="h4">NT$ {{ discountedTotal }}</span>
                </div>    
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-8">
                    <div class="mt- mb-4 text-info">
                    <h4>個人資訊</h4>
                </div>
                <table class="table table-sm table-striped ">
                    <thead>
                        <tr>
                            <td class="bg-success text-white" colspan="3">訂單資料</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>姓名</td>
                            <td class="text-secondary "> {{info.orderName}}</td>
                        </tr>
                        <tr>
                            <td>電話</td>
                            <td class="text-secondary ">{{info.orderTel}}</td>
                        </tr>
                        <tr>
                            <td>電子信箱</td>
                            <td class="text-secondary ">{{info.orderEmail}}</td>
                        </tr>
                        <tr>
                            <td>地址</td>
                            <td class="text-secondary ">{{info.orderAddress}}</td>
                        </tr>
                        <tr v-if="!info.orderPs ? false : true">
                            <td>備註</td>
                            <td class="text-secondary ">{{info.orderPs}}</td>
                        </tr>
                        <tr>
                            <td>付款資訊</td>
                            <td class=" text-danger font-weight-bold" v-if="finishPayment === false ? true : false">尚未付款</td>
                            <td class=" text-success font-weight-bold" v-if="finishPayment === true ? true : false">完成付款</td>
                        </tr>
                    </tbody>
                </table>
                <button class="mt-4 mb-5 float-right text-white btn" style="background:#ee8a42"
                        @click="pay" 
                        v-if="finishPayment === true ? false : true">確認付款
                </button>
                <div v-if="show" class="alert-backgroud">
                     <div class="paymentAlert alert alert-success alert-dismissible fade show" role="alert">
                        <strong>您已完成付款</strong> 
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                <a class="mt-4 mb-5 float-right btn btn-outline-primary"
                    v-if="finishPayment === true ? true : false" href="/">繼續購物
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import $ from 'jquery';
import Header from '../home/Header'
import footer from '../home/Footer'
export default {
    components:{
        'app-header':Header,
        'app-footer':footer,
    },
    data(){
        return{
            finishPayment: false,
            show:false,
        }
    },
    computed:{
        ...mapState('cart', 
        ['cartList','discountedTotal','discounted','info']),
        ...mapGetters('cart',['totalAmount',])
    },
    methods:{
        ...mapMutations('cart',['discount']),
        pay(){
            this.finishPayment=true;
            this.show = true;
            $('alert').alert()
            setInterval(()=>this.show =false,2000);
            // clearInterval
            // this.show = false;
            // $('alert').on('closed.bs.alert', function () {
            
            // })
            
        }
    }
}
</script>
<style>
@media (max-width: 767px){ 
    .row{
        margin: 0;
    }
    .col-md-6{
        padding: 0;
    }
}
.steps{
    margin:0 auto ;
    max-width: 320px;
    width: 100%;
}
.step{
    flex-direction: column;
    margin: 35px 5px 25px;
    position: relative;
    text-align: center;
    width: 33.3%;
}
.number{
    border-radius: 50%;
    width: 45px;
    height: 45px;
    background: #f0efe9;
    color: #767676;
    box-shadow: 0 3px 13px #d7d7d7;
    display: inline-block;
    border: 2px solid rgb(235, 229, 229);
    font-size: 15px;
    font-weight: 600;
    line-height: 45px;
    margin-bottom: 8px;
}
.active{
    background: #ee8a42;
    color: #fff;
}
.step-text{
    font:.9rem;
    color: #767676;
}
.cart-title{
    font-size: 1rem;
    color: #767676;
}
.cart-unit{
    font-size: .95rem;
    margin-top: 5px;
}
.checkout{
    color:#fff;
    background-color: #EE8A42;
    border-color: #ffc107;
}
.alert-backgroud{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .6);
}
.paymentAlert{
    width: 60%;
    position: fixed;
    left: 20%;
    top: 50%;
}
</style>