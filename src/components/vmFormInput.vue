<template>
	<div class="formparts">
		<div class="formparts-input">
			<input :name="name" :type="type" :value="value" :placeholder="placeholder" :min="min" :max="max" :step="step" @input="onInput" v-if="type==='text'||type==='number'||type==='password'">
			<label v-for="item in list" v-if="type=='checkbox'||type=='radio'"><input  :name="name" :type="type" :value="item.value" :checked="value==item.value || Array.isArray(value) && value.indexOf(item.value) >= 0" @change="onChange">{{item.label}}</label>
		</div>
		<p class="formparts-err" v-if="err">{{err}}</p>
	</div>

</template>
<script>
	export default {
		name:'vmFormInput',
		props:{
			name:{
				type:String,
				required:true,
			},
			type:{
				type:String,
				required:true
			},
			list:{
				type:Array
			},
			value:{
				type:[String,Array],
				required:true,
				default:''
			},
			pattern:{
				type:String
			},
			min:{
				type:Number
			},
			max:{
				type:Number
			},
			step:{
				type:Number
			},
			placeholder:{
				type:String
			},
			err:{
				type:String,
				required:true,
				default:''
			}
		},
		data:function(){
			return {
			}
		},
		methods:{
			onInput:function(e){
				this.$emit('update-value',this.name,e.target.value);
			},
			/* checkbox、radio、select 変更時はchecked もチェック */
			onChange:function(e){
				this.$emit('update-value',this.name,e.target.value,e.target.checked);
			}
		}
	};
</script>
<style>
	.form-input{
		color:#f00;
	}
</style>