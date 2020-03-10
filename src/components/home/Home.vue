<template>
  <div>
      <app-header></app-header>
      <div class="container-fluid">
            <carousel :data="banner" indicators="hover"></carousel>
      </div>
      <app-items></app-items>

      <app-footer></app-footer>
      <!-- <div id="weather">{{}}</div>
      <button class="btn text-primary"
              @click="submit">現在幾多人</button> -->
  </div>
</template>
<script>
import Header from './Header';
import TabItems from './TabItems';
import Footer from './Footer';
export default {
    components:{
        'app-header':Header,
        'app-items':TabItems,
        'app-footer':Footer,
    },
    // mounted(){
    //     function makeRequest() {
    //         const xhr = new XMLHttpRequest();
    //         xhr.onload= function() {     // 這邊處理傳回來的東西
    //             //console.log(this.responseText);
    //                 // 確認有沒有接到api
    //             //console.log(typeof(xhr.responseText));
    //                 //查看接回來的資訊的型態
    //             var response = JSON.parse(this.responseText);
    //             //console.log(response);
    //                 //發現是字串後，要把它轉成物件，再查看一次
    //             const city = response.city.name + ", " +response.city.country;
    //             const weatherTitle = response.list[0].weather[0].main;
    //             const temp = response.list[0].main.temp + "°";
                
    //             var weatherContainer = document.querySelector('#weather')
    //             weatherContainer.innerHTML= city + "<br/>"+ weatherTitle + "<br/>"+temp ;

    //             }
    //         xhr.open('GET','https://api.openweathermap.org/data/2.5/forecast?q=Neihu,tw&APPID=5ef8838f5095cd89cbe98b6edd732992&lang=zh_tw&units=metric', true )  
    //         xhr.send()
    //         }
    //         makeRequest();
    // },
    data() {
        return {
            weather:{
                city:'',
                country:'',
                temperature:'',
                description:'',
            },
            banner: [
                '<div class="slide"><img style="width:100%;" src="static/pictures/bannerbg.png" alt="banner"></div>',
                '<div class="slide"><img style="width:100%;" src="static/pictures/bannerbg02.jpg" alt="banner"></div>',
            ],
        };
    },
    methods:{
        // submit(){
        //     const xhr = new XMLHttpRequest()
        //     xhr.open('post', 'https://nhsc.cyc.org.tw/api')
        //     xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        //     xhr.onreadystatechange = () => {
        //         const DONE = 4
        //         const CREATED = 201
        //         if (xhr.readyState === DONE) {
        //             if (xhr.status === CREATED) {
        //                 this.response = xhr.response
        //             } else {
        //                 this.response = 'Error: ' + xhr.status
        //             }
        //         }
        //     }
        //     xhr.send(JSON.stringify({
        //                             title: this.title,
        //                             body: this.body,
        //                             userId: this.userId
        //     }))
        // }
    },
}
</script>
<style scoped>
    @media (min-width: 1200px){
        .carousel{
            max-width: 1070px;
            margin: auto;
        }
    }
    @media (min-width: 992px) and  (max-width: 1199px){
        .carousel{
            max-width: 930px;
            margin: auto;
        }
    }
    @media (min-width: 768px) and  (max-width: 991px){
        .carousel {
            margin: auto;
            max-width: 708px;
        }
    }
    @media (min-width: 320px) and  (max-width: 767px){
        .carousel {
            max-width: 95%;
            margin: 0 auto -30px;
        }
    }
    .slide{
      cursor: pointer;
      /* overflow: hidden; */
    }
    .slide img{
        width: 100%;
    }
    a:hover{
      text-decoration: none;
    }
</style>