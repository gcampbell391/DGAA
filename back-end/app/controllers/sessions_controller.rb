class SessionsController < ApplicationController
    def create
        @user = User.find_by(email: params["email"])
        if @user && @user.authenticate(params["password"])
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


    def logout 
        reset_session
        render json: {logged_out: "Successful"}
    end

    private
    def session_params
        params.require(:user).permit(:email, :password)
    end
end