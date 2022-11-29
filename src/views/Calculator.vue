<template>
 <HeaderVue />
    <div class="wrapper">
      <div class="container">
        <h1>Calculator</h1>
            <div class="app">
                <div class="calculator">
                    <input  class="display" type="text"  v-model="result" placeholder="0">
                    <button class="cell num" @click="show(num)" v-for="num in numbers" :key="num">{{num}}</button>
                    <button class="cell op" @click="show(op)" v-for="op in operations" :key="op">{{op}}</button>
                    <button class="cell op" @click="calcPercent()">%</button>
                    <button class="cell op" @click="reset()">R</button>
                    <button class="cell op" @click="calc()">=</button>
                </div>
            </div>
        </div>
    </div>
  </template>
  
  
  <script scoped>
  import HeaderVue from '../components/Header.vue'

  export default{
    components: {
     HeaderVue,
    },
    data(){
      return{
        result:'',
        numbers:[1,2,3,4,5,6,7,8,9,0],
        operations:['+','-','*','/','.',]
      }
    },
    methods:{
      show(char){
        this.result = this.result.toString();
        this.result += char;
      },
      reset(){
        this.result='';
      },
      calc(){
        this.result = eval(this.result)
      },
      calcPercent(){
        this.result = `${parseFloat(this.result) / 100}`;
      }
  
    },
  }
  </script>
  
  
  
  <style scoped>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    a{
    text-decoration: none;
    }

    li{
    list-style: none;
    }

    h1{
    text-align: center;
    margin-bottom: 20px;
    color: #07575b;
    }

    .wrapper{
    min-height:100vh;
    background-color: #c4dfe6;
    display: flex;
    align-items: center;
    justify-content: center;
    }
    .container{
    max-width: 1280px;
    margin: 0 auto;
    }
    .app{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0px 15px;
    }
    .calculator {
    display: flex;                       
    flex-wrap: wrap;  
    justify-content: space-around;
    width: 100%;
  }
  .display{
    width:100%;
    height: 50px;
    background-color: #243849;
    }
  
  input[type="text"] {
    width: 100%;
    height: 40px;
    border: 0;
    color: #fff;
    font-size: 18px;
    padding: 5px 5px;
    text-align: right;
  }
  
  .cell {
    flex: 33%;                       
    height: 50px;
    font-size: 18px;
    border: 1px solid gray;
  }
  
  .num{
    background-color: #243849;
    color: #fff;
    font-weight: 400;
    transition: all 0.2s ease 0s;
  }
  .num:hover{
    background-color: #fff;
    color:#243849 ;
  }
  
  .op {
    background-color: #ff9900;
    color: #243849;
    transition: all 0.2s ease 0s;
  }
  .op:hover{
    background-color: #fff;
    color:#243849 ;
  }


  </style>