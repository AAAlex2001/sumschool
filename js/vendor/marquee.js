(function (win) {
    var isHTMLElement = (typeof HTMLElement === 'object') ?
        function (obj) {
            return obj instanceof HTMLElement;
        } :
        function (obj) {
            return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        };

    var marqueeJs = function (dom, options) {
        if (!isHTMLElement(dom)) {
            return;
        }

        var speed = options && options.speed || 100,
            inHtml = dom.innerHTML,
            inWidth = options && options.width || dom.offsetWidth,
            itemMargin = 50,
            delay = options && options.delay ? options.delay : 0;
        var domStyle = dom.hasAttribute('style') ? dom.getAttribute('style') : '';

        dom.setAttribute('style', 'position: fixed; display: block; width: auto; word-break: keep-all; white-space: nowrap;');

        var inHeight = options && options.height || dom.clientHeight,
            outWidth = dom.offsetWidth;

        if (outWidth >= inWidth) {
            var itemWidth = outWidth + itemMargin,
                isPaused = false,
                intervalId = null;

            dom.setAttribute(
                'style',
                domStyle + 'position: relative; display: inline-block; overflow: hidden; width:' + inWidth + 'px; height:' + inHeight + 'px;'
            );

            var leftItem = document.createElement('span'),
                rightItem = document.createElement('span');

            leftItem.setAttribute('style', 'position:absolute;top:0;left:0px;width:' + itemWidth + 'px;');
            leftItem.innerHTML = inHtml;
            rightItem.setAttribute('style', 'position:absolute;top:0;left:' + itemWidth + 'px;width:' + itemWidth + 'px;');
            rightItem.innerHTML = inHtml;

            dom.innerHTML = '';
            dom.appendChild(leftItem);
            dom.appendChild(rightItem);

            function marqueeToDo() {
                if (isPaused) {
                    return;
                }

                leftItem.style.left = (parseInt(leftItem.style.left, 10) - 1) + 'px';
                rightItem.style.left = (parseInt(rightItem.style.left, 10) - 1) + 'px';

                if (parseInt(leftItem.style.left, 10) <= -1 * itemWidth) {
                    leftItem.style.left = '0px';
                    rightItem.style.left = itemWidth + 'px';
                }
            }

            var controller = {
                pause: function () {
                    isPaused = true;
                },
                resume: function () {
                    isPaused = false;
                },
                destroy: function () {
                    if (intervalId !== null) {
                        clearInterval(intervalId);
                    }
                }
            };

            dom.marqueeJsController = controller;

            setTimeout(function () {
                intervalId = setInterval(marqueeToDo, speed);
            }, delay);

            return controller;
        } else {
            dom.setAttribute('style', domStyle);
        }
    };

    win.marqueeJs = marqueeJs;
})(window);
