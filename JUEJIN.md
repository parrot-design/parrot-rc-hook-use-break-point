# 什么是发布订阅模式？

>发布订阅模式定义对象间的一种一对多的依赖关系，当目标对象`Subject`的状态发生改变时，所有依赖于它的对象`Observer`都将得到通知。JS中大多使用事件模型来模拟这个动作。

# 举个🍐子

>这周末去看了心仪很久的一款车-蔚来ES6，去了上海金茂大厦的蔚来空间试驾了下，销售人员很热情，让我填写了一些表格就可以去试驾了，推背感很强烈，自动泊车爱了爱了❤️，试驾当场我就准备大定，可是蔚来客服说由于南京疫情导致芯片短缺导致库存不足，回到家几天以后一个蔚来的销售打电话跟我说有库存了......

>这是一个平时生活中很常见的例子，却是一个很典型的发布订阅模式。

![测试.jpg](./wechat.jpeg)

# JS简单实现

> 上节的🌰子我们说到是发布订阅模式，如果你通过阅读上节点文字很直截了当的看出了谁是目标对象，谁是订阅者，是谁发布者，我相信你已经明白了什么是发布订阅。这节我们用简单的JS代码来实现这个例子。

1. 目标对象Subject是蔚来ES6的库存，因为他的库存变化会通知订阅他的消费者。
2. 依赖对象Observer是准备购买蔚来汽车的消费者，当库存发生变化时会通知依赖对象。


## 1.创建蔚来销售处对象

> 我们在这里需要创建一个蔚来销售处对象，因为我们订阅购买信息需要在销售处登记，库存的变化也是要蔚来才知道。

```js
let Sale=function(){ 
    //存放订阅的列表（用户登记的信息）
    this.list=[];
}
```

## 2.增加订阅的方法

```js
Sale.prototype.add=function(listener){
    //将用户登记的信息存储起来
    this.list.push(listener)
}
```

## 3.增加发布的方法

> 因为用户库存变化并不是很好模拟，所以我们增加发布的方法，方便手动发布信息

```js
Sale.prototype.trigger=function(){
    this.list.forEach(listener=>{
        listener()
    })
}
```

## 4.使用方法

```js
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
```

> 是的，简单的发布订阅模式去除注释只有10行。 

## 5.思考题

> 其实一个真正的发布订阅还需要有懒注册功能、取消订阅、指定发布订阅等功能，希望你可以自己实现。

# 实现useBreakPoint hook 

> 本文的重点其实是实现useBreakpoint这个hook,那么这个hook的作用是什么呢？[antd useBreakpoint](https://ant.design/components/grid-cn/#components-grid-demo-useBreakpoint)是Grid组件内部使用的hook。主要是判断屏幕，可以给予正确的代表指定字符串的标识，但是我们这次要实现的略微和他的不同，我们可以精确匹配对应的屏幕标识。

## 1.matchMedia API

> 在传统监听浏览器窗口变化中，我们大多使用resize事件，但是由于resize触发频率过高，容易造成资源的严重浪费，我们现在可以使用[matchMedia API](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia),该方法返回一个新的[MediaQueryList](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList),这个方法有一个addListener方法当匹配的媒体查询变化时会产生一个回调，其中含有一个matches属性可以判断是否匹配成功。

```js
let mql=window.matchMedia('(max-width:800px)');

//当窗口大小超过800px 会打印‘我大于800px’ 否则打印‘我小于800px’
mql.addListener(({matches})=>{console.log(`我${matches?"小于":"大于"}800px`)})
```

## 2.确定媒体查询大小

```js
const responsiveMap={
    xs:'(max-width: 575px)',
    sm:'(min-width: 576px) and (max-width:767px)',
    md:'(min-width: 768px) and (max-width:991px)',
    lg:'(min-width: 992px) and (max-width:1119px)',
    xl:'(min-width: 1200px) and (max-width:1599px)',
    xxl:'(min-width: 1600px)'
};
```

1. 0px < xs <= 575px 
2. 576px <= sm <= 767px 
3. 768px <= md <= 991px 
4. 992px <= lg <= 1199px 
5. 1200px <= xl <= 1599px 
6. xxl >= 1600px 

## 3.发布订阅模式三部曲

### 1.创造media对象

```js
//目标对象 会产生变化
let screens={};
//缓存列表
let subscribers=[];
const responsiveObserve={
    
}
```

### 2.增加订阅的方法
```js
const responsiveObserve={
    subscribe(func){ 
        subscribers.push(func);  
    }
} 
```

### 3.增加发布的方法

```js
const responsiveObserve={
    dispatch(pointMap){
        screens=pointMap;
        subscribers.forEach(func=>func(screens)); 
    }
} 
```

### 4.自定义hook引用此对象

```js
import React ,{ useState,useEffect } from 'react';
//responsiveObserve为上文中对象
import ResponsiveObserve from './responsiveObserve';
 
function useBreakpoint(){
    
    const [screens,setScreens]=useState({});

    useEffect(()=>{
        const token=ResponsiveObserve.subscribe(supportScreens=>{
            setScreens(supportScreens);
        })
        return ()=>ResponsiveObserve.unsubscribe(token);
    },[]);

    return screens;

}

export default useBreakpoint;
```

> 由上可知该hook在useEffect中订阅了该media对象，而且返回了一个token便于在组件写在的时候清除订阅的方法。


### 5.增加取消订阅的方法

1. 首先需要在订阅的时候将指定的id与方法形成一一映射关系，并返回id。
2. 在取消订阅的时候通过map结构delete方法直接删除map中的键值对。

```js
let subUid=-1;
let subscribers=new Map();
const responsiveObserve={
    subscribe(func){ 
        subUid+=1;
        subscribers.set(subUid,func);
        func(screens);
        return subUid;
    },
    unsubscribe(token){
        subscribers.delete(token); 
    },
}
```

### 6.创建不同的media对象（核心）

>创建六个不同的媒体查询对象，然后就可以监听得出合适的匹配对象，由于我们这里是精确匹配，所以我们只需要匹配相对应的matches为true即可，即同时只有一个满足条件。

```js
Object.keys(responsiveMap).forEach((screen:string)=>{
            const matchMediaQuery=responsiveMap[screen as Breakpoint];
            const listener=({matches}:{matches:boolean})=>{  
                if(matches){
                    this.dispatch({
                        ...NoMatchScreens,
                        [screen]:matches
                    })
                } 
            }
            const mql=window.matchMedia(matchMediaQuery);
            mql.addListener(listener);
            this.matchHandlers[matchMediaQuery]={
                mql,
                listener
            };
            listener(mql);
})
```

### 7.懒处理

> 设想一下，如果我们不进行订阅该对象，是不是就不需要进行创建media对象。所以这里我们进行了懒处理的方式，即只在有订阅方法产生时才创建media对象，避免性能损耗。

```js

const responsiveObserve={  
    subscribe(func:SubscribeFunc):number{
        //当有订阅产生 才进行注册
        if(!subscribers.size) this.register();
        ...
    },
    unsubscribe(token:number){
        //如果没有订阅 取消注册
        if(!subscribers.size) this.unregister();
    },
    unregister() {
        //移除监听对象s
        handler?.mql.removeListener(handler?.listener);
        //主要是清除订阅
        subscribers.clear();
    },
    register(){
       //...核心方法
    }
}

``` 
