<template>
    <div class="col-md-4 mb-4 item" >
        <div class="card border-0">
            <div class="card-head"  @click="openModal">
                <img :src="item.imgUrl" class="card-img-top d-flex justify-content-center" alt="商品">
            </div>
        <div class="card-body">
            <span class="badge badge-warning text-white mb-2">{{ item.badge }}</span>
            <h5 class="card-title-info text-primary" @click="openModal">{{item.name}}</h5>
            <p class="card-text">{{item.text}}</p>
            <footer class="d-flex jusitify-content-center mt-2">
                <div class="d-flex flex-column">
                    <del class="ogPrice">NT${{item.ogPrice}}</del>
                    <div class="h5 text-primary">NT${{item.price}}</div>
                </div>
                <!-- <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="已入購物車"                      
                      data-placement="top" data-trigger="click focus"></span> -->
                    <button id="notice" class="btn btn-outline-info btn-cart align-self-top justify-content-center"
                            @click="buyItem">
                            <i class="fas fa-shopping-cart d-inline-block"></i></button>
                </span>
            </footer>
        </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import $ from 'jquery';
export default {
    props:['item'],
    methods:{
        ...mapActions('cart', ['addItem']),
        buyItem(){
            const order={
                ...this.item,
                // itemId:this.item.id,
                // itemPrice:this.item.price,
                quantity: 1,
            };
            // console.log(order);
            // if(this.quantity<10){
            //     this.quantity++;
            // }else{
            //     alert('抱歉，商品缺貨中');
            // }
            // this.addItem(order)
            // this.$store.dispatch('addItem', order);
            this.addItem(order);
            // $("[data-toggle='tooltip']").tooltip('show');
            // setInterval(()=>$("[data-toggle='tooltip']").tooltip('hide'),1000);
        },
        openModal() {
            this.$emit('openModal', this.item);
        },
        //$emit從子層傳到父層（'在父層發生事件的新名字',要傳給父層的值）
    }
}
</script>
<style scoped>
  @media (min-width: 1200px){
        .card{
            width: 230px;
        }
    }
    @media (min-width: 992px) and  (max-width: 1199px){
        .card{
            width: 200px;
        }
    }
    @media (min-width: 768px) and  (max-width: 991px){
        .card{
            width: 250px;
        }
    }
    @media (min-width: 320px) and  (max-width: 767px){
        .col-md-4{
            margin-top:1.5rem;
        }
        .card{
            width: 100%;
        }
    }
    img{
        cursor: pointer; 
        width: 120px;
        margin: auto;
    }
    .card-head{
        padding-top:20px;
        height: 120px;
        background: rgba(238, 234, 234,.5);
    }
    .card{
        box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,.075);
        margin: auto;
    }
    .card:hover{
        box-shadow: 0 0.5rem 1rem rgba(0,0,0,.075);
    }
    .card-title-info{
        cursor: pointer; 
    }
    .card-text {
        height: 70px;
        font-size: 0.9rem;
        color: #767676;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .ogPrice{
        font-size: 0.8rem;
        color: rgb(182, 179, 179);
    }
    .btn-cart{
        border-radius: 50%;
        margin-left: 30px;
        width: 45px;
        height: 45px;
        color: #EE8A42;
        background-image:none;
        border-color:#ffc107;
    }
    .btn-cart:hover{
        background-color: #EE8A42;
        color: white
    }
</style>