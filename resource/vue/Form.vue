<template>
    <div class="form">
        <form action="./" method="get" name="frm">
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
                // 入力内容チェック
                let err_flg = this.unit_list.reduce((err_flg, unit) => {
                    return unit.items.reduce((err_flg, item) => {
                        // 初期化
                        let item_err_flg = false;
                        item.err_msgs.splice(0);

                        // 未入力チェック
                        if(item.is_requied){
                            if(Array.isArray(item.value)){
                                if(!item.value.length){
                                    item_err_flg = true;
                                    item.err_msgs.push('選択必須です');
                                }
                            }else if(!item.value){
                                item_err_flg = true;
                                item.err_msgs.push('入力必須です');
                            }
                        }

                        // min max チェック
                        if(!item_err_flg && !Array.isArray(item.value) && item.value !== '' && item.min !== void 0 && item.max !== void 0){
                            if(item.min !== null && item.value < item.min){
                                item_err_flg = true;
                                item.err_msgs.push(item.min + 'より大きな値を指定してください');
                            }
                            if(item.max !== null && item.value > item.max){
                                item_err_flg = true;
                                item.err_msgs.push(item.max + 'より小さな値を指定してください');
                            }
                        }

                        console.log(item.label,item_err_flg,err_flg);
                        return item_err_flg || err_flg;
                    }, err_flg) || err_flg;
                },false);
                if(!err_flg){
                    // document.frm.submit();
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