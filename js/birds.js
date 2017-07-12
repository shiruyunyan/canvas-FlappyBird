/**
 * Created by shiruyunyan on 2017/4/12.
 */
(function (Fly) {
    'use strict';
    var Bird = function (option) {
        this.ctx = option.ctx;
        this.img = option.img;
        this.imgW = this.img.width / 3;
        this.imgH = this.img.height;

        this.frameIndex = 0;
        this.x = 100;
        this.y = 100;

        this.a = 0.0005;
        this.speed = 0;

        this.curAngle = 0;
        this.maxAngle = 45;
        this.maxSpeed = 0.5;
    };
    Bird.prototype = {
        constructor: Bird,
        render: function (delta) {
            var ctx = this.ctx;
            //鸟的部分
            ctx.save();
            ctx.translate(this.x, this.y);
            //角度旋转
            this.curAngle = this.speed / this.maxSpeed * this.maxAngle;
            if (this.curAngle > 45) {
                this.curAngle = 45;
            } else if (this.curAngle < -45) {
                this.curAngle = -45;
            }
            ctx.rotate(Fly.toRadian(this.curAngle));
            //显示鸟
            ctx.drawImage(this.img, this.imgW * this.frameIndex, 0, this.imgW, this.imgH, -1 / 2 * this.imgW, -1 / 2 * this.imgH, this.imgW, this.imgH);
            //下一帧速度计算
            this.speed = this.speed + this.a * delta;
            this.y = this.y + (this.speed * delta + 1 / 2 * this.a * Math.pow(delta, 2));

            this.frameIndex++;
            this.frameIndex %= 3;
            ctx.restore();
        },
        changeSpeed: function (speed) {
            this.speed = speed;
        }


    };
    Fly.Bird = Bird;
})(Fly);