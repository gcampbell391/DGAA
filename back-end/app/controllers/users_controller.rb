class UsersController < ApplicationController 

    def index 
        users = User.all
        render json: users, include: [:games, :scorecards, :dg_courses, :user_friends]
    end

    def show
        user = User.find(params[:id])
        if user
            render json: user, include: [:games, :scorecards, :dg_courses, :user_friends]
        else
            render json: { error: "Not found!" }, status: 404
        end 
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
        byebug
        @user = User.find_by(id: params[:id])
        @user.update(user_params)
        @user.password_digest = BCrypt::Password.create(params["password"])
        byebug
        @user.save
        render json: {
            status: :updated,
            user: @user
        }
    end

    def add_friend
        friendship1 = UserFriend.find_or_create_by(user_id: params[:user_id], friend_id: params[:friend_id])
        friendship2 = UserFriend.find_or_create_by(user_id: params[:friend_id], friend_id: params[:user_id])
        render json: {
            friendship1: friendship1,
            friendship2: friendship2
        }
    end

    def remove_friend
        friendship = UserFriend.find_by(id: params["_json"][0][:id])
        friendship.destroy
        render json: {status: "Friendship terminated"}
    end

private
    def user_params
        params.require(:user).permit(:id,:email, :password, :firstName, :lastName, :street, :city, :state, :zip, :userImg, :password_digest, :created_at, :updated_at)
    end
end