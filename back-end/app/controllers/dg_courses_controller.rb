class DgCoursesController < ApplicationController 

    def index 
        courses = DgCourse.all
        render json: courses
    end

    
end