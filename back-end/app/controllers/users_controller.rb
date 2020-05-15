class UsersController < ApplicationController 

    def index 
        users = User.all
        render json: users
    end

    def update 
        @user = User.find_by(id: params[:id])
        @user.update(user_params)
        @user.password_digest = BCrypt::Password.create(params["password"])
        @user.save
        render json: {
            status: :updated,
            user: @user
        }
    end

private
    def user_params
        params.require(:user).permit(:id,:email, :password, :firstName, :lastName, :street, :city, :state, :zip, :userImg)
    end
end