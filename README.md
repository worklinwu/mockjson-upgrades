mockjson-upgrades
===================

在开发过程中，我现在通常是这样做的，前端负责把前端代码完成后，在把代码签入服务器上给服务端的伙伴使用。其中遇到的一个问题就是ajax调试的问题。因为我们的开发环境不一样，而且有时候服务未必能在我们开始项目的时候把接口做好，所以只能自己来模拟这些数据。    

过去的做法是在本地写个`.json`的文件然后ajax里面去调用它，这个方法显然很麻烦。当然好的方法是有的。比如 [mockJSON](https://github.com/mennovanslooten/mockJSON) 和 [mockjax](https://github.com/jakerella/jquery-mockjax)。 两者提供的功能并不完全相同，有的文章是把它俩结合起来用的。 `mockJSON`的用法会简单些，而且比较适合我现在的使用场景。 `但是`它在使用上并不合我意。例如在每次使用的时候必须要引入一个js文件，每个url都要配置，ajax的complete方法进不去等等。    

所以改造的工作开始了。我做了两个版本，一个是增强版，一个是node版。具体如下：
1. 在ajax下添加`mock`参数的支持。
```javascript
$.ajax({
    url: "foo.php",
    type: "get",
    dataType: "json",

    mock: {
        delay: 1000,
        data: {
            "test|5-10": "@NUMBER"
        }
    },

    success: function (data) {
        console.log(data.test);
    },
    complete: function () {
        console.log("ajax complete!");
    }
});
```
2. 增加了延迟请求的功能，用来模拟网络延时。
3. 使其请求后会触发`beforeSend`和`complete`方法，只是没有参数。
4. 做了个node版本的。
    这个可以在自己的团队服务器上挂一个这样的服务，然后直接把你想要的数据作为参数传过去，然后返回一个解析后的数据个你。而且剩了带入js文件。不过也有限制，ajax格式必须是jsonp的。 
    
    ```javascript
    $.ajax({
        url: 'http://127.0.0.1:5405/?delay=500&data=' + JSON.stringify({
            "result|10-20": "@NUMBER",
            "json|1-2":{"json1|5-10":"@NUMBER","json2|5-10":"@NUMBER"}
        }),
        type: "get",
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
        }
    });
    ```
       
博客相关
<a href="http://www.linwu.name/articles/share-mockJSON-upgrades.html" target="_blank">《本地模拟JSON数据，mockjson-upgrades.js》</a>     
    
源码在这里   
<a href="#" target="_blank">jquery.mockjson-upgrades.js</a>   
<a href="#" target="_blank">mockjson-node.js</a>
   
另外添加个mockJSON的文档和测试地址   
<a href="http://experiments.mennovanslooten.nl/2010/mockjson/" target="_blank">mockJSON文档</a>   
<a href="http://experiments.mennovanslooten.nl/2010/mockjson/tryit.html" target="_blank">mockJSON测试地址</a>