import vue from 'vue';
import vuex from 'vuex';
import cart from './modules/cart';
vue.use(vuex);

export default new vuex.Store({
    modules:{
        cart,
    }
});