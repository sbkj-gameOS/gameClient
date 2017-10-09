cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    //战绩包厢
    recordRoom:function(){
        cc.director.loadScene('recordRoom');
    },
    //战绩包厢详情
    viewspageRoom:function(){
        cc.director.loadScene('viewsRoom');
    },
    //返回战绩包厢
    record:function(){
        cc.director.loadScene('recordRoom');
    },


    //http请求网络数据
    local xhr = cc.XMLHttpRequest:new() //创建一个请求
    xhr.responseType = cc.XMLHTTPREQUEST_RESPONSE_STRING; //设置返回数据格式为字符串
    local req = "http://www.XXX”; //请求地址
    xhr:open("GET", req) //设置请求方式  GET     或者  POST

    local function onReadyStateChange() // --请求响应函数
        if xhr.readyState == 4 and (xhr.status >= 200 and xhr.status < 207) then //—请求状态已完并且请求已成功
            local statusString = "Http Status Code:"..xhr.statusText
            //print("请求返回状态码"..statusString)
            local s = xhr.response; //—获得返回的内容
            //print(“返回的数据");
            end
        end
    xhr:registerScriptHandler(onReadyStateChange) //--注册请求响应函数
    xhr:send() //—最后发送请求
});
