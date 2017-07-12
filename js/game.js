(function( Fly ) {
    'use strict';

// Game����Ϸ�������и���Ϸ��ص����ݣ������� Game ����
    var Game = function( id ) {
        // this.ctx = option.ctx;
        // Fly.createCv( id ); �᷵��һ��canvas��ǩ
        // this.cv = Fly.createCv( id );
        // this.ctx = this.cv.getContext("2d");

        // createCv() �����᷵��һ��������
        this.ctx = Fly.createCv( id );

        // ��֡��ʱ����
        this.delta = 0;
        // ��һ֡��ʱ��
        this.lastFrameTime = new Date();
        // ��ǰ֡ʱ��
        this.curFrameTime = 0;
        // ���������Ϸ�����еĽ�ɫ������
        this.rolesList = [];
        // ͼƬ��Դ
        this.imgSrc = ['birds', 'land', 'sky', 'pipe1', 'pipe2'];
        // ��ʾ��Ϸ�Ƿ����
        this.isStart = true;

        // Ӣ�ۣ�С��
        this.hero = null;
    };

    Game.prototype = {
        constructor: Game,

        // ��ʼ��Ϸ����
        startGame: function() {
            var that = this;

            Fly.loadImage(that.imgSrc, function( imgList ) {

                // ��ʼ����ɫ
                that.initRoles( imgList );

                // ��Ⱦ��Ϸ
                that.draw( imgList );

                // ���¼�
                that.bindEvent()
            });
        },

        // ��Ϸֹͣ����
        gameOver: function() {

            this.isStart = false;
        },

        // ��ʼ����Ϸ�е����н�ɫ
        initRoles: function( imgList ) {
            var ctx = this.ctx;

            // ����С�����
            this.hero = new Fly.Bird({
                ctx: ctx,
                img: imgList.birds
            });

            // ������ն���
            for(var i = 0; i < 2; i++) {
                var sky = new Fly.Sky({
                    ctx: ctx,
                    img: imgList.sky,
                    x: i * imgList.sky.width
                });

                this.rolesList.push( sky );
            }

            // �����ܵ�����
            for(var i = 0; i < 6; i++) {
                var pipe = new Fly.Pipe({
                    ctx: ctx,
                    imgPipeTop: imgList.pipe2,
                    imgPipeBottom: imgList.pipe1,
                    x: i * imgList.pipe1.width * 3 + 300
                });

                this.rolesList.push( pipe );
            }

            // ����½�ض���
            for(var i = 0; i < 4; i++) {
                var land = new Fly.Land({
                    ctx: ctx,
                    img: imgList.land,
                    x: i * imgList.land.width
                });

                this.rolesList.push( land );
            }
        },

        // ��Ⱦ��Ϸ��ɫ����
        draw: function( imgList ) {
            var ctx = this.ctx,
                that = this,
                cv = this.ctx.canvas;

            (function render() {
                // ��ȡ��ǰ֡ʱ��
                that.curFrameTime = new Date();
                // ��֡ʱ����
                that.delta = that.curFrameTime - that.lastFrameTime;
                // ����ǰʱ�丳ֵ����һ֡ʱ��
                that.lastFrameTime = that.curFrameTime;

                // ��ջ���
                ctx.clearRect(0, 0, cv.width, cv.height);
                ctx.beginPath();

                // ��Ⱦ������Ϸ��ɫ
                that.rolesList.forEach(function( role ) {
                    role.render( that.delta );
                });

                // ��ȾС��
                that.hero.render( that.delta );

                // С����ײ���
                if( that.hero.y - 8 <= 0 ||
                    (that.hero.y >= cv.height - imgList.land.height) ||
                    ctx.isPointInPath(that.hero.x, that.hero.y) ) {

                    // that.isStart = false;
                    that.gameOver();
                }

                // ͨ���жϣ�������Ϸ�Ƿ��������
                if( that.isStart ) {
                    window.requestAnimationFrame( render );
                }
            })();
        },

        // ���¼�����
        bindEvent: function() {
            var that = this;
            // �������󶨵����¼�����С��������
            that.ctx.canvas.addEventListener('click', function() {
                that.hero.changeSpeed( -0.3 );
            });
        }
    };

    Fly.Game = Game;

})( Fly );