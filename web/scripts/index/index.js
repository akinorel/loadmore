'use strict';

(function () {
    var loadMore;

    function articlesRendering(articles) {
        var articlesBox = $('#articles');
        var newRow = $("<div/>", {
            class: 'row'
        });

        articles.forEach(function (article) {
            articleService.getTemplate(article).then(function (card) {
                $(card).appendTo(newRow);
            });
        });

        newRow.appendTo(articlesBox);
    }

    loadMore = new LoadMore(articleService.getArticles, articlesRendering);

    $('.btn__load-more').on('click', function () {
        loadMore.load();
    });

    $('.switch__load-more').on('click', function () {
        var switchElem = $(this);
        var isOn;

        switchElem.toggleClass('on');
        isOn = switchElem.hasClass('on');

        $('.btn__load-more').attr('disabled', isOn);
        loadMore.setAutoload(isOn);
    });
})();