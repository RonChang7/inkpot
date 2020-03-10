<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid about-container-title">
            <div class="mt-5 text-title">
                <p class="h3 font-weight-bold text-center text-monospace">-</p>
                <p class="h2 text-center text-monospace">about</p>
            </div>
        </div>
        <div class="container-fluid about-container">
            <div class="row mt-5 mb-5">
                <div class="col-md-6 d-flex">
                    <div class="justify-content-center align-self-center mx-auto about">                    
                        <img src="static/pictures/team.png" alt="about">
                    </div>
                </div>
                <div class="col-md-6 text text-justify align-self-center">
                    <p class="font-italic text-monospace font-weight-bold mt-2">
                        歡迎來到 iNKPOT ! 
                    </p>
                    <p class="text-monospace mt-2">
                        很高興你喜歡我們，我們是一群喜歡舞文弄墨的小團體。
                        因為對於鋼筆書寫有共同的喜愛，想要讓大家知道更多的好產品，所以我們在2019年的一個春天創立了iNKPOT。
                    </p>
                    <p class="text-monospace mt-2">
                        書寫是由筆、墨、紙三種器具構成，缺一不可！但是，鋼筆或說筆尖的光芒遮蓋其它兩者太多，
                        以至談到書寫行為，九成以上的思慮或注意力都放在筆尖甚至筆桿上；但是，若從書寫行為的本質來看，
                        後兩者的重要性一點都不亞於筆尖，至少絕不比它不重要！
                    </p>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>
<script>
import header from '../components/home/Header';
import footer from '../components/home/Footer';
export default {
    components:{
        'app-header':header,
        'app-footer':footer,
    }
}
</script>
<style>
@media (min-width: 1100px){
    .about-container-title{
        margin-top: 5rem;
    }
    .about-container{
        margin-bottom: 9rem;    
    }
    .about{ 
        animation: waves 1.5s alternate infinite;
    }
   .text{
        padding-right: 12rem;
        padding-left: 0;
    }
   .about img{
        margin-left: 0%;
    }
}
@media (min-width: 992px) and (max-width: 1100px){
    .about-container-title{
        margin-top: 5rem;
    }
    .about-container{
        margin-bottom: 9rem;    
    }
    .about{ 
        animation: waves 1.5s alternate infinite;
    }
   .text{
        padding-right: 9rem;
        padding-left: 1.5rem;
    }
   .about img{
        margin-left: -10%;
    }
}
@media (min-width: 768px) and (max-width: 991px){
    .about-container-title{
        margin-top: 5rem;
    }
    .about-container{
        margin-bottom: 9rem;    
    }
    .about{ 
        animation: waves 1.5s alternate infinite;
    }
    .text{
        padding-right: 6rem;
    }
    .about img{
        width: 150%;
        margin-left: -32%;
    }
}
@media (max-width: 767px){ 
    h1{
        line-height: 0;
    }
    .text{
        padding: 2.5rem;
    }
    .about{
        /* padding: 0 1rem; */
        margin-top: -30px;
        margin-bottom: -10px;   
    }
    .about img{
        width: 100%;
    }
}
.text-title{
    color: #007bff;
    animation: change 2s infinite;
}
@keyframes change{
    from{ color: #007bff; }
    to{ color: #ee8a42; }
}@keyframes waves {
    from {transform: rotate(-20deg);}
    to{
        transform: rotate(20deg);
        transform: translate(5rem, 0);}
}
p{
    margin: auto;
}
/* .text-title{
    color: #323232;
} */
.text{
    color: #495057;
}

</style>