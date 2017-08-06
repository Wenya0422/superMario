
//开启物理引擎

const physics = cc.director.getPhysicsManager()

physics.enabled = true
 

cc.Class({
    extends: cc.Component,

    properties: {
        mario: {
            default: null,
            type: cc.Node
        },

        gold_label: cc.Label,
        goldNum: 0,
        

        ground: [cc.Node],
        near_bg: [cc.Node],
        far_bg: [cc.Node],
        golds_bg: [cc.Node],

        near_speed: 5,
        far_speed: 0.5,
        ground_speed: 10,

    },

    // use this for initialization
    onLoad() {
        // 马里奥物理属性
        this.physics = {
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            speed: 3 * cc.PhysicsManager.PTM_RATIO
        }

        this.body = this.mario.getComponent(cc.RigidBody)//刚体
        this.velocity = {x: 0, y: 0}


        this.listen()

        this.body.enabledContactListener = false//碰撞监听


        // debug
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            // cc.PhysicsManager.DrawBits.e_pairBit;

    },

    keyDown(event) {
        // console.log(event.keyCode)
        switch (event.keyCode) {
            case 37: {
                // ⬅️
                this.body.fixedRotation = true
                this.physics.vx = -this.physics.speed

                // const rotationTo = cc.rotateTo(1, -180, 90);
                // this.mario.runAction(rotationTo);
                // this.node.getComponent(cc.Sprite).spriteFrame = cc.loader.getRes('image/marioLeftGo', cc.SpriteFrame)
                break
            }

            case 38: {
                // ⬆️
                this.physics.vy = this.physics.speed
                 // 向上的冲量
                this.body.applyForceToCenter({x: 0, y: 16000}, true)


                break
            }

            case 39: {
                // ➡️
                const anim = this.getComponent(cc.Animation);//动画
                this.physics.vx = this.physics.speed
                anim.play('move').speed = 1.5//动画移动的速度

                this.bgMove(this.far_bg, this.far_speed);
                this.bgMove(this.near_bg, this.near_speed);
                this.bgMove(this.ground, this.ground_speed);
                this.bgMove(this.golds_bg, this.ground_speed);

                this.body.enabledContactListener = true

                break
            }

            case 40: {
                // ⬇️
                break
            }
        }
    },

    keyUp(event) {
        
        switch (event.keyCode) {
            case 37: {
                // ⬅️
                this.physics.vx = 0
                break
            }

            case 38: {
                // ⬆️
                this.physics.vy = 0


                break
            }

            case 39: {
                // ➡️
                this.physics.vx = 0
                break
            }

            case 40: {
                // ⬇️
                break
            }
        }
    },


    bgMove (bgList, speed) {//背景图移动
        for (var index = 0; index < bgList.length; index++) 
        {
            var element = bgList[index];
            element.x -= speed
            
        }
    },

    addGold () {//得分
        this.goldNum++;
        this.gold_label.string = this.goldNum + "";
    },

   

    listen() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyUp, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyDown, this)

    },

    onBeginContact (contact, selfCollider, otherCollider) {//碰撞回调
        // this.mario.destroy()//销毁
        otherCollider.node.removeFromParent();
        //金币
        this.addGold()

    },



    update() {
        this.velocity.y = this.body.linearVelocity.y
        this.velocity.x = this.physics.vx
        this.body.linearVelocity = this.velocity
    }
})
