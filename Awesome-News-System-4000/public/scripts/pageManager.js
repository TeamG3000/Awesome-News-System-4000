/*globals $ toastr ajaxRequester*/
$('#nextPage').click(e => {
    e.preventDefault();
    let currentPage=$('#articles').attr('page')|0;
    let nextPage=currentPage+1;
    ajaxRequester
        .get('?page='+nextPage, {headers:{requester:'ajax'}})
        .then(articles => {
            $('#articles').attr('page', nextPage);
            $('#articles').append(articles)
        })
        .catch(error => {
            toastr.error('Can not get more elements');
            console.log(error);
        });
});

