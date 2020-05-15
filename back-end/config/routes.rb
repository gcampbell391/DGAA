Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users, :dg_courses

  #Update Users
  patch '/users/:id', to: 'users#update'

  #Authentication routes
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#logout'

end
