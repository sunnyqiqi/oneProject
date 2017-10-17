var Dept = {};
Dept.all = function(parent_id,success_callback,error_callback) {
    if(!parent_id) {
        parent_id = 0;
    }

    $.ajax({
        url: SERVER_URL + "/dept/list",
        data: {
            pid: parent_id,
            token: Admin.get_token()
        },
        async: false,
        dataType: "json",
        success:function (data) {
            success_callback(data)
        },
        error:function (data) {
            error_callback(data);
        }
    });
};