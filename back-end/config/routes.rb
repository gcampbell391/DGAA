Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, :dg_courses, :games

  #Creates New User
  post '/users', to: 'users#create'
  
  #Update Users
  patch '/users/:id', to: 'users#update'

  #Authentication routes
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#logout'

  #Creates New Game
  post '/games', to: 'games#create'

  #Creates a new friend
  post '/users/add_friend', to: 'users#add_friend'

  #Deletes a friend
  post '/users/remove_friend', to: 'users#remove_friend'
  
end
