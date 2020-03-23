<template>
    <div class="container-fluid" style="background:#fff;">
        <nav class="navbar">
            <router-link to="/" tag="ul" class="logo mt-2">
                <img src="static/pictures/inkpot_row.png" alt="logo">
            </router-link>
            <ul class="justify-content-center u2">
                <li class="nav-item"><router-link to="/discount">優惠活動</router-link></li>
                <!-- <li class="nav-item"><router-link to="/article">試色文</router-link></li> -->
                <!-- //email形式 -->
                <li class="nav-item"><router-link to="/about">關於我們</router-link></li>
            </ul>
            <ul class="justify-content-center">
                <!-- <li class="nav-item"><router-link to="/login"><i class="fas fa-user"></i></router-link></li> -->
                <!-- <li class="nav-item sticky-top"
                    @click="show=!show" :style="show ? 'color: #EE8A42' : ''" style="cursor:pointer"><i class="fas fa-shopping-cart"></i>
                    <span v-if="totalQty === 0 ? false : true" class="badge badge-pill badge-danger text-white">{{ totalQty }}</span>
                </li> -->
            </ul>
        </nav>
        <a class="cart position-fixed"
            @click="show=!show" style="cursor:pointer">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="totalQty === 0 ? false : true" class="badge badge-pill badge-danger text-white">{{ totalQty }}</span>
        </a>
        <div v-if="show" class="dropdown cart text-decoration-none">
            <pre-Cart></pre-Cart>
        </div>
    </div>  
</template>
<script>
import { mapGetters } from 'vuex';
import preCart from '../items/preCart';
export default {
    components:{
        preCart,
    },
    computed:{
        ...mapGetters('cart',['totalQty']),
    },
    data(){
        return{
            show:false,
        }
    },
}
</script>
<style lang="scss" scoped>
    a{
        text-decoration: none;
    }
    @media (min-width: 1200px){
        .logo img{
            margin-left: 10vw;
        }
        .u2{
            margin-left: -11rem;
        }
        .dropmenu{
            min-width: 370px;
            right: 0;

        }
        .cart{
            top: 25px;
            right: 150px;
        }
    }
    @media (min-width: 992px) and (max-width: 1199px){
        .logo img{
            margin-left: 5vw;
        }
        .dropmenu{
            min-width: 370px;        
            right: 0;
        }
        .cart{
            top: 25px;
            right: 25px;
        }
    }
    @media (min-width: 768px) and  (max-width: 991px){
        .logo img{
            margin-left: 2vw;
        }
        .dropmenu{
            min-width: 370px;
            right: 0;
        }
        .cart{
            top: 25px;
            right: 25px;
        }     
    }
    @media (max-width: 767px){ 
        .logo{
            justify-content: center;
        }
        .cart{
            top: 25px;
            right: 25px;
        }
        // .navbar:nth-child(2){
        //     flex-wrap: wrap;
        // }   
        .dropmenu{
            min-width: 200px;
            right: -16px;
            width: 327px;

        }
    }
    .container-fluid{
        border-bottom: solid .5px  rgba(0,0,0,.075);
        // box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,.075);
    }
    .active{
        color: #ee8a42;
    }
    .navbar{
        width: 100%;
        margin: auto;
        padding: .5rem 0rem;
        line-height: 1;
        flex-wrap: nowrap;
    }
    .logo img{
        width: 110px;
        vertical-align: middle;
        cursor: pointer;
    }
    .nav-item a{ 
        font-size: 17px;
        color: #949494;
    }
    .navbar ul{
        margin-top: auto;
        padding: 0;
        display: inline-block;
        vertical-align: middle;
    }
    .navbar li{
        display: inline-block;
        margin-top: 5px;
        margin-right: 3vw;
        position: relative;
    }
    a:hover{
        color:#EE8A42;
    }
    .cart{
        color: #EE8A42;
        z-index: 1000;
    }
    i{
        transform: scale(1.7);
    }
    .dropmenu{
        position: absolute;
        background: #fff;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        top: -40px;
        z-index: 10000;
    }
    .badge {
        position: absolute;
        background-color: #ec5656;
        right: -.7rem;
        top: -.7rem;
    }

</style>

