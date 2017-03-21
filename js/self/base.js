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