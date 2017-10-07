var roomNum;
var moShi = 1,playerData = "点泡泡三家@@",userType = 1;
cc.Class({
    extends: cc.Component,

    properties: {
		singleLineText: {
            default: null,
            type: cc.EditBox,
        },
		radioButton: {
            default: [],
            type: cc.Toggle
        }
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
	//加入房间-监听输入框值
	singleLineEditBoxDidChanged: function(text, sender) {
        //cc.log(sender.node.name + " single line editBoxDidChanged: " + text);
		roomNum = text;
    },
	//创建房间-模式类型值选择
	radioButtonClicked: function(toggle) {
		var moShiId = toggle.node.name;
		if(moShiId == "toggle1"){
			moShi = 1;
		}else if(moShiId == "toggle2"){
			moShi = 2;
		}else if(moShiId == "toggle3"){
			moShi = 3;
		}
    },
	
	//创建房间-玩法类型值选择
	checkBoxClicked: function (toggle) {
		if(toggle.isChecked){
			playerData += toggle.node.name+"@@";
		}else{
			playerData = playerData.replace(toggle.node.name+"@@","");
		}
    },
	//创建房间-模式类型值选择
	radioButtonClickedUser: function(toggle) {
		var moShiId = toggle.node.name;
		if(moShiId == "toggle1"){
			userType = 1;
		}else if(moShiId == "toggle2"){
			userType = 2;
		}
    },

    // use this for initialization
    onLoad: function () {

    },
	//返回
	backRoom:function(){
		cc.director.loadScene('gameMain');
	},
	//创建包厢
	createRoom:function(){
		cc.director.loadScene('createRoom');
	},
	//加入包厢
	joinInRoom:function(){
		cc.director.loadScene('joinInRoom');
	},
	//创建包厢点击事件
	createRoomBtn:function(){
		alert("模式类型:"+moShi + "玩法:"+playerData +"人数:"+ userType);//模式类型moShi 玩法playerData  人数userType
	},
	//加入包厢点击事件
	buttonClicked: function() {
		cc.log("房间号："+roomNum);
        
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
