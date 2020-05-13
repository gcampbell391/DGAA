class UsersController < ApplicationController 

    def index 
        users = User.all
        render json: users
    end


private
    def user_params
        params.require(:user).permit(:id,:email, :password, :firstName, :lastName, :street, :city, :state, :zip, :userImg)
    end
end