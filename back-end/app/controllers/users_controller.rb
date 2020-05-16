class UsersController < ApplicationController 

    def index 
        users = User.all
        render json: users
    end

    def create 
        @user = User.new(user_params)
        @user.password_digest = BCrypt::Password.create(params["password"])
        if @user.valid?
            @user.save
            session[:user_id] = @user.id
            render json: {
                status: :created,
                logged_in: true,
                user: @user
            }
        else
            render json: { status: 401 }
        end
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