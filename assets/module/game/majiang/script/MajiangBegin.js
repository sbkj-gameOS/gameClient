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
        
        selfHandCard: {
            default: null,
            type: cc.Node
        },
        leftHandCards: {
            default: null,
            type: cc.Node
        },
        rightHandCards: {
            default: null,
            type: cc.Node
        },
        partnerHandCards: {
            default: null,
            type: cc.Node
        },
        partnerDisCardBox:{
            default: null,
            type: cc.Node
        },
        leftDisCardBox:{
            default: null,
            type: cc.Node 
        },
        rightDisCardBox:{
            default: null,
            type: cc.Node
        }
        ,selfDisCardBox:{
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        
        this.initgame();
       
        
    },
  
    initgame:function(){
        var self = this;
        var node = cc.find("Canvas/script/MajiangDataBind");
        this.game = node.getComponent("MajiangDataBind");
        if(cc.sys.isNative){
            window.io = SocketIO;
        }else{
            window.io = require("socket.io");
        }
        this.socket = window.io.connect("127.0.0.1:6324");
        this.socket.on("connect" , function(){
            self.socket.emit("create" ,JSON.stringify({roomId:""}));
        });
        this.game.socket = this.socket;
        this.socket.on("start/sendDataInfo",(resultTxt)=>{
          
            this.game.init(resultTxt.data);
        });
        this.socket.on("deal",(resultTxt)=>{
            var result = JSON.parse(resultTxt)
            this.handleDeal(result.data.currentIndex,result.data.card);
        });
        
        this.socket.on("dealTurn",(resultTxt)=>{
            console.log(resultTxt);
            var result = JSON.parse(resultTxt);
            this.handleDealTurn(result.currentIndex,result.options);
        });

        this.socket.on("disTurn",(resultTxt)=>{
            console.log(resultTxt);
            var data = JSON.parse(resultTxt);
            this.game.disTurn(data.options);
        });

        this.socket.on("discard",(resultTxt)=>{
            console.log(resultTxt);
            var result = JSON.parse(resultTxt);
            this.handleDiscard(result.currentIndex,result.disCard);
        });
       
        this.socket.on("disTurnSuccess",(resultTxt)=>{
            var result = JSON.parse(resultTxt);
            var game = this.game;
            var position = game.positionMap[result.index+""];            
            switch(result.type){
                case "peng":
                    this.game.getCard([result.card,result.card,result.card],position.index);
                break;
                case "chi":
                    this.game.getCard(result.card,position.index);
                break;
                case "gang":
                    this.game.getCard([result.card,result.card,result.card,result.card],position.index);
                break;
            }
            //this.handleDiscard(result.currentIndex,result.disCard);
        });

    },

    handleDeal:function(currentIndex,cardKey){
        var game = this.game;
        var position = game.positionMap[currentIndex];
        var selfIndex = game.INDEX;
        if(cardKey!=null&&currentIndex==selfIndex){
            game.deal(cardKey);
        }else{
            game.otherDeal(position.index);
        }
        
    },
    
    handleDiscard:function(currentIndex,cardKey){
        var game = this.game;
        var position = game.positionMap[currentIndex];
        var selfIndex = game.INDEX;
        game.disCard(cardKey,position.index);
    },

    handleDealTurn:function(currentIndex,options){
        var game = this.game;
        var position = game.positionMap[currentIndex];
        var selfIndex = game.INDEX;
        game.dealTurn(position.index,options);
        //game.changeTurn(position.index);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
