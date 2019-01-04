<template lang="">
    <Modal v-model="isShow" width="300" @on-cancel="cancel">
        <p slot="header" style="color:#f60;text-align:center">
            <span>设置昵称</span>
        </p>
        <div style="text-align:center">
            <div style="margin-bottom:30px">
                <label>昵称:</label>
                <Input style="width:150px" v-model="changedNick" />
            </div>    
        </div>
        <div slot="footer">
            <Button type="primary" @click="handleOk">确定</Button>
        </div>
    </Modal>
</template>
<script>

export default {
    data(){
        return {
            isShow:false,
            changedNick:''
        }
    },
    methods:{
        handleOk(){
            this.$emit("onSettingNick",this.changedNick);
            this.$emit("changeSettingShow",false);
        },
        cancel(){
            this.$emit("changeSettingShow",false);
        }
    },
    props:{
        isShowSetting:Boolean
    },
    watch: {
        isShowSetting(newVal){
            this.isShow = newVal;
        }
    },
}
</script>
<style lang="less">
    
</style>