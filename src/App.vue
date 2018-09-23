<template>
	<div id="app">
		<img src="./assets/logo.png">
		<h1>{{ msg }}</h1>
		<div>
			<p v-for="parts in form">
				{{parts.name}}:{{parts.value}}
			</p>
		</div>
		<vmForm></vmForm>
		<vmFormInput v-bind="form.inputtext" @update-value="updateValue"></vmFormInput>
		<vmFormInput v-bind="form.inputnumber" @update-value="updateValue"></vmFormInput>
		<vmFormInput v-bind="form.inputpassword" @update-value="updateValue"></vmFormInput>
		<vmFormInput v-bind="form.inputcheckbox" @update-value="updateValue"></vmFormInput>
		<vmFormInput v-bind="form.inputradio" @update-value="updateValue"></vmFormInput>
		<a href="#" @click.prevent="onSubmit">送信</a>
	</div>
</template>
<script>
	import vmForm from './components/vmForm.vue';
	import vmFormInput from './components/vmFormInput.vue';

	export default {
		name: 'app',
		data(){
			return {
				msg: 'Formパーツ vue コンポーネント',
				form:{
					inputtext:{
						name:'inputtext',
						type:'text',
						value:'',
						required:true,
						err:''
					},
					inputnumber:{
						name:'inputnumber',
						type:'number',
						value:'',
						step:2,
						required:true,
						err:''
					},
					inputpassword:{
						name:'inputpassword',
						type:'password',
						value:'',
						required:true,
						err:''
					},
					inputcheckbox:{
						name:'inputcheckbox',
						type:'checkbox',
						list:[
							{value:'hoge',label:'ほげ'},
							{value:'fuga',label:'ふが'},
						],
						value:['hoge','fuga'],
						required:true,
						err:''
					},
					inputradio:{
						name:'inputradio',
						type:'radio',
						list:[
							{value:'hoge',label:'ほげ'},
							{value:'fuga',label:'ふが'},
						],
						value:'fuga',
						required:true,
						err:''
					}
				}
			}
		},
		components:{
			vmForm,
			vmFormInput
		},
		methods:{
			updateValue(name,value,is_checked){
				if(Array.isArray(this.form[name].value)){
					if(is_checked !== undefined){
						if(is_checked){
							this.form[name].value.push(value);
						}else{
							this.form[name].value.splice(this.form[name].value.indexOf(value), 1);
						}
					}
				}else{
					// is_checked パラメータが渡されない、もしくは渡されてtrueの場合のみ
					if(is_checked === undefined || is_checked){
						this.form[name].value = value;
					}

				}
			},
			onSubmit(){
				var tgt_form;
				for(var i in this.form){
					tgt_form = this.form[i];
					if(tgt_form.required && !tgt_form.value){
						tgt_form.err = '入力してください';
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	h1, h2 {
		font-weight: normal;
	}
	ul {
		list-style-type: none;
		padding: 0;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
	a {
		color: #42b983;
	}
</style>
