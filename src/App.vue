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
		<vmFormParts v-bind="form.inputtext" @update-value="updateValue"></vmFormParts>
		<vmFormParts v-bind="form.inputnumber" @update-value="updateValue"></vmFormParts>
		<vmFormParts v-bind="form.inputpassword" @update-value="updateValue"></vmFormParts>
		<vmFormParts v-bind="form.inputcheckbox" @update-value="updateValue"></vmFormParts>
		<vmFormParts v-bind="form.inputradio" @update-value="updateValue"></vmFormParts>
		<vmFormParts v-bind="form.select" @update-value="updateValue"></vmFormParts>
		<vmFormParts v-bind="form.textarea" @update-value="updateValue"></vmFormParts>
		<a href="#" @click.prevent="onSubmit">送信</a>
	</div>
</template>
<script>
	import vmForm from './components/vmForm.vue';
	import vmFormParts from './components/vmFormParts.vue';

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
					},
					select:{
						name:'select',
						type:'select',
						list:[
							{value:'',label:'↓選択してください'},
							{value:'hoge1',label:'ほげ1'},
							{value:'fuga1',label:'ふが1'},
							{value:'hoge2',label:'ほげ2'},
							{value:'fuga2',label:'ふが2'},
							{value:'hoge3',label:'ほげ3'},
							{value:'fuga3',label:'ふが3'},
						],
						value:'hoge1',
						required:true,
						err:''
					},
					textarea:{
						name:'textarea',
						type:'textarea',
						value:'',
						placeholder:'入力してください',
						required:true,
						err:''
					}
				}
			}
		},
		components:{
			vmForm,
			vmFormParts
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
