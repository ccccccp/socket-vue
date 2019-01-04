<template lang="">
    <Modal v-model="isShow" width="300" @on-cancel="cancel">
        <p slot="header" style="color:#f60;text-align:center">
            <span>设置ip及端口号</span>
        </p>
        <div style="text-align:center">
            <div style="margin-bottom:30px">
                <label>ip地址:</label>
                <Input style="width:150px" v-model="changedIp" />
            </div> 
            <div>
                <label>端口号:</label>
                <Input style="width:150px" v-model="changedPort" />
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
            changedIp:'45.77.63.186',
            changedPort:'8899'
        }
    },
    methods:{
        handleOk(){
            this.$emit("changeSetting",{
                ip:this.changedIp,
                port:this.changedPort
            });
            this.$emit("changeSettingShow",false);
        },
        cancel(e){
            this.$emit("changeSettingShow",false);
        }
    },
    props:{
        isShowSetting:Boolean,
        ip:String,
        port:String
    },
    watch: {
        isShowSetting(newVal,oldVal){
            this.isShow = newVal;
        },
        ip(newVal,oldVal){
            this.changedIp = newVal;
        },
        port(newVal){
            this.changedPort = newVal;
        }
    },
}
</script>
<style lang="less">
    
</style>