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

    import form_data from '@/js/form_data';
    import formatFormUnitData from '@/js/formatFormUnitData';

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
                const formated_form_unit_data = formatFormUnitData(data);
                formated_form_unit_data && this.unit_list.push(formated_form_unit_data);
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