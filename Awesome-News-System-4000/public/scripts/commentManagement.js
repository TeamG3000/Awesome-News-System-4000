/*globals $ ajaxRequester toastr*/
(function () {
    const articleId = $("#article").attr("articleId");
    if (articleId === undefined) {
        return;
    }

    getComments();

    $("#addComment").click(e => {
        e.preventDefault();
        let commentContent = $("#commentContent").val();
        if (commentContent.length === 0) {
            toastr.error("Comment can not be empty");
            return;
        }

        let data = {
            commentContent: commentContent,
            articleId: articleId
        };

        ajaxRequester.post("/comment", { data: data })
            .then(res => {
                $("#commentContent").val("");
                getComments();
                console.log(res);
            })
            .catch(err => {
                toastr.error("Can not add comment");
                console.log(err.responseText);
            });
    });

    function getComments() {
        let $new = $("<div>");
        ajaxRequester
            .get("/comment?articleId=" + articleId)
            .then(comments => {
                if (comments.length === 0) {
                    $("#comments").text("No comments");
                    return;
                }

                comments.forEach(comment => {
                    let commentDate = new Date(comment.date).toLocaleString("de");
                    let author = comment.author ? comment.author : 'Anonymous';
                    let $authorLine = $("<p>")
                        .addClass("small")
                        .text(`by ${author} on ${commentDate}`);
                    $("<div>")
                        .append("<hr>")
                        .append($("<div>").text(comment.content))
                        .append($authorLine)
                        .appendTo($new);
                });
                $("#comments").html($new.html());
            })
            .catch(err => {
                toastr.error("Can not get comments");
                console.log(err.responseText);
            });
    }
})();