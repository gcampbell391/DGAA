class User < ApplicationRecord
    has_many :games
    has_many :user_friends
    has_many :notifications 
    has_many :scorecards, through: :games
    has_many :dgcourses, through: :games
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

end
