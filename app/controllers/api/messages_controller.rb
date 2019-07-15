class Api::MessagesController < ApplicationController
  def index
    @messages = Message.new
    @group = Group.find(params[:group_id])
    @messages = @group.messages.includes(:user).where('id > ?', params[:id])
  end
end