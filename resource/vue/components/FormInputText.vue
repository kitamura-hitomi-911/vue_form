<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <div class="form-text">
            <input type="text" :name="item.name" v-model="value" :placeholder="item.placeholder" :maxlength="item.maxlength" :minlength="item.minlength" :disabled="item.disabled">
        </div>
        <p class="form-err" v-if="err_msg" v-html="err_msg"></p>
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
                    this.$emit('update',{
                        name:this.item.name,
                        value:val
                    });
                }
            },
            err_msg(){
                return this.item.err_msgs.join('<br>');
            }
        },
        created:function(){
            // console.log(this.item);
        },
        name: 'FormInputText'
    };
</script>

<style>

</style>