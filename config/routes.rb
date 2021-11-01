Rails.application.routes.draw do
  resources :user_events
  resources :user_trips
  resources :events
  resources :trips
  # resources :users
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
