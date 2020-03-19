<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <input type="text" :name="item.name" v-model="value" :placeholder="item.placeholder">
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
        name: 'FormInputText'
    };
</script>

<style scoped>

</style>