<template>
  <div id="container">
    <div id="shoppingCar">
      <header class="title-wrap">
        <span class="line-v"></span><span class="title">购物车</span><span class="line-v"></span>
      </header>
        <form>
          <table class="detial-wrap">
            <tr>
              <th>商品信息</th>
              <th>商品金额</th>
              <th>商品数量</th>
              <th>总金额</th>
              <th>编辑</th>
            </tr>
            <tr v-for="(item, index) in list">
              <td class="goods-detial-wrap">
                <div class="checkbox-wrap left">
                  <span class="checkbox "  v-bind:class="{'checked': item.checked}" @click="selectpro(item)"></span>
                </div>
                <div class="goods-detial right">
                  <div class="good-img left"><img v-bind:src="item.productImage" v-bind:_id="item.productId"/></div>
                  <div class="good-text left">
                    <div class="name">{{item.productName}}</div>
                    <dl class="gifts" >
                      <dt>赠送：</dt>
                      <dd v-for="(parts, index) in item.parts">{{parts.partsName}}</dd>
                    </dl>
                  </div>
                </div>
              </td>
              <td class="unitprice">{{item.productPrice}}</td>
              <td class="buy-num">
                <div class="choosenum-handler">
                  <i class="icon-minus" @click="productNumb(item,-1)"></i><input type="text" name="" value="" class="countbox" min="1" v-model="item.productQuentity"><i class="icon-plus" @click="productNumb(item,1)"></i>
                </div>
                <div class="stock onsell"></div>
              </td>
              <td class="amount">{{item.productQuentity * item.productPrice}}</td>
              <td class="icon icon-delete" @click="delectpro(item,index)"></td>
            </tr>
          </table>
          <footer class="checkout-wrap">
            <div class="total-check-wrap left">
              <div class="checkbox-wrap left"><span class="checkbox " v-bind:class="{checked: isChecked}" @click="selectAll(true)"></span></div>
              <div class="check-text left"><span class="checked-all">全选</span><span class="unchecked-all" @click="selectAll(false)">取消全选</span>
                </div>
            </div>
            <div class="checkout right">
              <div class="total-money"><span class="name">总金额 :</span><span class="amount">{{totalMoney}}</span></div>
              <input type="submit" value="结账" class="danger" @click='showdata'/>
            </div>
          </footer>
        </form>
      </div>
  </div>
</template>

<script>
import "../assets/css/reset.css"
import "../assets/css/main.css"
import "../assets/font/fonts/font.css"
import "../assets/css/bg-color.css"
import "../assets/css/style1.css"
import data from "../../static/cartData.json"

export default {

  name: 'Shopcar',
  data () {
    return {
      list: [],
      parts: [],
      isChecked: false,
      totalMoney: 0
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.showdata()
    })
  },
  computed: {

  },
  methods: {
    showdata (){
      this.list = data.result.list;
      this.parts = data.result.list.parts;
      console.log(data);
    },
    selectAll (val){
      console.log(val);
      this.isChecked = val
      this.list.forEach((item, index)=> {
        if(typeof(item.checked) == 'undefined') {
          this.$set(item,'checked',this.isChecked)
        } else {
          item.checked = this.isChecked
        }
      })
      this.changeMoney()
    },
    selectpro (item){
      if(typeof(item.checked) == 'undefined') {
        this.$set(item,'checked',true)
      } else {
        item.checked = !item.checked
      }
      let checkAll = true;
      this.list.forEach((item,index)=>{
        checkAll = checkAll && item.checked
      })
      this.isChecked = checkAll
      this.changeMoney()
    },
    delectpro (item,index){
      let id = item.productId
      console.log(id);
      this.list.splice(index,1)
      this.changeMoney()
    },
    productNumb (item,way) {
      if(way>0){
        item.productQuentity++
        this.changeMoney()
      } else {
        item.productQuentity--
        this.changeMoney()
        if (item.productQuentity < 1) {
          item.productQuentity = 1
        }
      }
    },
    changeMoney () {
      this.totalMoney = 0;
      this.list.forEach((item,index)=>{
        if(item.checked){
          this.totalMoney += item.productPrice * item.productQuentity
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
