<template>
    <div class="dropmenu p-3 shadow">     
        <h6 class="font-weight-light pb-1">已選擇商品</h6>
        <div class="cart-menu-scroll">
            <table class="table table-sm">
                <tbody>
                    <tr v-for="item in cartList" :key="item.id">
                        <td class="align-middle text-center">
                            <a class="btn-sm btn btn-outline-danger" href="javascript:;"
                                @click="deleteItem(item.id)" ><i class="far fa-trash-alt"></i></a></td>
                        <td class="align-middle ">
                            <img style="width:40px;heihgt:40px" :src="item.imgUrl" alt="商品"></td>
                        <td class="align-middle">
                            <div class="cart-title ">{{item.name}}</div>
                            <div class="cart-unit text-info">{{item.quantity}} 個</div>
                        </td>
                        <td class="align-middle text-primary ">NT${{item.price}}</td>
                    </tr>
                </tbody>    
            </table>    
        </div>                   
        <router-link  to="/cart" id="cart"><button class="btn btn-block checkout">查看購物車</button></router-link>
    </div>

</template>
<script>
//mapstate cartList
import { mapState, mapActions } from 'vuex';
export default {
    computed:{
        ...mapState('cart',['cartList']),
        // cartList(){
        //     return this.$store.state.cart.cartList;
        // }
    },
    methods:{
        ...mapActions('cart', ['deleteItem']),
        // deleteItem(){
        //     const delOrder = {
        //          ...this.item
        //     };
        //     // this.$store.dispatch('deleteItem',delOrder);
        //     this.deleteItem(delOrder);
        // }
    }

}
</script>
<style scoped>
    .cart-menu-scroll{
         /* border-bottom: 1px solid #dee2e6; */
         margin: 3px 0 10px;
         max-height: 30vh;
         overflow-y: auto;
    }
    .cart-title{
        font-size: .9rem;
        font-weight: 300;
    }
    .cart-unit{
        font-size: .8rem;
        margin-top: 5px;
    }
    .checkout{
        color:#fff;    
        background-color: #EE8A42;
        border-color: #ffc107;
    }
</style>