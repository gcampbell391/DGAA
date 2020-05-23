class User < ApplicationRecord
    has_many :games
    has_many :user_friends
    has_many :notifications 
    has_many :scorecards, through: :games
    has_many :dg_courses, through: :games
    has_secure_password
    validates :email, uniqueness: {case_sensitive: false}
    attr_accessor :password

    def authenticate(plaintext_password)
        if BCrypt::Password.new(self.password_digest) == plaintext_password
            self
        else
            false
        end
    end

    def games_played
        self.games.count
    end

    def average_score
        allScore = 0
        self.games.each do |game|
            allScore = allScore + game.score
        end
        if(allScore == 0) 
            return 0
        end
        return avg_score = (allScore/ games_played)
    end


    def holes_played
        self.scorecards.count
    end

    def average_throws_per_hole
        totalThrows = 0
        self.scorecards.each do |card|
            totalThrows = totalThrows + card.strokeCount
        end
        if(totalThrows == 0) 
            return 0
        end
        return  avg_throw = (totalThrows/holes_played)
    end

    def average_par_per_hole
        totalPars = 0
        self.scorecards.each do |card|
            totalPars = totalPars + card.parCount
        end
        if(totalPars == 0) 
            return 0
        end
        return avg_par = (totalPars/holes_played)
    end

    def average_difference_per_hole
        average_throws_per_hole - average_par_per_hole 
    end

    def followers
        total_count = 0
        allFollowers = UserFriend.all
        allFollowers.each do |friendship|
            if friendship.friend_id === self.id
                total_count = total_count + 1
            end
        end
        return total_count
    end

end
