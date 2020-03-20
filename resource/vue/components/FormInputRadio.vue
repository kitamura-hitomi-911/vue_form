<template>
    <div class="form-item">
        <p class="form-item-ttl" v-if="item.label">{{item.label}}</p>
        <div class="form-radios">
            <label :for="item.name+'_'+radio.value" v-for="radio in item.list">
                <input type="radio" :name="item.name" v-model="value" :value="radio.value" :id="item.name+'_'+radio.value" :disabled="item.disabled || radio.disabled"><span></span>{{radio.label}}
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
        name: 'FormInputRadio'
    };
</script>

<style scoped>

</style>