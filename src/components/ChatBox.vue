<template>
<div :style="{display:isShow?'block':'none'}">
  <div class="chat-box">
    <div class="header">
      <div>
        <label>昵称:</label>
        <Input style="width:100px" size="small" v-model="myNick"/>
      </div>
      <div>
        <div>
          <a @click="handleClose()">关闭</a>
        </div>
        <div>
          <a @click="setShowSetting()">设置</a>
        </div>
      </div>
      
    </div>
    <div class="content">
      <ul class="chat-list">
        <li v-for="item in msgList" :key="item.$index">
          <div v-if="item.type===MESSAGE_TYPES.OTHER_PEOPLE || item.type===MESSAGE_TYPES.ME">
            <div
              :class="{'msg-top':true,'me':item.type===2}"
            >{{item.nickName}} {{item.time | chatTime}}</div>
            <div :class="{'msg-cont':true,'me':item.type===2}">{{item.data}}</div>
          </div>
          <div v-if="item.type === MESSAGE_TYPES.OTHER" class="msg-tips-wrap">
            <div class="msg-tips">{{item.data}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="input-wrap">
        <Input type="textarea" autosize v-model="sendData"/>
      </div>
      <Button @click="sendMsg()">发送</Button>
    </div>
  </div>
  <setting-modal
    :ip="setting.ip"
    :port="setting.port"
    @changeSetting="changeSetting"
    @changeSettingShow="changeSettingShow"
    :isShowSetting="showSetting"
    />
</div>
  
  
</template>

<script>
import SettingModal from './SettingModal.vue';
import moment from 'moment';
import {ip as IP,port as PORT} from './config.js';
console.log(IP,PORT);
const MESSAGE_TYPES = {
  OTHER_PEOPLE: 1,
  ME: 2,
  OTHER: 3
};
export default {
  name: "ChatBox",
  data() {
    return {
      mounted:false,
      ws:null,
      MESSAGE_TYPES,
      myNick:'',
      msgList: [
      ],
      sendData: "",
      showSetting:false,
      setting:{
        ip:IP,
        port:PORT
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    setShowSetting(){
      this.showSetting = true;
    },
    changeSettingShow(isShow){
      this.showSetting = isShow;
    },
    changeSetting(setting){
      const {port,ip} = setting;
      this.setting.ip = ip;
      this.setting.port = port;
      this.connect();
    },
    sendMsg() {
      let data = this.sendData.trim();
      if (data === "") {
        return;
      }
      let sendData = {
          data,
          nickName:this.myNick,
          time: new Date().getTime()
        };
      sendData = '@msg#'+ JSON.stringify(sendData);
      this.ws.send(sendData);
    },
    showData(data){
      this.msgList.push({
          ...data
        });
    },
    connect(){
      const url = 'ws://'+this.setting.ip+':'+this.setting.port+'/';
      this.ws = new WebSocket(url);
      console.log("开始连接,url:",url);
      this.ws.onopen=()=>{
        //第一次连接告知服务器昵称
        const data = '@nick#' + this.myNick;
        this.ws.send(data);
      };
      this.ws.onerror=()=>{
        console.log("onRROR");
      }
      this.ws.onmessage = (e)=>{
            var data = e.data;
            data = JSON.parse(data);
            console.log(data)
            this.showData(data);
            
        }
    }
  },
  filters:{
    chatTime(time){
      return moment(time).format("HH:mm:ss");
    }
  },
  props: {
    isShow: Boolean
  },
  watch:{
    isShow(value){
      if(this.mounted === false){
        if(value){
          this.mounted = true;
          this.myNick = window.sessionStorage.getItem("nick");
          this.connect();
        }
      }
    }
  },
  components:{SettingModal}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@border-color: #ccc;
.chat-box {
  width: 300px;
  box-shadow: 0 0 2px @border-color;
  border: 1px solid @border-color;
  box-shadow: 4px;
  position: absolute;
  width: 300px;
  left: 50%;
  top: 180px;
  margin-left: -150px;
  background-color: white;
  .header {
    padding:10px;
    display:flex;
    justify-content: space-between;
    border-bottom: 1px solid @border-color;
  }
  .content {
    height: 250px;
    overflow: auto;
    padding: 0 15px;
    .chat-list {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        margin-bottom: 15px;
        .msg-top {
          color: blue;
          &.me {
            text-align: right;
            color: green;
          }
        }
        .msg-cont {
          padding-left: 15px;
          &.me {
            text-align: right;
          }
        }
        .msg-tips-wrap {
          text-align: center;
          .msg-tips {
            padding: 20px 40px;
            background-color: #ccc;
            display: inline-block;
          }
        }
      }
    }
  }
  .footer {
    padding: 10px;
    border-top: 1px solid @border-color;
    display: flex;
    .input-wrap {
      width: 200px;
      textarea {
        border: 0 none !important;
      }
    }
  }
}
</style>
