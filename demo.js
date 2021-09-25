//完整代码
let Sale=function(){ 
    //存放订阅的列表（用户登记的信息）
    this.list=[];
}
Sale.prototype.add=function(listener){
    //将用户登记的信息存储起来
    this.list.push(listener)
}
Sale.prototype.trigger=function(){
    this.list.forEach(listener=>{
        listener()
    })
}

//使用方法
let NioSale=new Sale();

//订阅消息
NioSale.add(()=>{console.log("我是意向购买者1，有消息请第一时间通知我")})
NioSale.add(()=>{console.log("我是意向购买者2，有消息请第一时间通知我")})
NioSale.add(()=>{console.log("我是意向购买者3，有消息请第一时间通知我")})

setTimeout(()=>{
    NioSale.trigger();
},10000)
