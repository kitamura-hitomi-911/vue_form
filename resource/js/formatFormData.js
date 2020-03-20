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
            required:['name','type'],
            optional:[
                {label:''},
                {value:''},
                {placeholder:''},
                {is_requied:false}
            ]
        }
    },
    radio: {
        component_name: 'FormInputRadio',
        item_props:{
            required:['name','type','list'],
            optional:[
                {label:''},
                {value:''},
                {is_requied:false}
            ]
        }
    },
    checkbox: {
        component_name: 'FormInputCheckbox',
        item_props:{
            required:['name','type','list'],
            optional:[
                {label:''},
                {value:''},
                {is_requied:false}
            ]
        }
    },
    select: {
        component_name: 'FormSelect',
        item_props:{
            required:['name','type','list'],
            optional:[
                {label:''},
                {value:''},
                {is_requied:false}
            ]
        }
    },
    textarea: {
        component_name: 'FormTextarea',
        item_props:{
            required:['name','type'],
            optional:[
                {label:''},
                {value:''},
                {placeholder:''},
                {is_requied:false}
            ]
        }
    }

};

export default data => {
    // unit の必須プロパティの不足チェック
    if(unit_props.required.some(prop=> data[prop] === void 0)){
        console.error('Missing required propert in form data',data);
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
        // item の必須プロパティの不足チェック
        const _item_props = setting_by_type[item.type].item_props;
        if(_item_props.required.some(prop => item[prop] === void 0)){
            console.error('Missing required propert in item data',item);
        }
        // item の任意プロパティのチェック
        _item_props.optional.forEach(prop_default => {
            Object.keys(prop_default).forEach(key => {
                if(data[key] === void 0){
                    data[key] = prop_default[key];
                }
            });
        });

        // item の component_name をセット
        item.component_name = setting_by_type[item.type].component_name;
    });
    return data;
};