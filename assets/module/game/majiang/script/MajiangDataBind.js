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
        selfCard: {
            default: null,
            type: cc.Prefab
        },
        leftHandCard: {
            default: null,
            type: cc.Prefab
        },
        rightHandCard: {
            default: null,
            type: cc.Prefab
        },
        partnerHandCard: {
            default: null,
            type: cc.Prefab
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
        },
        partnerHandBox:{
            default: null,
            type: cc.Node
        },
        leftHandBox:{
            default: null,
            type: cc.Node 
        },
        rightHandBox:{
            default: null,
            type: cc.Node
        }
        ,selfHandBox:{
            default: null,
            type: cc.Node
        },
        selfGetBox:{
            default: null,
            type: cc.Node
        },
        leftGetBox:{
            default: null,
            type: cc.Node
        },
        rightGetBox:{
            default: null,
            type: cc.Node
        },
        partnerGetBox:{
            default: null,
            type: cc.Node
        },
        partnerDisCard:{
            default: null,
            type: cc.Prefab
        }
        ,leftDisCard:{
            default: null,
            type: cc.Prefab
        }
        ,rightDisCard:{
            default: null,
            type: cc.Prefab
        }
        ,selfDisCard:{
            default: null,
            type: cc.Prefab
        },
        chiBtn:{
            default: null,
            type: cc.Node   
        },
        pengBtn:{
            default: null,
            type: cc.Node   
        },
        gangBtn:{
            default: null,
            type: cc.Node   
        },
        guoBtn:{
            default: null,
            type: cc.Node   
        },
        huBtn:{
            default: null,
            type: cc.Node   
        },
        huBtn:{
            default: null,
            type: cc.Node   
        },
        currentPlay:{
            default: null,
            type: cc.Node   
        },
        timeNum:{
            default: null,
            type: cc.Node   
        }
    },
    
    // use this for initialization
    onLoad: function () {
        this.socket = null;
        this.selectCards = [];
        this.INDEX = null;
        var self = this;
        this.GAMESTATE = "DISTURN";
        this.selectChiKeys = [];
        this.myselfPool = new cc.NodePool();
        this.leftPool = new cc.NodePool();
        this.rightPool = new cc.NodePool();
        this.partnerPool = new cc.NodePool();

        this.selfDisCardPool = new cc.NodePool();
        this.leftDisCardPool = new cc.NodePool();
        this.rightDisCardPool = new cc.NodePool();
        this.partnerDisCardPool = new cc.NodePool();

        this.chiBtn.active = false;
        this.pengBtn.active = false;
        this.gangBtn.active = false;
        this.huBtn.active = false;
        this.guoBtn.active = false;
        
        this.timeNum.active = false;

        this.current ={
            "1":this.currentPlay.getChildByName("self"),
            "2":this.currentPlay.getChildByName("right"),
            "3":this.currentPlay.getChildByName("partner"),
            "4":this.currentPlay.getChildByName("left")
        }

        this.btnViews = {
            "chi":this.chiBtn.getComponent(cc.Button),
            "peng":this.pengBtn.getComponent(cc.Button),
            "gang":this.gangBtn.getComponent(cc.Button),
            "hu":this.huBtn.getComponent(cc.Button)
        }

        this.mySelfCards ={
            hand:[],
            get:[],
            disCard:[]
        };

        this.leftCards = {
            hand:[],
            get:[],
            disCard:[]
        }
        this.rightCards = {
            hand:[],
            get:[],
            disCard:[]
        }
        this.partnerCards = {
            hand:[],
            get:[],
            disCard:[]
        }
        for (var i=0;i<14;i++){
            this.myselfPool.put(cc.instantiate(this.selfCard))
            this.leftPool.put(cc.instantiate(this.leftHandCard))
            this.rightPool.put(cc.instantiate(this.rightHandCard))
            this.partnerPool.put(cc.instantiate(this.partnerHandCard))
        }

        for (var i=0;i<20;i++){
            this.selfDisCardPool.put(cc.instantiate(this.selfDisCard))
            this.leftDisCardPool.put(cc.instantiate(this.leftDisCard))
            this.rightDisCardPool.put(cc.instantiate(this.rightDisCard))
            this.partnerDisCardPool.put(cc.instantiate(this.partnerDisCard))
        }
    },
    
    init: function(initData){
        var self = this;
        this.INDEX = initData.index;    
        this.chiList = [];
        this.gangKey = 0;
        this.pengKey = 0;    
        var _currentNum = parseInt(this.INDEX);
        this.positionMap = {};
        this.positionMap[this.INDEX] = {index:1};
        var count = 1;
        var indexNum = parseInt(this.INDEX);
        while(count<4){
            count++;
            var indexNum = indexNum+1<5?indexNum+1:1;
            this.positionMap[indexNum+""] = {
                index:count,
                data:initData.other[indexNum]
            };
        }
        for(var key in this.positionMap){
            var data = this.positionMap[key];
            if(this.positionMap[key].index == 1){

                initData.handCards.forEach(cardKey=>{
                    self.deal(cardKey,0);
                });
                // [11,12,13,14,15,16,17,18,19,21,22,23,24].forEach(cardKey=>{
                //     self.deal(cardKey,0);
                // });
            }else{
                this.positionMap[key] = Object.assign({},this.positionMap[key],initData.other[key]);
                this.otherPlayCards(this.positionMap[key].index,this.positionMap[key].handCardCount);
            }
        }
        // this.dealTurn(1,{
        //     "chiList":[[11,12],[14,15]]
        // })
        // this.GAMESTATE = "DISTURN";
    },
    
    changeTurn:function(index){
        this.current["1"].active = false;
        this.current["2"].active = false;
        this.current["3"].active = false;
        this.current["4"].active = false;
        this.current[index].active = true;
    },

    findHandCardNodeByCardKey:function(cardKey){
        return this.selfHandBox.children.find(node=>{
            var _card = node.getComponent("card");
            if(_card.card==cardKey){
                return node;
            }
        });
    },

    disCard: function(cardNum,index){
        this.endWait();
        switch(index){
            case 1:
                this.recardPosy();
                var currCard = this.selfDisCardPool.get();
                var card = currCard.getComponent("disCard");   
                card.setCard(cardNum);
                card.order();
                currCard.parent = this.selfDisCardBox;
                currCard.setPosition(43*(this.mySelfCards.disCard.length%12),-parseInt(this.mySelfCards.disCard.length/12)*50);
                this.mySelfCards.disCard.push(cardNum);
                this.mySelfCards.hand.splice(this.mySelfCards.hand.indexOf(cardNum),1);
                this.myselfPool.put(this.findHandCardNodeByCardKey(card.card));
                this.sortHandCard();             
                return currCard;
            break;
            case 2:
                var currCard = this.rightDisCardPool.get();
                var card = currCard.getComponent("disCard") ;                
                card.setCard(cardNum) ;
                card.order();
                currCard.parent = this.rightDisCardBox ;
                currCard.zIndex = 40-this.rightCards.disCard.length;
                currCard.setPosition(46*parseInt(this.rightCards.disCard.length/12),30*(this.rightCards.disCard.length%12));
                this.rightCards.disCard.push(cardNum);
                this.rightDisCardBox.sortAllChildren();
                this.rightPool.put(this.rightHandBox.children[this.rightHandBox.childrenCount-1]);
                return currCard;
            break;
            case 3:
                var currCard = this.partnerDisCardPool.get();
                var card = currCard.getComponent("disCard") ;                
                card.setCard(cardNum) ;
                card.order();
                currCard.parent = this.partnerDisCardBox ;
                currCard.setPosition(43*12-43*(this.partnerCards.disCard.length%12),-parseInt(this.partnerCards.disCard.length/12)*50);
                this.partnerCards.disCard.push(cardNum);
                this.partnerPool.put(this.partnerHandBox.children[this.partnerHandBox.childrenCount-1]);
                return currCard;
            break;
            case 4:
                var currCard = this.leftDisCardPool.get();
                var card = currCard.getComponent("disCard") ;                
                card.setCard(cardNum);
                card.order();
                currCard.parent = this.leftDisCardBox ;
                currCard.setPosition(-46*parseInt(this.leftCards.disCard.length/12),-30*(this.leftCards.disCard.length%12));
                this.leftCards.disCard.push(cardNum);
                this.leftPool.put(this.leftHandBox.children[this.leftHandBox.childrenCount-1]);                
                return currCard;
            break;
        }
    },

    getCard: function(cards,index){
        var self = this;
        switch(index){
            case 1:
                cards.forEach((card,index)=>{
                    var currCard = cc.instantiate(self.selfDisCard);
                    var disCard = currCard.getComponent("disCard"); 
                    var offLeft = 20 * self.mySelfCards.get.length;
                    disCard.setCard(card);
                    disCard.order();  
                    currCard.setPosition(offLeft+(self.selfGetBox.childrenCount)*43,0);                    
                    currCard.parent = self.selfGetBox;
                    var node = this.findHandCardNodeByCardKey(card);
                    if(node){
                        this.mySelfCards.hand.splice(this.mySelfCards.hand.indexOf(card),1);
                        self.myselfPool.put(node);
                    }
                });
                self.mySelfCards.get.push(cards);
                self.selfHandBox.children.forEach((node,index)=>{
                    node.setPosition((14 - self.selfHandBox.children.length)*76+index*76,0);
                });
            break;
            case 2:
                cards.forEach((card,index)=>{
                    var currCard = cc.instantiate(self.rightDisCard);
                    var disCard = currCard.getComponent("disCard"); 
                    var offLeft = 15 * self.rightCards.get.length;
                    disCard.setCard(card);
                    disCard.order();  
                    currCard.setPosition(0,offLeft+(self.rightGetBox.childrenCount)*30);                    
                    currCard.parent = self.rightGetBox;
                    currCard.zIndex = 40 - self.rightGetBox.childrenCount;
                });
                for(var i =0 ;i<cards.length;i++){
                    self.rightPool.put(self.rightHandBox.children[0]);
                }
                self.rightGetBox.sortAllChildren();
                self.rightCards.get.push(cards);
                self.rightHandBox.children.forEach((node,index)=>{
                    node.setPosition(0,-index*28);
                });
            break;
            case 3:
                cards.forEach((card,index)=>{
                    var currCard = cc.instantiate(self.partnerDisCard);
                    var disCard = currCard.getComponent("disCard"); 
                    var offLeft =-10 * self.partnerCards.get.length;
                    disCard.setCard(card);
                    disCard.order();  
                    currCard.setPosition(offLeft+(self.partnerGetBox.childrenCount)*-43,0);                    
                    currCard.parent = self.partnerGetBox;
                });
                for(var i =0 ;i<cards.length;i++){
                    self.partnerPool.put(self.partnerHandBox.children[0]);
                }
                self.partnerCards.get.push(cards);
                self.partnerHandBox.children.forEach((node,index)=>{
                    node.setPosition(index*37,0);
                });
            break;
            case 4:
                cards.forEach((card,index)=>{
                    var currCard = cc.instantiate(self.leftDisCard);
                    var disCard = currCard.getComponent("disCard"); 
                    var offLeft = -15* self.leftCards.get.length;
                    disCard.setCard(card);
                    disCard.order();  
                    currCard.setPosition(0,offLeft+(self.leftGetBox.childrenCount)*-30);                    
                    currCard.parent = self.leftGetBox;
                    currCard.zIndex = 40 + self.leftGetBox.childrenCount;
                });
                for(var i =0 ;i<cards.length;i++){
                    self.leftPool.put(self.leftHandBox.children[0]);
                }
                self.leftGetBox.sortAllChildren();
                self.leftCards.get.push(cards);
                self.leftHandBox.children.forEach((node,index)=>{
                    node.setPosition(0,((14-self.leftHandBox.children.length)+index)*-28);
                });
            break;
        }
    },

    dealTurn: function(index,options){
        if(index==1){
            this.operationCheck(options);
            this.GAMESTATE = "DEALTURN";
        }else{
            this.GAMESTATE = "WAIT";
        }
        this.startWait(30);
        this.changeTurn(index);
    },

    disTurn:function(options){
        this.options = options;
        this.operationCheck(options);
        this.GAMESTATE = "DISTURN";
        this.startWait(15);
    },
    
    operationCheck:function(options){
        this.optionDisable();
        var hasOperation = false;
        for(var key in options){
            switch(key){
                case "chiList":
                    hasOperation=true;
                    this.chiBtn.active = true;
                    this.chiList = options[key];
                break;
                case "pengkey":
                hasOperation=true;
                    this.pengBtn.active = true;
                    this.pengKey = options[key];
                break;
                case "gangkey":
                hasOperation=true;
                    this.gangBtn.active = true;
                    this.gangKey = options[key];
                break;
                case "angangkey":
                hasOperation=true;
                    this.gangBtn.active = true;
                    this.angangKey = options[key];
                break;
                case "hu":
                hasOperation=true;
                    this.huBtn.active = true;
                break;                    
            }
         }
         if(hasOperation){
            this.guoBtn.active = true;
            var btnNode = cc.find("Canvas/btn");
            var count = 0;
           btnNode.children.forEach(btn=>{
               if(btn.active){
                   btn.y = 40;
                   btn.x = count*150;
                   count++;
               }
           })
            }
         
    },
    
    otherPlayCards:function(index,count){
        switch(index){
            case 2:
                for(var i=0;i<count;i++){
                    let rightHandCard = this.rightPool.get();
                    rightHandCard.parent = this.rightHandCards ;
                    rightHandCard.setPosition(0,-i*28);
                }
                break;
            case 3:
                    for(var i=0;i<count;i++){
                        let partnerHandCard = this.partnerPool.get();
                        partnerHandCard.parent = this.partnerHandCards ;
                        partnerHandCard.setPosition(i*37,0);
                    }
                break;
            case 4:
                for(var i=0;i<count;i++){
                    let leftHandCard = this.leftPool.get();
                    leftHandCard.parent = this.leftHandCards ;
                    leftHandCard.setPosition(0,-i*28);
                }
                break;
        }
    },

    otherDeal:function(index){
        switch(index){
            case 2:
                    let rightHandCard = this.rightPool.get();
                    var count = this.rightHandBox.childrenCount;
                    rightHandCard.parent = this.rightHandCards ;
                    rightHandCard.setPosition(0,-(count)*28);
                break;
            case 3:
                    let partnerHandCard = this.partnerPool.get();
                    var count = this.partnerHandBox.childrenCount;
                    partnerHandCard.parent = this.partnerHandCards ;
                    partnerHandCard.setPosition(count*37,0);
                break;
            case 4:
                    let leftHandCard = this.leftPool.get();
                    var count = this.leftHandBox.childrenCount;
                    leftHandCard.parent = this.leftHandCards ;
                    leftHandCard.setPosition(0,-count*28);
                break;
        }
    },
    getCardView:function(cardNum){
        
        let currCard = this.myselfPool.get() ;
        var card = currCard.getComponent("card") ;
        card.setCard(cardNum) ;
        currCard.parent = this.selfHandCard;
        card.order();
        card.proxy(this);
        return currCard;
    },
    deal:function(cardNum,postLeft){
        let handCards = this.mySelfCards.hand;
        var currCard = this.getCardView(cardNum);
        var _postLeft = !isNaN(postLeft)?postLeft:(14 - this.selfHandBox.children.length)*76;
        currCard.setPosition(_postLeft+handCards.length*76,0);
        handCards.push(cardNum);
        return currCard;
    },

    recardPosy:function(){
        this.selfHandBox.children.forEach(c=>{
            c.y = 0;
        });
    },

    select:function(card){
        this.recardPosy();
        this.currentCard = card;
    },

    sortHandCard:function(){
        this.mySelfCards.hand.sort();
        this.mySelfCards.hand.forEach((cardKey,index)=>{
            var node = this.selfHandBox.children[index];
            var _card = node.getComponent("card");
            _card.setCard(cardKey);
            _card.order();
            node.setPosition((13 - this.selfHandBox.children.length)*76+index*76,0);
        },this);
    },
    
    cardInteractable:function(interactable){
        this.selfHandCard.children.forEach(node=>{
            var _btn = node.getComponentInChildren(cc.Button);
            _btn.interactable = interactable;
        });
    },

    optionDisable:function(){
        this.chiBtn.active = false;
        this.pengBtn.active = false;
        this.gangBtn.active = false;
        this.huBtn.active = false;
        this.guoBtn.active = false;
    },

    EventDisCard:function(card){      
        this.socket.emit("dealTurn",{type:"discard",card:card})
    },
    
    EventDisTurnSelectCard:function(card){
        var self = this;
        if(this.chiList.length>1){
            this.recardPosy();
            self.chiList.forEach(l=>{
                if(l.indexOf(card)!=-1){
                    self.selectChiKeys = l;
                    l.forEach(c=>{
                        var node = self.findHandCardNodeByCardKey(c);
                        node.y+=20;
                    });
                    return false;
                }
            })
        }
    },
    EventGang:function(event){
        this.optionDisable();
        
        this.socket.emit("operate",{
            type:"gang",
            card:this.gangKey,
        })

    },

    EventChi:function(){
        if(this.chiList.length>1){
            if(this.selectChiKeys.length>0){
                this.emitChi(this.selectChiKeys);
            }
            var keys = [];
            this.chiList.forEach(l=>{
                keys = keys.concat(l);
            })
            this.selfHandBox.children.forEach(c=>{
                var card = c.getComponent("card");
                if(keys.indexOf(card.card)==-1){
                    c.getComponentInChildren(cc.Button).interactable = false;
                }else{
                    c.getComponentInChildren(cc.Button).interactable = true;
                }
            });
        }else{
            this.emitChi(this.chiList[0]);
        }
    },
    
    emitChi:function(cards){
        this.socket.emit("operate",{
            type:"chi",
            card:cards
       })
    },


    EventPeng:function(event){
       this.optionDisable();
       this.socket.emit("operate",{
            type:"peng",
            card:this.pengKey
       })
    },

    EventDan:function(){

    },

    EventTing:function(){
        
    },

    EventGuo:function(){
        this.socket.emit("pass");
    },
    EventHu:function(){  
        this.socket.emit("hu");    
    },

    startWait:function(time){
        this.timeNum.active = true;
        var _animation = this.timeNum.getComponent(cc.Animation);
        _animation.play("timeNum",(30-time)/100);
    },

    endWait:function(){
        var _animation = this.timeNum.getComponent(cc.Animation);
        _animation.stop();
        this.timeNum.active = false;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
