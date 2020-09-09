<template>
  <div>
    test
  </div>
</template>

<script>
import SendBird from 'SendBird'

export default {
  name: 'zixun',
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const appId = '2AA82DD3-AE28-4E73-AA47-F691FD5A8344'
      const USER_ID = 'seejie'
      const ACCESS_TOKEN = 'e9d71c927031cb09240ce6f23132fdb041316457'
      const sb = new SendBird({appId});
      // sb.connect(USER_ID, function(user, error) {
      //   console.log(1, '-----1-----')
      //   if (error) {
      //       return;
      //   }
      // })
      sb.connect(USER_ID, ACCESS_TOKEN, function(user, error) {
        console.log(user, '-----user-----')
        if (error) {
            return;
        }
      });

      const openChannel = 'sendbird_open_channel_2243_6825ece4c8e888f8d13cdc70add95faad2cdd9d4'
      // sb.OpenChannel.createChannel(function(openChannel, error) {
      //   console.log(openChannel, '-----openChannel-----')
      //     if (error) {
      //         return;
      //     }
      // });

      sb.OpenChannel.getChannel(openChannel, function(openChannel, error) {
        console.log(openChannel, '-----openChannel-----')
          if (error) {
              return;
          }

          openChannel.enter(function(response, error) {
            console.log(response, '-----response-----')
              if (error) {
                  return;
              }
          })

          const MESSAGE = 'this is test message'
          const DATA = 'Additional data'
          const CUSTOM_TYPE = 'users'
          openChannel.sendUserMessage(MESSAGE, DATA, CUSTOM_TYPE, function(message, error) {
            console.log(message, '-----message-----')
              if (error) {
                  return;
              }
          });
      });

      const channelHandler = new sb.ChannelHandler();
          channelHandler.onMessageReceived = function(channel, message) {
              console.log('收到信息：' + message.message);
              console.log(message);
          }

          sb.addChannelHandler('seejie', channelHandler)
    }
  }
}
</script>

<style>

</style>