class SessionsController < ApplicationController
    def create
        @user = User.find_by(email: params["email"])
        if @user && @user.authenticate(params["password"])
            session[:user_id] = @user.id
            render json: {
                status: :created,
                logged_in: true,
                user: @user,
                games_played: @user.games_played, 
                holes_played: @user.holes_played,
                avg_score: @user.average_score,
                avg_stroke: @user.average_throws_per_hole,
                avg_diff: @user.average_difference_per_hole,
                followers: @user.followers
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