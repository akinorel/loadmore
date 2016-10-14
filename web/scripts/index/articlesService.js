'use strict';

(function () {
    var articleService = function () {

        return {
            getArticles: function () {
                return $.ajax({
                    type: 'GET',
                    url: 'api/articles'
                });
            },
            getTemplate: function (data) {
                return $.ajax({
                    type: 'GET',
                    url: 'api/articles/card',
                    data: { article: data }
                });
            }
        };
    };

    window.articleService = new articleService();
})();