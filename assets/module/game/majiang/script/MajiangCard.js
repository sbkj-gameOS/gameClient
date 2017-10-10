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
        posy:cc.Integer,
        card:{
            default:null ,
            type : cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.posy = this.card.y ;
    },

    select: function (event) {
        var card = event.target.parent.getComponent("card") ;
        if(card.game != null&&card.game.GAMESTATE=="DEALTURN"){
            if(event.target.parent.y == this.posy){
                card.game.select(card.card);
                event.target.parent.y = event.target.parent.y + 20 ;
            }else{
                card.game.EventDisCard(card.card);
            }
        }else if(card.game != null&&card.game.GAMESTATE=="DISTURN"){
            card.game.EventDisTurnSelectCard(card.card);
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
