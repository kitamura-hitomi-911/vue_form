<template>
    <div class="form">
        <form action="">
            <ul>
                <li>ここにフォームの塊が入る</li>
            </ul>
        </form>
    </div>
</template>

<script>
    export default {
        data:function(){
            return {
                form_data:[]
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