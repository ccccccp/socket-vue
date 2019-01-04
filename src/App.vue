<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">home</router-link>
      <router-link to="/about">about</router-link>
    </div>
    <router-view></router-view>
    <Button type="primary" class="chat-ico" @click="handleOpenChat()">打开</Button>
    <chat-box @close="toogleShow(false)" :isShow="showChatRoom"></chat-box>
    <setting-nick-modal 
      @onSettingNick="onSettingNick"
      @changeSettingShow="changeSettingNickShow"
      :isShowSetting="showSettingNickModal"/>
  </div>
</template>

<script>
import SettingNickModal from './components/settingNickModal.vue'
import ChatBox from './components/ChatBox.vue'
export default {
  name: 'app',
  data(){
    return {
      showChatRoom:false,
      showSettingNickModal:false
    }
  },
  methods:{
    toogleShow(value){
      this.showChatRoom = value;
    },
    onChatRoomClose(){
      this.showChatRoom = false;
    },
    handleOpenChat(){
      if(!window.sessionStorage.getItem("nick")){
        this.showSettingNickModal = true;
      }else{
        this.showChatRoom = true;
      }
      //this.toogleShow(true)
    },
    changeSettingNickShow(value){
      this.showSettingNickModal = value;
    },
    onSettingNick(name){
      window.sessionStorage.setItem("nick",name);
      this.showChatRoom = true;
    }
  },
  components: {
    SettingNickModal,
    ChatBox
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
