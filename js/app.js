$(function () {
    // 添加 jplayer 播放控件 dom
    $('body').append('<div id="jquery_jplayer_1" class="jp-jplayer"></div>' +
        '<div id="jp_container_1" class="jp-audio" role="application" aria-label="media player">' +
        '<button class="jp-play iconPlay" role="button" tabindex="0">play</button>' +
        '</div>');

    // 初始化 jPlayer
    $("#jquery_jplayer_1").jPlayer({
        ready: function (event) {
            $(this).jPlayer("setMedia", {
                mp3: 'media/Shayne-Ward-Until-You.mp3'
            });
            // 设置自动播放，iOS safari 受安全限制无效，wechat可以自动播放
            $(this).jPlayer("play").jPlayer("repeat");
        },
        //swfPath: "js",
        supplied: "mp3",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true,
        volume: 1
    });
});

// 当页面加载完毕时开始动画。
window.onload = function () {
    ani.init();
    updateSliderControl();
    addSmoothScrolling();
};

// 使用 onscroll 回调函数来更新 slider
window.onscroll = function () {
    updateSliderControl();
    //locator.stop();
};

var ani = {
    init: function () {
        this.logo("#hvd", { y: "30px" });
        this.logo("#ani1");
        this.logo("#ani2");
        this.logo("#ani3");
        //this.robot();
    },
    logo: function (tag, config) {
        TweenMax.fromTo(tag, 2, {
            // from
            css: {
                y: !config ? 0 : config.y0,
            }
        }, {
                // to
                css: {
                    y: !config ? "30px" : config.y,
                },
                // 永久重复动画的选项
                repeat: -1,
                // 反转、重新运行动画的选项
                yoyo: true,
                // 改变 easing 类型
                ease: Sine.easeInOut
            }
        );
    }
};

function updateSliderControl() {
    var links = document.querySelectorAll("#slider-control a");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        var attr = link.getAttribute('href');
        var section = document.querySelector(attr);
        var sectionTop = section.offsetTop;
        var sectionBottom = sectionTop + window.innerHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            link.className = "active";
        }
        else {
            link.className = "";
        }
    }
}

// 练习：网页滚动动画
function scrollToElement(element) {
    //声明变量topOfElement = element.offsetTop
    var topOfElement = element.offsetTop;
    TweenMax.to(window, 1, {
        scrollTo: {
            y: topOfElement,
        },
        ease: Sine.easeInOut
    });
}

function addSmoothScrolling() {
    var links = document.querySelectorAll("#slider-control a");

    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        // 闭包
        (function (_link) {
            //console.log('_link: ' + _link);
            //console.log(link);
            link.addEventListener('click', function (event) {
                event.preventDefault();
                var attr = _link.getAttribute('href');
                scrollToElement(document.querySelector(attr));
            });
        })(link);
    }
}
