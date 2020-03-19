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
                        radio:'FormInputRadio'
                    };
                    item.component_name = component_name_rules[item.type];
                });
                this.unit_list.push(data);
            });

        },
        components:{
            FormInputText:FormInputText,
            FormInputRadio:FormInputRadio
        },
        methods:{
            update(update_obj){
                this.item_by_name[update_obj.name].value = update_obj.value;
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