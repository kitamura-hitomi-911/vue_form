<template>
    <div class="form">
        <form action="./" method="get" name="frm">
            <ul>
                <li v-for="unit in unit_list" :key="unit.id">
                    <dl>
                        <dt>{{unit.label}}</dt>
                        <dd>
                            <component v-for="item in unit.items" :key="item.name" :is="item.component_name" :item="item" @update="update"></component>
                            <p class="form-err" v-if="unit.err_msgs"></p>
                        </dd>
                    </dl>
                </li>
            </ul>
            <div class="form-btn_area">
                <p class="btn btn-submit"><a href="#" @click.prevent="onClickSubmit">送信</a></p>
            </div>
        </form>
    </div>
</template>

<script>
    import FormInputText from '@/vue/components/FormInputText';
    import FormInputNumber from '@/vue/components/FormInputNumber';
    import FormInputDate from '@/vue/components/FormInputDate';
    import FormInputTime from '@/vue/components/FormInputTime';
    import FormInputRadio from '@/vue/components/FormInputRadio';
    import FormInputCheckbox from '@/vue/components/FormInputCheckbox';
    import FormSelect from '@/vue/components/FormSelect';
    import FormTextarea from '@/vue/components/FormTextarea';

    import form_data from '@/js/form_data';
    import formatFormData from '@/js/formatFormData';

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
                const formated_form_unit_data = formatFormData(data);
                formated_form_unit_data && this.unit_list.push(formated_form_unit_data);
            });

        },
        components:{
            FormInputText,
            FormInputNumber,
            FormInputDate,
            FormInputTime,
            FormInputRadio,
            FormInputCheckbox,
            FormSelect,
            FormTextarea
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

            },
            onClickSubmit(){
                document.frm.submit();
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