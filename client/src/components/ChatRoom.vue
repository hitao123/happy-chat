<template>
  <div class="chat-room">
    <div v-if="notEnter" class="chat-unlogin">
      <input class="input"
        placeholder="请输入昵称"
        autocomplete="off"
        v-model="inputName"
        @keyup.enter="handleEnter"
      />
      <button class="button" @click="handleEnter">确 定</button>
    </div>
    <div v-else class="chat-container" :class="shake ? 'shaking-animation' : ''">
      <header class="header">
        <img :src="chatLogo" />
        <h3>聊天室</h3>
      </header>
      <main class="main">
        <aside class="conversation">
          <div class="conversation-content">
            <p class="system" v-for="(item, index) in enterAndLeaveList" :key="index">
              <span>{{ item.time }}</span>
              <br>
              <span>{{ item.name }} {{ item.status }}了聊天室</span>
            </p>
            <ul class="message-list">
              <template v-for="(item, index) in messageList">
                <li class="clearfix" :class="item.side" :key="index">
                  <img :src="item.avatar" />
                  <div>
                    <span class="name">{{ item.name }}</span>
                    <p :style="{color: item.color}">
                      <img v-if="item.type === 'img'" :src="item.msg" class="chat-img" />
                      <span v-else class="content">{{ item.msg }}</span>
                    </p>
                  </div>
                </li>
              </template>
            </ul>
          </div>
          <div class="conversation-input">
            <div class="edit">
              <label for="color">
                <i class="fa fa-font" title="自定义字体颜色"></i>
              </label>
              <input class="hidden" type="color" id="color" @change="handleColorChoose" />
              <!-- <i class="fa fa-smile-o" title="双击取消选择" @click="handleEmojiChoose"></i> -->
              <i class="fa fa-bolt" title="点击页面震动" @click="handleShake"></i>
              <label for="file">
                <i class="fa fa-picture-o" title="点击发送图片"></i>
              </label>
              <input class="hidden" type="file" id="file" @change="handleImage" accept="image/*" />
            </div>
            <textarea
              class="textarea"
              placeholder="输入 Enter 发送消息"
              @keyup.enter="handleSendMsg"
              v-model="message"
            >
            </textarea>
          </div>
        </aside>
        <aside class="contacts">
          <h3>在线人员 ( {{ onlineUserList.length }} )</h3>
          <ul class="contacts-list">
            <li v-for="(item, index) in onlineUserList" :key="index">
              <img :src="item.avatar" />
              <span>{{ item.nickName }}</span>
            </li>
          </ul>
        </aside>
      </main>
      </div>
  </div>
</template>

<script>
import chatLogo from '../assets/image/logo.jpg';
import avatar1 from '../assets/image/avatar1.jpg';
import avatar2 from '../assets/image/avatar2.jpg';
import avatar3 from '../assets/image/avatar3.jpg';
import avatar4 from '../assets/image/avatar4.jpg';

export default {
  name: 'chatRoom',
  data() {
    return {
      chatLogo,
      avatar1,
      avatar2,
      avatar3,
      avatar4,
      notEnter: true,
      inputName: '',
      message: '',
      onlineUserList: [],
      messageList: [],
      enterAndLeaveList: [],
      color: '#000',
      shake: false,
      timer: null
    }
  },
  mounted() {
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e));
  },
  methods: {
    handleEnter() {
      if (!this.inputName.trim()) {
        return;
      }

      this.$socket.emit('login', {
        nickName: this.inputName,
        avatar: this.getRandomAvatar()
      });
    },
    getRandomAvatar() {
      const random = Math.floor(Math.random() * 4) + 1;

      switch (random) {
        case 1:
          return avatar1;
        case 2:
          return avatar2;
        case 3:
          return avatar3;
        case 4:
          return avatar4;
        default:
          return avatar1;
      }
    },
    handleSendMsg() {
      if (!this.message.trim()) {
        alert("输入内容不能为空")
        return;
      } else {
        this.$socket.emit('sendMsg', {
          msg: this.message,
          color: this.color,
          type: 'text'
        });
        this.message = '';
      }
    },
    handleColorChoose(e) {
      this.color = e.target.value || '#000';
    },
    handleEmojiChoose() {
      //
    },
    handleShake() {
      this.$socket.emit('shake');
      this.shake = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.shake = false;
      }, 500);
    },
    handleImage(e) {
      const file = e.target.files[0];
      const img = window.URL.createObjectURL(file);
      this.$socket.emit('sendMsg', {
        msg: img,
        color: this.color,
        type: 'img'
      });
    },
    beforeunloadFn(e) {
      const event = window.event || e;
      event.returnValue = ("确定离开当前页面吗？");
    }
  },
  sockets: {
    connect() {
      /* eslint no-console:off */
      console.log('socket connected')
    },
    loginSuccess() {
      this.notEnter = false;
    },
    userRepeat() {
      alert('用户名已存在，请重新输入！');
    },
    onlineUser(data) {
      this.onlineUserList = data;
    },
    receiveMsg(data) {
      this.messageList.push(data);
      // const messageNode = document.querySelector(".message-list");
      // this.$nextTick(() => {
      //   messageNode.scrollTop = messageNode.scrollHeight;
      // });
    },
    enterAndLeft(data) {
      this.enterAndLeaveList.push(data);
    },
    shake(data) {
      this.enterAndLeaveList.push(data);
    }
  }
}
</script>

<style>
  .clearfix::after {
    content: "020";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .chat-room .chat-unlogin {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 200px;
    margin: 100px auto;
    padding: 0 30px;
    border: 2px #eee solid;
    border-radius: 10px;
    box-shadow: 2px 2px 4px #ccc;
    background-color: #fff;
  }

  .chat-unlogin .input {
    display: block;
    outline: none;
    height: 30px;
    width: 100%;
  }

  .chat-unlogin .button {
    width: 120px;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 5px;
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
    text-shadow: 0 -1px 0 rgba(0,0,0,0.12);
    box-shadow: 0 2px 0 rgba(0,0,0,0.045);
    cursor: pointer;
  }

  .chat-unlogin .button:focus {
    outline: 0;
  }

  .chat-room .chat-container {
    position: relative;
    width: 705px;
    height: 556px;
    margin: 7vh auto;
    border: 2px #eee solid;
    border-radius: 10px;
    box-shadow: 2px 2px 4px #ccc;
    background-color: #fff;
  }
  .chat-container .header {
    height: 80px;
    border-bottom: 2px #eee solid;
  }
  .chat-container .main {
    height: 472px;
    display: flex;
  }
  .header {
    padding-left: 20px;
    text-align: left;
  }
  .header h3 {
    display: inline-block;
    margin: 0;
    line-height: 80px;
    vertical-align: middle;
    margin-left: 10px;
  }
  .header img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .chat-container .conversation {
    width: 490px;
    border-right: 2px #eee solid;
  }
  .chat-container .contacts {
    width: 210px;
  }

  .contacts h3 {
    padding-left: 10px;
  }

  .conversation .conversation-content {
    height: 346px;
    padding: 20px 10px 0px 10px;
    overflow-y: auto;
  }

  .conversation-content .system {
    color: #888;
    text-align: center;
    margin: 5px;
  }

  .system span {
    background-color: #eee;
    border-radius: 9px;
    padding: 1px 5px;
    margin-bottom: 7px;
    display: inline-block;
  }

  .conversation-content .message-list li img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }


  .right img, .right div {
    float: right;
    text-align: right;
  }

  .left img, .left div {
    float: left;
    text-align: left;
  }

  .message-list div > p {
    display: flex;
    max-width: 310px;
    height: auto;
    padding: 10px;
    margin-top: 5px;
    word-wrap: break-word;
    font-size: 14px;
    border-radius: 5px;
    background-color: #86bdf8;
  }

  .message-list div > p .chat-img {
    margin: 0;
    padding: 0;
    max-width: 300px;
    max-height: 188px;
    width: auto;
    height: auto;
    border-radius: 5px;
    vertical-align: bottom;
  }

  .conversation .conversation-input {
    height: 124px;
    border-top: 1px #ddd solid;
    position: relative;
  }
  .conversation-input textarea {
    display: block;
    width: 100%;
    height: 94px;
    padding-left: 5px;
    padding-top: 5px;
    resize: none;
    font-size: 16px;
    background: none;
    border: none;
    outline: none;
  }

  .conversation-input .edit {
    width: 100%;
    height: 25px;
    text-align: left;
  }
  .edit i {
    padding: 5px 6px;
    cursor: pointer;
  }

  .contacts .contacts-list {
    list-style: none;
  }

  .contacts-list li {
    display: inline-block;
    width: 70px;
    height: 90px;
    vertical-align: middle;
    text-align: center;
  }

  .contacts-list li img {
    width: 100%;
    height: 60px;
  }

  .hidden {
    width: 0;
    height: 0;
    visibility: hidden;
  }

  .shaking-animation {
    animation: shake 0.2s infinite;
  }

  @keyframes shake {
    0% {
        left: 0;
    }
    25% {
        left: -7px;
    }
    50% {
        left: 7px;
    }
    100% {
        left: 0;
    }
  }

</style>
