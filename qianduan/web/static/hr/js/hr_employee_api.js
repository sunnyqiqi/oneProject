var Employee = {};

Employee.detail = function (employee_id, success_callback, error_callback) {
    $.ajax({
        type: 'get',
        url: SERVER_URL + '/admin/loadadmin',
        data: {
            id: employee_id,
            data_type: "0",
            token: Admin.get_token()
        },
        async: false,
        dataType: "json",
        success: function (data) {
            success_callback(data)
        },
        error: function (data) {
            error_callback(data);
        }
    });
};