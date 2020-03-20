const unit_props = {
    required:['label','id','items'],
    optional:[
        {err_msgs:[]}
    ]
};
const setting_by_type = {
    text:{
        component_name:'FormInputText',
        item_props:{
            required:['name','type','value'],
            optional:[
                {label:''},
                {placeholder:''},
                {disabled:false},
                {is_requied:false}
            ]
        }
    },
    radio: {
        component_name: 'FormInputRadio',
        item_props:{
            required:['name','type','list','value'],
            optional:[
                {label:''},
                {disabled:false},
                {is_requied:false}
            ]
        },
        item_list_props:{
            required:['label','value'],
            optional:[
                {disabled:false}
            ]
        }
    },
    checkbox: {
        component_name: 'FormInputCheckbox',
        item_props:{
            required:['name','type','list','value'],
            optional:[
                {label:''},
                {disabled:false},
                {is_requied:false}
            ]
        },
        item_list_props:{
            required:['label','value'],
            optional:[
                {disabled:false}
            ]
        }
    },
    select: {
        component_name: 'FormSelect',
        item_props:{
            required:['name','type','list','value'],
            optional:[
                {label:''},
                {disabled:false},
                {is_requied:false}
            ]
        },
        item_list_props:{
            required:['label','value'],
            optional:[
                {disabled:false}
            ]
        }
    },
    textarea: {
        component_name: 'FormTextarea',
        item_props:{
            required:['name','type','value'],
            optional:[
                {label:''},
                {disabled:false},
                {placeholder:''},
                {is_requied:false}
            ]
        }
    }

};

export default data => {
    // unit の必須プロパティの不足チェック
    if(unit_props.required.some(prop=> data[prop] === void 0)){
        console.error('Missing required property in form data',data);
        return null;
    }
    // unit の任意プロパティのチェック
    unit_props.optional.forEach(prop_default => {
        Object.keys(prop_default).forEach(key => {
            if(data[key] === void 0){
                data[key] = prop_default[key];
            }
        });
    });

    data.items.forEach(item => {
        // item のプロパティチェック
        const _item_props = setting_by_type[item.type].item_props;
        // 必須
        if(_item_props.required.some(prop => item[prop] === void 0)){
            console.error('Missing required property in item data',item);
        }
        // 任意
        _item_props.optional.forEach(prop_default => {
            Object.keys(prop_default).forEach(key => {
                if(item[key] === void 0){
                    item[key] = prop_default[key];
                }
            });
        });

        // item の component_name をセット
        item.component_name = setting_by_type[item.type].component_name;

        // item.list のプロパティのチェック
        const _item_list_props = setting_by_type[item.type].item_list_props || '';
        _item_list_props && item.list && item.list.forEach(list_item => {
            // 必須
            if(_item_list_props.required.some(prop => list_item[prop] === void 0)){
                console.error('Missing required property in item.list data',item);
            }
            // 任意
            _item_list_props.optional.forEach(prop_default => {
                Object.keys(prop_default).forEach(key => {
                    if(list_item[key] === void 0){
                        list_item[key] = prop_default[key];
                    }
                });
            });
        });


    });
    return data;
};