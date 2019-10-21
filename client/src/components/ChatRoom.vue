<template>
  <div class="chat-room">
    <div v-if="false" class="chat-unlogin">
      <input  placeholder="请输入昵称" autocomplete="off" />
      <button>确 定</button>
    </div>
    <div v-else class="chat-container">
      <header class="header">
        <img :src="chatLogo" />
        <h3>聊天室</h3>
      </header>
      <main class="main">
        <aside class="conversation">
          <div class="conversation-content">
            <p class="system">
              <span>15:00:18</span>
              <br>
              <span>3  进入了聊天室</span>
            </p>
            <ul class="message-list">
              <li class="right clearfix">
                <img :src="avatar1" />
                <div>
                  <span class="name">华海涛</span>
                  <p>
                    <span class="content">2</span>
                  </p>
                </div>
              </li>

              <li class="left clearfix">
                <img :src="avatar1" />
                <div>
                  <span class="name">测试人员</span>
                  <p>
                    <span class="content">2</span>
                  </p>
                </div>
              </li>

              <li class="left clearfix">
                <img :src="avatar1" />
                <div>
                  <span class="name">华海涛</span>
                  <p>
                    <span class="content">2</span>
                  </p>
                </div>
              </li>

            </ul>
          </div>
          <div class="conversation-input">
            <div class="edit">
              <i class="fa fa-font" title="自定义字体颜色"></i>
              <i class="fa fa-smile-o" title="双击取消选择"></i>
              <i class="fa fa-bolt" title="点击页面震动"></i>
              <i class="fa fa-picture-o" title="点击发送图片"></i>
            </div>
            <textarea class="textarea" placeholder="输入 Enter 发送消息"></textarea>
          </div>
        </aside>
        <aside class="contacts">
          <h3>在线人员 ( {{ count }} )</h3>
          <ul class="contacts-list">
            <li>
              <img :src="avatar1" />
              <span>32牛</span>
            </li>
            <li>
              <img :src="avatar1" />
              <span>3</span>
            </li>
            <li>
              <img :src="avatar1" />
              <span>3</span>
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
  props: {
    msg: String
  },
  data() {
    return {
      count: 0,
      chatLogo,
      avatar1,
      avatar2,
      avatar3,
      avatar4
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
  }

  .left img, .left div {
    float: left;
  }

  .message-list div > p {
    display: flex;
    max-width: 300px;
    height: auto;
    padding: 10px;
    margin-top: 5px;
    word-wrap: break-word;
    font-size: 14px;
    border-radius: 5px;
    background-color: #86bdf8;
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
    height: 65px;
    vertical-align: middle;
    text-align: center;
  }

  .contacts-list li img {
    width: 100%;
    height: 60px;
  }

</style>
