<template>
    <div>
        <app-header></app-header>        
        <div  class="container mb-5">
            <section class="row justify-content-center">
                <div class="col-md-8">
                    <div class="steps d-flex">
                        <div class="step flex-fill">
                            <span class="font-Montserat number active">1</span>
                            <p class="step-text text-primary">輸入訂單資料</p>
                        </div>
                        <div class="step flex-fill">
                            <span class="number">2</span>
                            <p class="step-text">金流付款</p>
                        </div>
                        <div class="step flex-fill">
                            <span class="number">3</span>
                            <p class="step-text ">結帳完成</p>
                        </div>
                    </div>
                </div>
            </section>
            <div class="row">
                <div class="col-md-6">
                    <h5 class="text-info">購物明細</h5>
                    <div class="cart-menu-scroll">
                        <table class="table table-sm border-bottem-0">
                            <tbody>
                                <tr v-for="item in cartList" :key="item.id">
                                    <td class="align-middle text-center">
                                        <a class="btn-sm btn btn-outline-danger" href="javascript:;"
                                            @click="deleteItem(item.id)" ><i class="far fa-trash-alt"></i></a>
                                    </td>
                                    <td class="align-middle">
                                        <img style="width:40px;heihgt:40px" :src="item.imgUrl" alt="商品"></td>
                                    <td class="align-middle">
                                        <div class="cart-title ">{{item.name}}</div>
                                        <div class="cart-unit text-info">{{item.quantity}} 個</div>
                                    </td>
                                    <td class="align-middle text-primary ">NT${{item.price}}</td>
                                </tr>
                            </tbody>   
                            <tfoot v-show="this.totalAmount === 0 ? false : true">
                                <tr>
                                    <td colspan="3" class="text-right">
                                        <span>小計</span>
                                    </td>
                                    <td colspan="1" class="align-middle text-primary">
                                        <span class="align-middle">NT${{totalAmount}}</span>
                                    </td>
                                </tr>
                                <tr v-if="discounted ? true : false" :style="discounted === true ? 'color:#ee8a42;font-weight:bold' : ''">
                                    <td colspan="3" class="text-right">
                                        <span>折扣後</span>
                                    </td>
                                    <td colspan="1" class="align-middle">
                                        <span class="align-middle">NT${{discountedTotal}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" style="border-top:0px;padding:.9rem 0">
                                        <div class="input-group mb-3">
                                            <input v-model="coupon" type="text" placeholder="請輸入折扣碼" class="form-control">
                                            <div class="input-group-append">
                                                <button type="submit" class="btn btn-warning" style="background:#ee8a42;color:#fff"
                                                        @click="useCoupon">送 出</button>
                                            </div>
                                        </div>  
                                    </td>
                                </tr>
                            </tfoot> 
                        </table>
                        <div v-if="show" class="alert-backgroud">
                            <div class="cartAlert alert alert-warning alert-dismissible fade show" role="alert">
                                <strong>購物車內尚無商品</strong> 
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                        <router-link to="/">
                            <a class="btn btn-outline-primary float-right mt-4" href="javascript:;">繼續購物</a>
                        </router-link>
                    </div>         
                </div>
                <div class="col-md-6" >
                    <h5 class="text-info">訂購資料</h5>
                    <form id="form">
                        <div class="form-group row" style="margin-bottom:0px;">
                            <div class="col-md-6">
                                <label for="name">姓名</label>
                                <input v-validate="'required'" type="text" name="name" id="name" placeholder="請輸入姓名" class="form-control"
                                       :class="{'is-invalid':errors.has('name')}" v-model="orderName">
                                <small class="text-danger" v-if="errors.has('name')">請輸入姓名</small>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="tel">電話</label>
                                <input type="tel" id="tel" placeholder="請輸入電話" class="form-control" name="tel"
                                       :class="{'is-invalid':errors.has('tel')}" v-validate="'required'" v-model="orderTel">
                                <small class="text-danger" v-if="errors.has('tel')">請輸入電話</small>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email">電子信箱
                            </label>
                            <input type="email" id="email" placeholder="請輸入電子信箱" class="form-control" name="email"
                                   :class="{'is-invalid':errors.has('email')}" v-validate="'required|email'" v-model="orderEmail">
                                    <small class="text-danger" v-if="errors.has('email')">請輸入電子信箱</small>
                        </div>
                        <div class="form-group">
                            <label for="address">地址</label>
                            <input type="text" id="address" placeholder="請輸入地址" class="form-control" name="address"
                                   :class="{'is-invalid':errors.has('address')}" v-validate="'required'" v-model="orderAddress">
                                    <small class="text-danger" v-if="errors.has('address')">請輸入地址</small>
                        </div>
                        <div class="form-group">
                            <label for="ps">備註<small class="text-info">(選填)</small></label>
                            <textarea id="ps" rows="5" placeholder="請輸入訊息" class="form-control"
                                      v-model="orderPs"></textarea>
                        </div> 
                    </form>
                    <router-link to='/payment'>
                        <a href="javascript:;" class="btn btn-block checkout">付款去</a>
                    </router-link>
                </div>
            </div>
        </div> 
        <app-footer></app-footer>
    
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import $ from 'jquery'
import Header from '../home/Header'
import footer from '../home/Footer'
export default {
    components:{
        'app-header':Header,
        'app-footer':footer,
    },
    name: "Validation",
    data() {
        return {
            show:false,
            orderName: null,
            orderTel: null,
            orderEmail:null,
            orderAddress: null,
            orderPs: null,
            coupon: null,
        }
    },
    computed:{
        ...mapState('cart', ['cartList','discountedTotal','discounted',]),
        // cartList(){
        //     return this.$store.state.cart.cartList;
        // },
        ...mapGetters('cart',['totalAmount',])
    },
    mounted() {
        // console.log(document.getElementById("coupon"));
    },
    beforeRouteLeave(to, from, next){
        if (to.path === '/payment') {
            this.$validator.validate().then((result) => {
                if (result) {
                    this.collect_info({
                        orderName: this.orderName,
                        orderTel: this.orderTel,
                        orderEmail: this.orderEmail,
                        orderAddress: this.orderAddress,
                        orderPs: this.orderPs,
                    });
                    if( this.$store.state.cart.cartList.length>0){
                        next();
                    }else{
                        this.show = true;
                        $('alert').alert()
                        setInterval(()=>this.show =false,2000);
                    }
                }
            });

        } else {
            next();
        }
    },
    methods:{
        ...mapActions('cart', ['deleteItem','discount']),
        ...mapMutations('cart',['collect_info',]),
        // deleteItem(){
        //     const delOrder = {
        //          ...this.item
        //     };
        //     this.deleteItem(delOrder);
        // },
        useCoupon() {
            if( this.coupon === "8888" ){
                // this.discountedTotal = this.totalAmount*0.8;
                // this.discounted = true;
                this.discount(0.8);
            }   
        }, 
    }
}
</script>
<style scoped>
label{
    color: #494949;
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
.cart-menu-scroll{
        /* border-bottom: 1px solid #dee2e6; */
        margin: 3px 0 10px;
        max-width: 480px;
        overflow-y: auto;
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
    z-index: 999;
}
.cartAlert{
    width: 50%;
    position: fixed;
    left: 30%;
    top: 50%;
    z-index: 1000;
}
</style>
