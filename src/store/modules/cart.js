const state ={
    cartList:[],
    discountedTotal:0,
    discounted: false,
    info:{
        orderName: null,
        orderTel: null,
        orderEmail:null,
        orderAddress: null,
        orderPs: null,
    }
};
const mutations ={
    'ADD_ITEM'(state, order){
        const cardItem = state.cartList.find(item => item.id === order.id);
        if(cardItem){    
            cardItem.quantity += order.quantity;
        }else{
            state.cartList.push(order);
        }
    },
    'DELETE_ITEM'(state, id){
        const index = state.cartList.findIndex(item => item.id === id);
        state.cartList.splice(index, 1);
    },
    'DISCOUNT'(state, discountedTotal){
        // if( coupon === "8" ){
            state.discountedTotal = discountedTotal;
            state.discounted = true;
        // }   
    },
    'collect_info'(state, info){
        state.info = {
            ...info
        }
    },
};
const actions={
    addItem:({commit}, order)=>{
        commit('ADD_ITEM', order);
    },
    deleteItem:({commit}, id)=>{
        commit('DELETE_ITEM', id);
    },
    discount:({commit, getters}, discountPercent)=>{
        const discountedTotal = getters.totalAmount * discountPercent;
        commit('DISCOUNT', discountedTotal);
    },
};
const getters={
    totalAmount: state => {
        let total = 0;
        const cartLength = state.cartList.length;
        for (let index = 0; index < cartLength; index++) {
            const itemPrice = state.cartList[index].price;
            const itemQty = state.cartList[index].quantity;
            total += itemPrice*itemQty;
        };
        return total;    
    },
    totalQty: state => {
        let qty = 0;
        const cartLength = state.cartList.length;
        for (let index = 0; index < cartLength; index++) {
            const itemQty = state.cartList[index].quantity;
            qty += itemQty;
        };
        return qty;
    }
}
export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
    
}