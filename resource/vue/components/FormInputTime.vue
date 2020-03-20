<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <div class="form-time">
            <input type="time" :name="item.name" v-model="value" :placeholder="item.placeholder" :max="item.max" :min="item.min" :step="item.step" :disabled="item.disabled">
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
        name: 'FormInputTime'
    };
</script>

<style>

</style>