var app = new Vue({
    el:'#app',
    data:{
        message:'hello world'+ new Date()
    }
});
var app2 = new Vue({
   el:'#app2',
    data:{
       seen:false,
    }

});
var app3 = new Vue({
   el:'#app3',
    data:{
        names:[
           {text:"学习"},
           {text:"工作"}
       ]
    }
});
var app5 = new Vue({
    el:'#app5',
    data:{
        message:'hello!',
    },
    methods:{
        myFirstFn:function(){
            this.message = this.message+ ',TOM';
        }
    }
});
var app6 = new Vue({
    el:'#app6',
    data:{
        message:'made'
    }
});

/*******这里都是全局模板*******/
Vue.component('my-button',{
    template: "<button>全局模板按钮</button>"
});

/*没有子模板的模板*/
Vue.component("todo-item",{
   template:"<li>asdf</li>"
});

var app7 = new Vue({
   el:"#app7",
    data:{
       message:"咖喱给给"
    }
});
/*拥有子模板的模板*/
/*在VUE的实例app8里取值，从而构造新的模板*/
/*为什么这种方式优秀？
* 因为组件只关注自己就行了。为什么？*/
Vue.component('todo-item2',{
    props:['message'],
    template:'<li>{{message.name}}</li>'
});
var app8 = new Vue({
    el:'#app8',
    data:{
        fruit:[
            {name:'苹果'},
            {name:'香蕉'},
            {name:'雪梨'}
            ]
    }
});


/*局部模板*/
var Child = {
    template:'<button>局部模板按钮</button>'
};
var app9 = new Vue({
    el:'#app9',
    components:{
        'my-button':Child,
    }
});

/*组件数据的传递 之 父传子*/
Vue.component('my-new-button',{
    props:['message1'],
    template:'<button>{{message1}}</button>'
});
Vue.component('my-new-input',{
    props:['message3'],
    template:'<input v-bind:value="message3">'
});
Vue.component('my-new-input2',{
    props:['message4'],
    template:'<input v-bind:value="counter">',
    data:function(){
        return {
            counter:this.message4 + '给给',
        }
    }
});
Vue.component('my-new-input3',{
    props:['message5'],
    template:'<input v-bind:value="counter">',
    computed:{
        counter:function(){
            return this.message5 + '给给'
        }
    }
});
var app10 = new Vue({
    el:'#app10',
    data:{
        message2:'咖喱',
    }
});

/*组件数据的传递 之 子传父*/
/*通过自定义事件来实现*/
/*子组件，就是里面的模板。和父组件，也就是"新元素"<new-input1>的解耦的。子组件只需要关注自己的逻辑，使用$emit，留下一个事件名，抛出一个事件，这里是shijian，至于父用还是不用，怎么用。和子无关*/
/*其实这里还抛出了另一个事件，就是原生的click事件。如果父模板要监听子模板的原生事件，这样加：   v-on:click.native="Fn"*/
Vue.component('new-button1',{
   // props:['message1'],
    template:'<button v-on:click="counterChildResult">{{counter}}</button>',
    data:function(){
        return {
            counter:0
        }
    },
    methods: {
        counterChildResult:function(){
            this.counter += 1;
            this.$emit('shijian');
        }
    }
});
var app11 = new Vue({
    el:'#app11',
    data:{
        total:0,
    },
    methods: {
        counterFatherResult:function(){
            this.total+=1;
        }
    }
});

/*组件数据的传递之双向绑定*/
/*通过自定义事件来实现*/
Vue.component('new-input1',{
    props:['value'],
    template:'<input v-bind:value="value" v-on:input="updateValue($event.target.value)">',
    methods:{
        updateValue:function(value){
            var myValue = value;
             //alert(value);
             this.$emit('shijian',myValue);
        }
    }
});
var app12 = new Vue({
    el:'#app12',
    data:{
        message:''
    },
    methods:{
        fatherValue:function(myValue){
            this.message =myValue;
        }
    }
});
Vue.component('my-button00',{
    props:['deliver'],
    template:'<button>{{counter}}</button>',
    computed:{
        counter:function(){
            return this.deliver+'hello world'
        }
    }
})
var app00 = new Vue({
    el:'#app00',
    data:{
        message:'把我传给子组件'
    }
});
Vue.component('my-input',{
    template:'<button v-on:click="childCount">{{counter}}</button>',
    data:function(){
        return{
            counter:0
        }
    },
    methods:{
        childCount:function(){
            this.counter = this.counter+1;
            var value =  this.counter;
            this.$emit('shijian',value);
        }
    }
})
var app111 = new Vue({
    el:'#app111',
    data:{
        total:0
    },
    methods:{
        faterCount:function(value){
            this.total = this.total+value
        }
    }
});

/*分发slot 简单来说，就是子组件有一个备用内容。当父组件需要用到子组件时，如果父组件的模板没有在子组件里增加内容，则显示子组件的备用内容，否则就不显示*/
Vue.component('child-component1',{
    template:'<div class="child"><p>HI，我是子组件</p><slot>如果没有分发内容就会看到我哦</slot></div>'

});
Vue.component('father-component1',{
   template:'<div class="father"><p>Hi,我是父组件</p><child-component1>{{fatherMessage}}</child-component1></div>',
    data:function(){
      return  {
          fatherMessage:'这是父组件发出的消息哦~'
      }
    },
});
var app13 = new Vue({
    el:'#app13',
    data:{
        message:'这里是实例发出的消息~'
    }
});
/*具名slot*/
/*具名的slot是用来分发结构的，将父组件模板里的东西插入到子组件里的模板的结构里，比如<header><main><footer>*/
Vue.component('child-component2',{
   template:'<div class="child"><h4>大家好我是子组件</h4>' +
   '<header>' +
   '<slot name="header"></slot>' +
   '</header>' +
   '<main><slot name="main"></slot></main>' +
   '<footer><slot></slot></footer>' +
   '</div>'
});
Vue.component('father-component2',{
   template:'<div class="father"><h2>大家好我是父组件</h2>' +
   '<child-component2>' +
   '<h3 slot="header">我会被分发到header吗？</h3>' +
   '<h4 slot="main">我会被分发到main吗？</h4>' +
   '<h5>我会被分发到footer吗？</h5>' +
   '</child-component2>' +
   '</div>'
});
var app14 = new Vue({
   el:'#app14',
});

/*作用域插槽*/
Vue.component('child-component3',{
    template:'<div class="child">' +
    '<slot text="这是子组件的text内容"></slot>' +
    '</div>'
});
Vue.component('father-component3',{
   template:'<div class="father">' +
   '<child-component3>' +
   '<template scope="props">' +
   '<p>这是父组件的内容，下面的是父组件调用子组件的内容</p>' +
   '<p>{{props.text}}</p>' +
   '</template>' +
   '</child-component3>' +
   '</div>'
});
var app15 = new Vue({
   el:'#app15'
});
/*所谓作用域插槽，其实是子组件在编写是，抛出一个text属性，属性值是想抛出的内容。这个属性可以在父模板中被Vue.js自带的模板<template>里一个特殊的属性scope获取，它的值是一个临时变量porps，该变量可以接受由子组件抛出的text属性。*/

Vue.component('child-component4',{
    props:['123'],
   template:'<ul>' +
   '<slot name="child-ul" v-for="item in fruit" v-bind:text="item.name">?</slot>' +
   '</ul>',
    data:function(){
      return {
          fruit:[
              {name:'苹果'},
              {name:'香蕉'},
              {name:'橙子'}
          ]
      }
    },
});
Vue.component('father-component4',{
   template:'<child-component4>' +
   '<template scope="props" slot="child-ul">' +
   '<li class="child-li" >{{props.text}}</li>' +
   '</template>' +
   '</child-component4>'
});
var app16 = new Vue({
    el:'#app16'
});
Vue.component('father-commponent5',{
   template:'<button class="btn btn-success">按钮</button>',
});
var app17 = new Vue({
    el:'#app17'
});