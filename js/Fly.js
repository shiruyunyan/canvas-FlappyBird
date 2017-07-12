/**
 * Created by shiruyunyan on 2017/4/12.
 */
(function(window){
    'use strict';
    var FlyObj={ };
    //公用方法集
    FlyObj.toRadian = function (angle) {
        return angle / 180 * Math.PI;
    };

    FlyObj.loadImage = function (imgSrc, callback) {
        var count = 0, imgsLen = imgSrc.length, imgList = {};
        imgSrc.forEach(function (val, index) {
            var img = new Image();
            img.src = 'images/' + val + '.png';
            imgList[val] = img;
            img.onload = function () {
                count++;
                if (count >= imgsLen) {
                    callback(imgList);
                }
            };
        });
    };

    //创建canvas
    FlyObj.createCv=function(id){
        var cv=document.createElement('canvas');
        cv.width = 800;
        cv.height = 600;
        var container = document.getElementById( id );
        container.appendChild( cv );
        return cv.getContext('2d');
    };


    window.Fly=FlyObj;
})(window);