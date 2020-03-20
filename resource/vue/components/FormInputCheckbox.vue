<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <div class="form-checkboxes">
            <label :for="item.name+'_'+checkbox.value" v-for="checkbox in item.list">
                <input type="checkbox" :name="item.name" v-model="value" :value="checkbox.value" :id="item.name+'_'+checkbox.value" :disabled="item.disabled || checkbox.disabled"><span></span>{{checkbox.label}}
            </label>
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
            }
        },
        created:function(){
            // console.log(this.item);
        },
        name: 'FormInputCheckbox'
    };
</script>

<style scoped>

</style>