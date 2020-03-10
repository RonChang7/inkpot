import Home from './components/home/Home'
import Discount from './components/discount'
import Login from './components/Login'
import Admin from './components/admin/Admin'
import Article from './components/Article';
import Cart from './components/items/Cart'
import payment from './components/items/payment'
import about from './components/About'

export const routes=[
    {path:'/', component: Home},
    {path:'/discount', component: Discount},
    {path:'/login', component: Login},
    {path:'/admin', component: Admin},
    {path:'/article', component: Article},
    {path:'/cart', component: Cart},
    {path:'/payment', component: payment},
    {path:'/about', component: about},






]