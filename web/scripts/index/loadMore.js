'use strict';

var LoadMore = (function () {
    var _loadMore;

    function LoadMore(getData, renderData) {
        if (_loadMore) {
            return _loadMore;
        }

        this.getData = getData;
        this.renderData = renderData;
        this.autoLoad = false;

        _loadMore = this;
    }

    LoadMore.prototype.load = function () {
        _loadMore.getData().then(function (data) {
            var articles = data.articles;

            _loadMore.renderData(articles);
        });
    };

    LoadMore.prototype.setAutoload = function (isAutoload) {
        if (isAutoload === this.autoLoad) {
            return;
        }

        this.autoLoad = isAutoload;

        if (isAutoload) {
            $(window).bind('scroll mousewheel DOMMouseScroll', function (event) {
                if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                    return;
                }

                if (document.body.scrollHeight <= document.body.clientHeight ||
                    $(window).scrollTop() === $(document).height() - $(window).height()) {
                    _loadMore.load();
                }
            });

            return;
        }

        $(window).unbind('scroll mousewheel DOMMouseScroll');
    };

    return LoadMore;
})();