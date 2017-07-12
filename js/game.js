(function( Fly ) {
    'use strict';

// Game是游戏对象，所有跟游戏相关的内容，都属于 Game 对象
    var Game = function( id ) {
        // this.ctx = option.ctx;
        // Fly.createCv( id ); 会返回一个canvas标签
        // this.cv = Fly.createCv( id );
        // this.ctx = this.cv.getContext("2d");

        // createCv() 方法会返回一个上下文
        this.ctx = Fly.createCv( id );

        // 两帧的时间间隔
        this.delta = 0;
        // 上一帧的时间
        this.lastFrameTime = new Date();
        // 当前帧时间
        this.curFrameTime = 0;
        // 用来存放游戏中所有的角色（对象）
        this.rolesList = [];
        // 图片资源
        this.imgSrc = ['birds', 'land', 'sky', 'pipe1', 'pipe2'];
        // 表示游戏是否进行
        this.isStart = true;

        // 英雄（小鸟）
        this.hero = null;
    };

    Game.prototype = {
        constructor: Game,

        // 开始游戏方法
        startGame: function() {
            var that = this;

            Fly.loadImage(that.imgSrc, function( imgList ) {

                // 初始化角色
                that.initRoles( imgList );

                // 渲染游戏
                that.draw( imgList );

                // 绑定事件
                that.bindEvent()
            });
        },

        // 游戏停止方法
        gameOver: function() {

            this.isStart = false;
        },

        // 初始化游戏中的所有角色
        initRoles: function( imgList ) {
            var ctx = this.ctx;

            // 创建小鸟对象
            this.hero = new Fly.Bird({
                ctx: ctx,
                img: imgList.birds
            });

            // 创建天空对象
            for(var i = 0; i < 2; i++) {
                var sky = new Fly.Sky({
                    ctx: ctx,
                    img: imgList.sky,
                    x: i * imgList.sky.width
                });

                this.rolesList.push( sky );
            }

            // 创建管道对象
            for(var i = 0; i < 6; i++) {
                var pipe = new Fly.Pipe({
                    ctx: ctx,
                    imgPipeTop: imgList.pipe2,
                    imgPipeBottom: imgList.pipe1,
                    x: i * imgList.pipe1.width * 3 + 300
                });

                this.rolesList.push( pipe );
            }

            // 创建陆地对象
            for(var i = 0; i < 4; i++) {
                var land = new Fly.Land({
                    ctx: ctx,
                    img: imgList.land,
                    x: i * imgList.land.width
                });

                this.rolesList.push( land );
            }
        },

        // 渲染游戏角色方法
        draw: function( imgList ) {
            var ctx = this.ctx,
                that = this,
                cv = this.ctx.canvas;

            (function render() {
                // 获取当前帧时间
                that.curFrameTime = new Date();
                // 两帧时间间隔
                that.delta = that.curFrameTime - that.lastFrameTime;
                // 将当前时间赋值给上一帧时间
                that.lastFrameTime = that.curFrameTime;

                // 清空画布
                ctx.clearRect(0, 0, cv.width, cv.height);
                ctx.beginPath();

                // 渲染所有游戏角色
                that.rolesList.forEach(function( role ) {
                    role.render( that.delta );
                });

                // 渲染小鸟
                that.hero.render( that.delta );

                // 小鸟碰撞检测
                if( that.hero.y - 8 <= 0 ||
                    (that.hero.y >= cv.height - imgList.land.height) ||
                    ctx.isPointInPath(that.hero.x, that.hero.y) ) {

                    // that.isStart = false;
                    that.gameOver();
                }

                // 通过判断，决定游戏是否继续进行
                if( that.isStart ) {
                    window.requestAnimationFrame( render );
                }
            })();
        },

        // 绑定事件方法
        bindEvent: function() {
            var that = this;
            // 给画布绑定单击事件，让小鸟跳起来
            that.ctx.canvas.addEventListener('click', function() {
                that.hero.changeSpeed( -0.3 );
            });
        }
    };

    Fly.Game = Game;

})( Fly );