require 'digest'
require "rest-client"
require 'json'

puts "Destroying Old Seed Data..."
User.destroy_all
DgCourse.destroy_all

api_key = ENV["API_KEY"]
sig_key = ENV["SIG_KEY"]
final_sig_key = api_key + sig_key + "findloc"
digest_sig_key = Digest::MD5.hexdigest final_sig_key
coursesURL = "https://www.dgcoursereview.com/api_test/?key="+api_key+"&mode=findloc&city=a&state=NY&country=US&sig="+digest_sig_key
coursesResponse = RestClient.get coursesURL
coursesArray = JSON.parse(coursesResponse)

puts "Creating Courses..."
coursesArray.each do |course|
    DgCourse.create(
        DGCourseReviewApiId: course["course_id"],
        name: course["name"],
        street: course["street_addr"], 
        city: course["city"],
        state: course["state"],
        zip: course["zipcode"],
        rating: course["rating"],
        holes: course["holes"],
        courseLong: course["longitude"],
        courseLat: course["latitude"],
        dgCourseLink:course["dgcr_url"],
        dgRatingImg: course["rating_img"]
    )
end

puts "Creating Users..."
User.create(email: "gc3@gmail.com", password_digest: BCrypt::Password.create("123"), firstName: "Gene", lastName: "Campbell", street: "403 SummerChase Way", city: "Woodstock", state:"GA", zip: "30189", userImg:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvT_dfPHEtnGk70SNUblMaaKbZ9Y2gKSia8vCokI1THXeIsBiA&usqp=CAU" )

puts "Seed Data Loaded..."
puts "Durty..."