var main = {
    init : function () {
        var _this = this;
        $('#btn-save').on('click', function () {
            _this.save();
        });

        $('#btn-update').on('click', function () {
            _this.update();
        });

        $('#btn-delete').on('click', function () {
            _this.delete();
        });

        $('#pageNum').on('click', function () {
            _this.page();
        });
    },

    save : function () {
        var data = {
            title: $('#title').val(),
            author: $('#author').val(),
            content: $('#content').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/v1/posts',
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('글이 등록되었습니다.');
            window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },

    update : function () {
            var data = {
                title: $('#title').val(),
                content: $('#content').val()
            };

            var id = $('#id').val();

            $.ajax({
                type: 'PUT',
                url: '/api/v1/posts/'+id,
                dataType: 'json',
                contentType:'application/json; charset=utf-8',
                data: JSON.stringify(data)
            }).done(function() {
                alert('글이 수정되었습니다.');
                window.location.href = '/';
            }).fail(function (error) {
                alert(JSON.stringify(error));
            });
    },

    delete : function () {
            var id = $('#id').val();

            $.ajax({
                type: 'DELETE',
                url: '/api/v1/posts/'+id,
                dataType: 'json',
                contentType:'application/json; charset=utf-8'
            }).done(function() {
                alert('글이 삭제되었습니다.');
                window.location.href = '/';
            }).fail(function (error) {
                alert(JSON.stringify(error));
            });
    },

    select : function () {
        $.ajax({
            url: '/posts/selectList',
            dataType: 'html',
            type: 'get',
            data: '',
            success: function(data) {
                $('#ajaxPageList').html(data);
            },
            error: function(e) {
                alert('테이블을 가져오는데 실패하였습니다.');
            }
        });
    },

    page : function (num) {
        $.ajax({
            url: '/posts/selectList/?page=' + num,
            dataType: 'html',
            type: 'get',
            data: '',
            success: function(data) {
                $('#ajaxPageList').html(data);
            },
            error: function(e) {
                alert('테이블을 가져오는데 실패하였습니다.');
            }
        });
    }
};

main.init();
main.select();