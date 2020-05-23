class GamesController < ApplicationController 

    def index 
        games = Game.all
        render json: games, include: [:scorecards, :dg_course]
    end

    def create 
        finalScore = 0
        userScoreCard = params["finalScoreCard"]
        userScoreCard.each do |hole| 
            finalScore = finalScore + hole["stroke"] end 
        dgCourseID = params["course"]["course_id"].to_i
        coursePlayed = DgCourse.find_by(DGCourseReviewApiId: params["course"]["course_id"].to_i)
        playerGame = Game.create(user_id:params["user"][0]["user"][:id], dg_course_id: coursePlayed.id, score: finalScore )
        userScoreCard.each do |hole| 
            Scorecard.create(game_id: playerGame.id, strokeCount: hole["stroke"].to_i, holeNum: hole["hole"].to_i, parCount: hole["par"].to_i) 
        end
        render json: playerGame
    end
end

