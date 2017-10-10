var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

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
        card : cc.Integer,
        normal: {
            default: null,
            type: cc.Node
        },
        face: {
            default: null,
            type: cc.Node
        },
        atlas: {
            default: null,
            type: cc.SpriteAtlas
        }
    },
    proxy:function(data){
        this.game = data ;
    },
    // use this for initialization
    onLoad: function () {
        this.normal.active = false;
    },
    setCard:function(card){
        this.card = card ;
    },
    order:function(){

        let self = this ;
        var frame;
        if(parseInt(self.card / 10) == 1){
            console.log('麻将牌-牌面-suo'+self.card%10);
            frame = this.atlas.getSpriteFrame('麻将牌-牌面-suo'+self.card%10);
        }else if(parseInt(self.card / 10) == 2){
            frame = this.atlas.getSpriteFrame('麻将牌-牌面-tong'+self.card%10);
        }else if(parseInt(self.card / 10) == 3){
            frame = this.atlas.getSpriteFrame('麻将牌-牌面-wan'+self.card%10);
        }else if(parseInt(self.card / 10) == 4){
            frame = this.atlas.getSpriteFrame('麻将牌-牌面-wind1');
        }else if(parseInt(self.card / 10) == 5){
            frame = this.atlas.getSpriteFrame('麻将牌-牌面-wind2');
        }else if(parseInt(self.card / 10) == 6){
            frame = this.atlas.getSpriteFrame('麻将牌-牌面-wind3');
        }else if(parseInt(self.card / 10) == 7){
            frame = this.atlas.getSpriteFrame('麻将牌-牌面-wind4');
        }else if(parseInt(self.card / 10) == 8){
            frame = this.atlas.getSpriteFrame('麻将牌-牌面-wind5');
        }else if(parseInt(self.card / 10) == 9){
            frame = this.atlas.getSpriteFrame('麻将牌-牌面-wind6');
        }else if(parseInt(self.card / 10) == 10){
            frame = this.atlas.getSpriteFrame('麻将牌-牌面-wind7');
        }
        this.face.getComponent(cc.Sprite).spriteFrame = frame;
        this.normal.active = true ;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
