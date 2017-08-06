
cc.Class({
    extends: cc.Component,

    properties: {
        near_bg: [cc.Node],
        far_bg: [cc.Node],

        near_speed: 5,
        far_speed: 0.5,
    },

    // use this for initialization
    onLoad () {
        // this.fixBgPos(this.far_bg[0], this.far_bg[1]);
        // this.fixBgPos(this.near_bg[0], this.near_bg[1]);


    },

    // fixBgPos (bg1, bg2) {
    //     bg1.x = 0;
    //     // var bg1BoundingBox = bg1.getBoundingBox();
    //     // bg2.setPosition(bg1BoundingBox.xMax, -225);
    //     // console.log(bg1BoundingBox)
    // },

    // called every frame, uncomment this function to activate update callback
    update (dt) {
        this.bgMove(this.far_bg, this.far_speed);
        this.bgMove(this.near_bg, this.near_speed);

        this.checkBgReset(this.far_bg);
        this.checkBgReset(this.near_bg);
    },

    bgMove (bgList, speed) {//背景图移动
        for (var index = 0; index < bgList.length; index++) 
        {
            var element = bgList[index];
            // console.log(element.x)
            element.x -= speed
            
        }
    },

    /***
     * 检查背景是否要重置位置
     */
    checkBgReset (bgList) {//添加背景移动图
        var winSize = cc.director.getWinSize();
        var first_xMax = bgList[0].getBoundingBox().xMax;
        if (first_xMax <= 0) 
        {
            var preFirstBg = bgList.shift();
            bgList.push(preFirstBg);

            var curFirstBg = bgList[0];
            preFirstBg.x = curFirstBg.getBoundingBox().xMax;
        }
    }
});
