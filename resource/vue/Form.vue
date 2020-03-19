<template>
    <div class="form">
        <form action="">
            <ul>
                <li v-for="unit in unit_list" :key="unit.id">
                    <dl>
                        <dt>{{unit.label}}</dt>
                        <dd>
                            <component v-for="item in unit.items" :key="item.name" :is="item.component_name" :item="item" @update="update"></component>
                        </dd>
                    </dl>
                </li>
            </ul>
        </form>
    </div>
</template>

<script>
    import FormInputText from '@/vue/components/FormInputText';
    import FormInputRadio from '@/vue/components/FormInputRadio';
    import FormInputCheckbox from '@/vue/components/FormInputCheckbox';
    import FormInputSelect from '@/vue/components/FormInputSelect';

    const form_data = [
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
                    is_requied:true
                }
            ],
            err_msgs:[],
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
            ],
            err_msgs:[],
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
                }
            ],
            err_msgs:[],
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
                    ],
                    is_requied:true
                }
            ],
            err_msgs:[],
        }
    ];
    export default {
        data:function(){
            return {
                unit_list:[],
            }
        },
        computed:{
            item_by_name(){
                return this.unit_list.reduce((acc,unit) => {
                    unit.items.forEach(item => {
                       acc[item.name] = item;
                    });
                    return acc;
                },{});
            }
        },
        created:function(){
            form_data.forEach(data=>{
                data.items.forEach(item => {
                    const component_name_rules = {
                        text:'FormInputText',
                        radio:'FormInputRadio',
                        checkbox:'FormInputCheckbox',
                        select:'FormInputSelect'
                    };
                    item.component_name = component_name_rules[item.type];
                });
                this.unit_list.push(data);
            });

        },
        components:{
            FormInputText,
            FormInputRadio,
            FormInputCheckbox,
            FormInputSelect
        },
        methods:{
            update(update_obj){
                if(Array.isArray(this.item_by_name[update_obj.name].value)){
                    // 配列の場合は1回リセットして入れなおす
                    this.item_by_name[update_obj.name].value.splice();
                    Array.isArray(update_obj.value) && update_obj.value.forEach(update_value => {
                        this.item_by_name[update_obj.name].value.push(update_value);
                    });




                }else{
                    this.item_by_name[update_obj.name].value = update_obj.value;
                }

            }
        },
        name: 'Form'
    };
</script>

<style lang="scss">
    li{
        &+li{
            margin-top:10px;
        }
    }
</style>