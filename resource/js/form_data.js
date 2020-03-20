export default [
    {
        label: 'カテゴリ1',
        id:'cat1',
        items:[
            {
                label:'1行テキスト',
                name:'hoge1',
                type:'text',
                value:'',
                placeholder:'入力してください',
                maxlength:80,
                is_requied:true
            }
        ]
    },
    {
        label: 'カテゴリ2',
        id:'cat2',
        items:[
            {
                label:'ラジオボタン',
                name:'hoge2',
                type:'radio',
                value:'',
                list:[
                    {
                        label:'候補1',
                        value:'radio1',
                    },
                    {
                        label:'候補2',
                        value:'radio2',
                    },
                    {
                        label:'候補3',
                        value:'radio3',
                    }
                ],
                is_requied:true
            }
        ]
    },
    {
        label: 'カテゴリ3',
        id:'cat3',
        items:[
            {
                label:'チェックボックス',
                name:'hoge3',
                type:'checkbox',
                value:[],
                list:[
                    {
                        label:'候補1',
                        value:'checkbox1',
                    },
                    {
                        label:'候補2',
                        value:'checkbox2',
                    },
                    {
                        label:'候補3',
                        value:'checkbox3',
                    }
                ],
                is_requied:true
            },
            {
                label:'テキストエリア',
                name:'hoge5',
                type:'textarea',
                value:'',
                placeholder:'入力してください\nよろしく'
            }
        ]
    },
    {
        label: 'カテゴリ4',
        id:'cat4',
        items:[
            {
                label:'プルダウン',
                name:'hoge4',
                type:'select',
                value:'',
                list:[
                    {
                        label:'選択してください',
                        value:'',
                    },
                    {
                        label:'候補1',
                        value:'select1',
                    },
                    {
                        label:'候補2',
                        value:'select2',
                    },
                    {
                        label:'候補3',
                        value:'select3',
                    }
                ]
            }
        ]
    }
];