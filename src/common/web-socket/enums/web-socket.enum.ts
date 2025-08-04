export enum WSServerEvents {
  ChatConnect = 'chat:connect',
  SendTextMessage = 'chat:send-text-message',
  SendFileMessage = 'chat:send-file-message',
}

export enum WSClientEvents {
  ChatCompanionConnected = 'chat:companion-connected',
  ChatCompanionDisconnected = 'chat:companion-disconnected',
  ChatNewMessage = 'chat:new-message',
}
