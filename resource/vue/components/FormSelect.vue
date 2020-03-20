<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <div class="form-select">
            <p class="form-select-label">{{lebel_selected}}</p>
            <select name="item.name" v-model="value" :disabled="item.disabled">
                <option :value="option.value" v-for="option in item.list" :key="option.value" :disabled="option.disabled">{{option.label}}</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            item:{
                type:Object,
                required:true
            }
        },
        computed:{
            value:{
                get(){
                    return this.item.value;
                },
                set(val){
                    console.log(val);
                    this.$emit('update',{
                        name:this.item.name,
                        value:val
                    });
                }
            },
            lebel_selected(){
                return this.item.list.reduce((acc,option)=> {
                    return option.value == this.item.value ? option.label : acc;
                },'');
            }
        },
        created:function(){
            // console.log(this.item);
        },
        name: 'FormInputSelect'
    };
</script>

<style>

</style>