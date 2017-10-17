var StorageStorage = {};  // 库房管理
var StorageInOut = {
    Await:{},
    In:{},
    Out:{}
}; //  出入库

function storage_error(data) {
    alert('操作失败，请刷新后重试！');
    console.log(data);
}

//库房
StorageStorage.add = function (storage, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = storage;
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'post',
        url: SERVER_URL + '/warehouse/add',
        data: params,
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
StorageStorage.update = function (id, storage, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    storage['warehouse_id'] = id;
    this.add(storage, success_callback, error_callback);
};
StorageStorage.update_status = function (id, user_id,status, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        warehouse_id: id,
        uid:user_id,
        status_flag: status ? 'enable':'disable'
    };

    params['token'] = Admin.get_token();
    $.ajax({
        type: 'POST',
        url: SERVER_URL + '/warehouse/setstatus',
        data: params,
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
StorageStorage.all = function (page,num,key, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {};
    if (key != '') {
        params['key'] = key;
    }
    params['page'] = page?page :1;
    params['num'] = num?num:1;
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'get',
        url: SERVER_URL + '/warehouse/list',
        data: params,
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
StorageStorage.detail = function (id, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        warehouse_id: id
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'get',
        url: SERVER_URL + '/warehouse/info',
        data: params,
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
StorageStorage.deleted = function (id, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = supplier_error;
    }
    var params = {
        warehouse_id:id
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'post',
        url: SERVER_URL + '/warehouse/del',
        data: params,
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

//出入库
// 带入库
StorageInOut.Await.add = function (order_id,thetype, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        order_id:order_id,
        thetype:thetype
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'post',
        url: SERVER_URL + '/putordering/add',
        data: params,
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
StorageInOut.Await.update = function (id, order_id,thetype, success_callback, error_callback) {

};
StorageInOut.Await.update_status = function (id, user_id,status, success_callback, error_callback) {
    return ;
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        warehouse_id: id,
        uid:user_id,
        status_flag: status ? 'enable':'disable'
    };

    params['token'] = Admin.get_token();
    $.ajax({
        type: 'POST',
        url: SERVER_URL + '/warehouse/setstatus',
        data: params,
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
StorageInOut.Await.all = function (page,num,key, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {};
    if (key != '') {
        params['key'] = key;
    }
    params['page'] = page?page :1;
    params['num'] = num?num:1;
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'get',
        url: SERVER_URL + '/putordering/list',
        data: params,
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
StorageInOut.Await.detail = function (id, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        warehouse_id: id
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'get',
        url: SERVER_URL + '/putordering/info',
        data: params,
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
StorageInOut.Await.deleted = function (id, success_callback, error_callback) {
    return ;
    if (!error_callback) {
        error_callback = supplier_error;
    }
    var params = {
        warehouse_id:id
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'post',
        url: SERVER_URL + '/warehouse/del',
        data: params,
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
StorageInOut.Await.export = function(key,success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        key: key
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'get',
        url: SERVER_URL + '/putordering/export',
        data: params,
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
StorageInOut.Await.stock = function(product_id,success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        product_id: product_id
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'get',
        url: SERVER_URL + '/putordering/stock',
        data: params,
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

//入库
StorageInOut.In.add = function (storage, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = storage;
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'post',
        url: SERVER_URL + '/putorder/add',
        data: params,
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
StorageInOut.In.update = function (id, storage, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    storage['id'] = id;
    this.add(storage, success_callback, error_callback);
};
StorageInOut.In.update_status = function (id, user_id,status, success_callback, error_callback) {
    return ;
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        warehouse_id: id,
        uid:user_id,
        status_flag: status ? 'enable':'disable'
    };

    params['token'] = Admin.get_token();
    $.ajax({
        type: 'POST',
        url: SERVER_URL + '/warehouse/setstatus',
        data: params,
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
StorageInOut.In.all = function (page,num,key, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {};
    if (key != '') {
        params['key'] = key;
    }
    params['page'] = page?page :1;
    params['num'] = num?num:1;
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'get',
        url: SERVER_URL + '/putorder/list',
        data: params,
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
StorageInOut.In.detail = function (id, success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        warehouse_id: id
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'get',
        url: SERVER_URL + '/putorder/info',
        data: params,
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
StorageInOut.In.deleted = function (id, success_callback, error_callback) {
    return ;
    if (!error_callback) {
        error_callback = supplier_error;
    }
    var params = {
        id:id
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'post',
        url: SERVER_URL + '/putorder/del',
        data: params,
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
StorageInOut.In.export = function(key,success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        key: key
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'get',
        url: SERVER_URL + '/putorder/export',
        data: params,
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
StorageInOut.In.by_scan = function(putorder_id,product_id,series_sn,success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        putorder_id:putorder_id,
        product_id: product_id,
        series_sn:series_sn
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'post',
        url: SERVER_URL + '/putorder/scanruku',
        data: params,
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
StorageInOut.In.xu_list = function(putorder_id,product_id,success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        putorder_id:putorder_id,
        product_id: product_id
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'get',
        url: SERVER_URL + '/putorder/xulist',
        data: params,
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
StorageInOut.In.common_save = function(putorder_id,product_id,num,success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        putorder_id:putorder_id,
        product_id: product_id,
        num:num
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'post',
        url: SERVER_URL + '/putorder/ptruku',
        data: params,
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
StorageInOut.In.sure_save = function(putorder_id,package,remark,success_callback, error_callback) {
    if (!error_callback) {
        error_callback = storage_error;
    }
    var params = {
        putorder_id:putorder_id,
        package: package,
        remark:remark
    };
    params['token'] = Admin.get_token();
    $.ajax({
        type: 'post',
        url: SERVER_URL + '/putorder/queruku',
        data: params,
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




